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
                            Thank You for Returning {{ $borrowRequest->book->title }}!
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


                            We’ve successfully received your return of {{ $borrowRequest->book->title }}. Thank you for returning it on time



                            Looking for your next read? Browse our collection and borrow your next favorite book!

                        </td>
                    </tr>

                    <tr>
                        <td height="25"></td>
                    </tr>

                    <tr>
                        <td>
                            <a href="{{ config('app.frontend_url') }}/library" style="background:#fde68a;color:#000;padding:12px 20px;
                                      border-radius:8px;text-decoration:none;font-weight:bold">
                                Explore New Books
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td height="30"></td>
                    </tr>

                    <tr>
                        <td style="color:#94a3b8">
                            Happy exploring,<br>
                            <strong>The BookWise Team</strong>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>

</html>
