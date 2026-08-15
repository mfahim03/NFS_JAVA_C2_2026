# Day 17 Performance and Index Tuning Notes

## Query fields used by the app

| Feature | Field(s) | Index needed? | Notes |
|---|---|---|---|
| Find by asset tag | `assetTag` | Yes | Should be unique |
| Find by serial number | `serialNumber` | Yes | Should be unique |
| Filter by status | `status` | Yes | Used in list and summary |
| Filter by category | `category` | Useful | Used in filtering/reporting |
| Filter by location | `location` | Useful | Used in filtering/reporting |
| Reports by status | `status` | Useful | Aggregation grouping field |
| Reports by category | `category` | Useful | Aggregation grouping field |
| Reports by location | `location` | Useful | Aggregation grouping field |

## Review summary

- **Filtering:** `status`, `category`, and `location` are accepted by `GET /api/assets`; the paged endpoint can also sort by `assetTag`, `name`, `category`, `status`, or `location`.
- **Sorting:** `assetTag` is the default sort; `name`, `category`, `status`, and `location` are also supported. Compound indexes should only be added after observing frequent filter-and-sort pairs with production-like data.
- **Unique fields:** `assetTag` and `serialNumber` must remain unique. The `@Indexed(unique = true)` annotations create these indexes when `spring.data.mongodb.auto-index-creation=true` is enabled.
- **Reports:** status, category, and location are grouping dimensions and have single-field indexes. These indexes help filtered reads; aggregation performance must be checked against realistic data volumes.

## Evidence to collect

Paste Compass or mongosh output showing indexes:

```javascript
use asset_tracker_db
db.assets.getIndexes()
```

Expected index names from the `Asset` model include `_id_`, `assetTag_1`, `serialNumber_1`, `status_1`, `category_1`, `location_1`, and `assignedTo_1`. Run the command against the local MongoDB instance to record the actual output for the environment.

## Timing examples

| Endpoint | Status | Duration | Interpretation |
|---|---:|---:|---|
| `/api/v1/assets/paged` | 200 | ___ ms | Normal / investigate |
| `/api/v1/reports/assets-by-status` | 200 | ___ ms | Normal / investigate |
| `/api/auth/login` | 200 / 401 | ___ ms | Auth path |
| `/api/readiness` | 200 / 503 | ___ ms | DB readiness |
```
