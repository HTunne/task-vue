import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    breakpoint: {
        mobileBreakpoint: 'xs'
    },
    theme: {
        themes: {
            light: {
                primary: '#156D7E',
                accent: '#EB6B96',
                secondary: '#929596',
                success: '#4CAF50',
                info: '#2196F3',
                warning: '#FB8C00',
                error: '#FF5252'
            }
        }
    }
});
