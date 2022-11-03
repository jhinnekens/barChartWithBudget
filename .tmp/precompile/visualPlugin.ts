import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var barChartWithBudget1712D533000A4290A14B88EDE1BCE48A_DEBUG: IVisualPlugin = {
    name: 'barChartWithBudget1712D533000A4290A14B88EDE1BCE48A_DEBUG',
    displayName: 'barChartWithBudget',
    class: 'Visual',
    apiVersion: '3.8.0',
    create: (options: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId: string, options: DialogConstructorOptions, initialState: object) => {
        const dialogRegistry = globalThis.dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["barChartWithBudget1712D533000A4290A14B88EDE1BCE48A_DEBUG"] = barChartWithBudget1712D533000A4290A14B88EDE1BCE48A_DEBUG;
}
export default barChartWithBudget1712D533000A4290A14B88EDE1BCE48A_DEBUG;