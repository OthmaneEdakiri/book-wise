<?php

namespace App\Console\Commands;

use App\Models\BorrowRequest;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MarkOverdueBorrowRequests extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:mark-overdue-borrow-requests';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mark overdue borrow requests';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        BorrowRequest::where('status', 'borrowed')
            ->whereDate('due_date', '<', Carbon::today())
            ->update(['status' => 'overdue']);

        $this->info('Overdue borrow requests updated.');
    }
}
