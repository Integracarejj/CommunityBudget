
// src/webparts/communityBudgets/components/CommunityBudgets.tsx

import * as React from "react";
import { useState, useMemo } from "react";

// ✅ FIXED Fluent UI imports (no /lib/* paths)
import {
  TextField,
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  DetailsList,
  IColumn,
  MessageBar,
  MessageBarType,
  Spinner
} from "@fluentui/react";

// SPFx HttpClient
import { HttpClient } from "@microsoft/sp-http";

// Your API helpers
import { kbGet, sendFeedback, KbItem, KbQuery } from "../../../common/api";

interface Props {
  httpClient: HttpClient;
  defaultCommunity?: string;
}

const categoryOptions: IDropdownOption[] = [
  { key: "", text: "All categories" },
  { key: "budgets", text: "Budgets" },
  { key: "faq", text: "FAQs" },
  { key: "meetings", text: "Meeting insights" }
];

const columns: IColumn[] = [
  { key: "title", name: "Title", fieldName: "title", minWidth: 140, maxWidth: 240, isResizable: true },
  { key: "category", name: "Category", fieldName: "category", minWidth: 100, maxWidth: 140 },
  { key: "body", name: "Content", fieldName: "body", minWidth: 220, isResizable: true }
];

export const CommunityBudgets: React.FC<Props> = ({ httpClient, defaultCommunity }) => {
  const [community, setCommunity] = useState(defaultCommunity ?? "");
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [items, setItems] = useState<KbItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (!search) return items;
    const s = search.toLowerCase();
    return items.filter(i =>
      i.title.toLowerCase().includes(s) ||
      i.body.toLowerCase().includes(s) ||
      i.category.toLowerCase().includes(s)
    );
  }, [items, search]);

  async function onSearchClick() {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await kbGet(httpClient, { community, category, search: "" } as KbQuery);
      setItems(res.items ?? []);
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  async function onFeedback(item: KbItem, rating: 1 | 2 | 3 | 4 | 5) {
    setError(null);
    setSuccess(null);
    try {
      const res = await sendFeedback(httpClient, {
        itemId: item.id,
        rating,
        comment: "MVP feedback from SPFx",
        community,
        category: item.category
      });
      setSuccess(`Thanks! Status: ${res.status}${res.correlationId ? ` (id ${res.correlationId})` : ""}`);
    } catch (e: any) {
      setError(e.message ?? String(e));
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Community Budgets — Knowledge Base (MVP)</h2>

      <TextField
        label="Community"
        placeholder="e.g., Wexford"
        value={community}
        onChange={(_, v) => setCommunity(v ?? "")}
        styles={{ root: { maxWidth: 320 } }}
      />

      <Dropdown
        label="Category"
        options={categoryOptions}
        selectedKey={category}
        onChange={(_, opt) => setCategory(String(opt?.key ?? ""))}
        styles={{ root: { maxWidth: 320, marginTop: 8 } }}
      />

      <TextField
        label="Search (client-side filter)"
        placeholder="Search within results"
        value={search}
        onChange={(_, v) => setSearch(v ?? "")}
        styles={{ root: { maxWidth: 480, marginTop: 8 } }}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <PrimaryButton text="Search" onClick={onSearchClick} />
      </div>

      {loading && <Spinner label="Loading…" style={{ marginTop: 12 }} />}

      {error && (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={false}
          onDismiss={() => setError(null)}
          styles={{ root: { marginTop: 12 } }}
        >
          {error}
        </MessageBar>
      )}

      {success && (
        <MessageBar
          messageBarType={MessageBarType.success}
          isMultiline={false}
          onDismiss={() => setSuccess(null)}
          styles={{ root: { marginTop: 12 } }}
        >
          {success}
        </MessageBar>
      )}

      <div style={{ marginTop: 12 }}>
        <DetailsList
          items={filteredItems}
          columns={columns}
          onRenderItemColumn={(item?: KbItem, index?: number, col?: IColumn) => {
            if (!item || !col) return null;

            if (col.key === "body") {
              return (
                <div>
                  <div style={{ marginBottom: 6 }}>{item.body}</div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[1, 2, 3, 4, 5].map((r) => (
                      <PrimaryButton
                        key={r}
                        text={`Rate ${r}`}
                        onClick={() => onFeedback(item, r as 1 | 2 | 3 | 4 | 5)}
                        styles={{ root: { height: 28 } }}
                      />
                    ))}
                  </div>
                </div>
              );
            }

            return (item as any)[col.fieldName!];
          }}
        />
      </div>
    </div>
  );
};
