/**
 * LiveXperience Core System Clock
 * Automatically updates time counters and calendar strings every second.
 */
document.addEventListener('DOMContentLoaded', function() {
    function initializeSystemClock() {
        const timeElement = document.getElementById('globalLiveClock');
        const dateElement = document.getElementById('globalLiveDate');

        // Optional format parameters
        const dateOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };

        function updateClockLoop() {
            const now = new Date();
            
            // 1. Update counting time string (e.g., "14:23:05")
            if (timeElement) {
                timeElement.textContent = now.toLocaleTimeString();
            }
            
            // 2. Update calendar date string (e.g., "Thursday, July 2, 2026")
            if (dateElement) {
                dateElement.textContent = now.toLocaleDateString(undefined, dateOptions);
            }
        }

        // Execute immediately, then loop every 1000 milliseconds (1 second)
        updateClockLoop();
        setInterval(updateClockLoop, 1000);
    }

    initializeSystemClock();
});