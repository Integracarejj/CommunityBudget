
// src/common/api.ts
import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";
import { API_BASE, ROUTES, REQUEST } from "./config";

export interface KbQuery {
    community: string;
    category?: string;
    search?: string;
}

export interface KbItem {
    id: number;
    title: string;
    body: string;
    community: string;
    category: string;
    createdUtc?: string;
}

export interface KbGetResponse {
    community: string;
    category?: string;
    count: number;
    items: KbItem[];
    correlationId?: string;
}

export interface FeedbackPayload {
    itemId: number;
    rating: 1 | 2 | 3 | 4 | 5;
    comment?: string;
    community?: string;
    category?: string;
}

// ✅ No Object.entries (works on older lib targets too)
const toQueryString = (q: Record<string, string | number | boolean | undefined>): string => {
    const parts: string[] = [];
    for (const k in q) {
        if (Object.prototype.hasOwnProperty.call(q, k)) {
            const v = q[k];
            if (v !== undefined && v !== "") {
                parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
            }
        }
    }
    return parts.join("&");
};

export async function kbGet(httpClient: HttpClient, query: KbQuery): Promise<KbGetResponse> {
    const url = `${API_BASE}${ROUTES.KB_GET}?${toQueryString({
        community: query.community,
        category: query.category,
        search: query.search
    })}`;

    const resp: HttpClientResponse = await httpClient.get(url, HttpClient.configurations.v1, {
        headers: { "Accept": "application/json" }
    });

    if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`kb-get failed: ${resp.status} ${text}`);
    }
    const data = await resp.json();
    return data as KbGetResponse;
}

export async function sendFeedback(httpClient: HttpClient, payload: FeedbackPayload): Promise<{ status: string; correlationId?: string; }> {
    const url = `${API_BASE}${ROUTES.FEEDBACK}`;
    const resp: HttpClientResponse = await httpClient.post(url, HttpClient.configurations.v1, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`feedback failed: ${resp.status} ${text}`);
    }
    const data = await resp.json();
    return data as { status: string; correlationId?: string; };
}
