<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Book Return</title>
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

                    <tr>
                        <td height="20"></td>
                    </tr>

                    <tr>
                        <td style="font-size:20px;font-weight:bold">
                            Reminder: {{ $borrowRequest->book->title }} is Due Soon!
                        </td>
                    </tr>

                    <tr>
                        <td height="15"></td>
                    </tr>

                    <tr>
                        <td style="color:#cbd5f5">
                            Hi {{ $borrowRequest->user->firstname }},
                        </td>
                    </tr>

                    <tr>
                        <td height="10"></td>
                    </tr>

                    <tr>
                        <td style="color:#cbd5f5;line-height:1.6">


                            Just a reminder that {{ $borrowRequest->book->title }} is due for return on {{ \Carbon\Carbon::parse($borrowRequest->due_date)->format('d/m/Y') }}. Kindly return it on time to avoid late fees.


                            If you’re still reading, you can renew the book in your account.

                        </td>
                    </tr>

                    <tr>
                        <td height="25"></td>
                    </tr>

                    <tr>
                        <td>
                            <a href="#"  style="background:#fde68a;color:#000;padding:12px 20px;
                                      border-radius:8px;text-decoration:none;font-weight:bold">
                                Renew Book Now
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td height="30"></td>
                    </tr>

                    <tr>
                        <td style="color:#94a3b8">
                            eep reading,<br>
                            <strong>The BookWise Team</strong>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>

</html>
