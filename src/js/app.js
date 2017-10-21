import WallClock from './comps/clock';
import WallLocation from './comps/location';
import WallTasks from './comps/tasks';
import Background from './comps/background';
import Settings from './comps/settings';

import '../scss/styles.scss';

new Settings();

new WallClock();
new WallLocation();
new WallTasks();
new Background();
