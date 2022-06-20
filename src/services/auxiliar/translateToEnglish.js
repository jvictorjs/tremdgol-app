export function translateEventBRClockToEnglish($brClock) {
    if ($brClock) {
        $brClock = $brClock.toUpperCase();
        if ($brClock === 'PRE-JOGO') return 'pre-game';
        if ($brClock === 'INTERVALO') return 'half-time';
        if ($brClock === 'FT') return 'FT';
        if ($brClock.indexOf('1T') > -1) {
            return $brClock.replace('1T', '1st');
        }
        if ($brClock.indexOf('2T') > -1) {
            return $brClock.replace('2T', '2nd');
        }
    }
    return $brClock;
}
