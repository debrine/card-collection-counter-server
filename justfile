migrate_local:
    #!/usr/bin/env bash
    set -euo pipefail

    echo "Migrating database..."
    dbmate --no-dump-schema --url "postgres://postgres:ccc-postgres-password@localhost:5432/db?sslmode=disable" up
    echo "Database migrated successfully!"

migrate_local_down:
    #!/usr/bin/env bash
    set -euo pipefail

    echo "Migrating database..."
    dbmate --no-dump-schema --url "postgres://postgres:ccc-postgres-password@localhost:5432/db?sslmode=disable" down
    echo "Database migrated successfully!"