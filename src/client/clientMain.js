import SpaaaceClientEngine from './SpaaaceClientEngine';
import SpaaaceGameEngine from '../common/SpaaaceGameEngine';
import '../../assets/sass/main.scss';

// sent to both game engine and client engine
const options = {
    traceLevel: 0,
    delayInputCount: 2,
    scheduler: 'render-schedule',
    syncOptions: {
        sync: 'extrapolate',
        localObjBending: 0.8,
        remoteObjBending: 0.5
    }
};

// create a client engine and a game engine
const gameEngine = new SpaaaceGameEngine(options);
const clientEngine = new SpaaaceClientEngine(gameEngine, options);

clientEngine.start();
