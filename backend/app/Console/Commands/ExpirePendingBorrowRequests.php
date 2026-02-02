<?php

namespace App\Console\Commands;

use App\Models\BorrowRequest;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ExpirePendingBorrowRequests extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:expire-pending-borrow-requests';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Expire pending borrow requests after 4 minutes (for testing)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expireTime = Carbon::now()->subDays(3);

        $updated = BorrowRequest::where('status', 'pending')
            ->where('created_at', '<=', $expireTime)
            ->update(['status' => 'expired']);

        $this->info("Expired $updated pending borrow requests.");
    }
}
