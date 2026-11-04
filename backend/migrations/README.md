# Report notifications

The existing application database must already contain the `users`, `categories`,
`lost_items`, `found_items`, and `matches` tables. Apply
`20261104_report_notifications.sql` to that database before using the admin
dashboard and notifications. It creates the notifications table and adds the
admin status and note columns only when they are missing.

For the default XAMPP configuration, from the project directory in PowerShell:

```powershell
Get-Content -Raw -Encoding UTF8 .\backend\migrations\20261104_report_notifications.sql | & C:\xampp\mysql\bin\mysql.exe -u root smart_lost_found
```

Only active users with the `admin` or `moderator` role can load or update reports
in the admin dashboard. Changing a report's admin status creates an in-site
notification for its owner in the same database transaction. Saving an internal
admin note does not notify the owner. Any other server-side status update must
call `updateReportStatus` inside a transaction so that the notification is not
lost.

The home page checks for new notifications while it is open. This does not
enable browser push, email, or notifications when the site is closed.

To check the status/notification transaction against isolated temporary tables:

```powershell
& C:\xampp\php\php.exe .\tests\report-notifications.php
```
