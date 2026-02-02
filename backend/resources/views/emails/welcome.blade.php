<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome to BookWise</title>
</head>
<body style="background:#0f172a;padding:30px;font-family:Arial">

    <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table width="600" style="background:#020617;color:#fff;border-radius:12px;padding:30px">

                    <tr>
                        <td style="font-size:22px;font-weight:bold">
                            📖 BookWise
                        </td>
                    </tr>

                    <tr><td height="20"></td></tr>

                    <tr>
                        <td style="font-size:20px;font-weight:bold">
                            Welcome to BookWise, Your Reading Companion!
                        </td>
                    </tr>

                    <tr><td height="15"></td></tr>

                    <tr>
                        <td style="color:#cbd5f5">
                            Hi {{ $user->firstname }},
                        </td>
                    </tr>

                    <tr><td height="10"></td></tr>

                    <tr>
                        <td style="color:#cbd5f5;line-height:1.6">
                            Welcome to BookWise! We're excited to have you join our community of book enthusiasts.
                            Explore a wide range of books, borrow with ease, and manage your reading journey seamlessly.
                        </td>
                    </tr>

                    <tr><td height="25"></td></tr>

                    <tr>
                        <td>
                            <a href="{{ config('app.frontend_url') }}/login"
                               style="background:#fde68a;color:#000;padding:12px 20px;
                                      border-radius:8px;text-decoration:none;font-weight:bold">
                                Login to BookWise
                            </a>
                        </td>
                    </tr>

                    <tr><td height="30"></td></tr>

                    <tr>
                        <td style="color:#94a3b8">
                            Happy reading,<br>
                            <strong>The BookWise Team</strong>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
