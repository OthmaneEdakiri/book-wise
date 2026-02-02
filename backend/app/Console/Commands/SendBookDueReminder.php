<?php

namespace App\Console\Commands;

use App\Mail\BookDueReminderMail;
use App\Models\BorrowRequest;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendBookDueReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-book-due-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $targetDate = Carbon::now()->addDays(3)->toDateString();

        $borrowRequests = BorrowRequest::with('user', 'book')
            ->whereDate('due_date',"<", $targetDate)
            ->where('status', 'borrowed')
            ->get();

        foreach ($borrowRequests as $borrowRequest) {
            Mail::to($borrowRequest->user->email)
                ->send(new BookDueReminderMail($borrowRequest));
        }

        $this->info('Book due reminder emails sent successfully.');
    }
}
