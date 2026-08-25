export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:9920/v1";

export interface User {
  id: number;
  uuid: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse extends User {
  token: string;
}

export interface Product {
  id: number;
  uuid: string;
  name: string;
  image_url: string;
  price: string;
  stock: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Sale {
  id: number;
  uuid: string;
  title: string;
  type: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface SaleProduct {
  id: number;
  uuid: string;
  sale_id: number;
  product_id: number;
  discount_percentage: string;
  discount_price: string;
  created_at: string;
  updated_at: string;
  product: Product;
  sale: Sale;
}

export interface CheckoutResponse {
  status: string;
  message: string;
}

// Token storage helpers
export const getStoredToken = (): string | null => {
  return localStorage.getItem("flashdeal_token");
};

export const setStoredAuth = (auth: AuthResponse): void => {
  localStorage.setItem("flashdeal_token", auth.token);
  localStorage.setItem("flashdeal_user", JSON.stringify(auth));
};

export const getStoredUser = (): User | null => {
  const user = localStorage.getItem("flashdeal_user");
  if (!user) return null;
  try {
    return JSON.parse(user) as User;
  } catch {
    return null;
  }
};

export const clearStoredAuth = (): void => {
  localStorage.removeItem("flashdeal_token");
  localStorage.removeItem("flashdeal_user");
};

// Generic HTTP fetch wrapper
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = Array.isArray(errorData.message)
          ? errorData.message.join(", ")
          : errorData.message;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

// API Service Functions
export const api = {
  // Auth
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const data = await apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setStoredAuth(data);
    return data;
  },

  // Sale Products
  getSaleProducts: async (params?: {
    sale_uuid?: string;
    product_uuid?: string;
  }): Promise<SaleProduct[]> => {
    const query = new URLSearchParams();
    if (params?.sale_uuid) query.set("sale_uuid", params.sale_uuid);
    if (params?.product_uuid) query.set("product_uuid", params.product_uuid);

    const queryString = query.toString();
    const endpoint = `/sale-product${queryString ? `?${queryString}` : ""}`;
    const result = await apiFetch<
      { data: SaleProduct[]; meta?: unknown } | SaleProduct[]
    >(endpoint);
    if (result && "data" in result && Array.isArray(result.data)) {
      return result.data;
    }
    return Array.isArray(result) ? result : [];
  },

  getSaleProductByUuid: async (uuid: string): Promise<SaleProduct> => {
    const result = await apiFetch<
      { data: SaleProduct } | SaleProduct
    >(`/sale-product/${uuid}`);
    if (result && "data" in result && result.data) {
      return result.data;
    }
    return result as SaleProduct;
  },

  checkout: async (
    uuid: string,
    quantity: number = 1,
  ): Promise<CheckoutResponse> => {
    return apiFetch<CheckoutResponse>(`/sale-product/${uuid}/checkout`, {
      method: "POST",
      body: JSON.stringify({ quantity }),
    });
  },
};
