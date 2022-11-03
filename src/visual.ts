/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import DataViewTable = powerbi.DataViewTable;
import DataViewTableRow = powerbi.DataViewTableRow;


import { VisualSettings } from "./settings";
export class Visual implements IVisual {

    private settings: VisualSettings;
    private graphRootDiv: HTMLElement;
    private target: HTMLElement;

    constructor(options: VisualConstructorOptions) {

        this.target = options.element;

        if (document) {
            this.graphRootDiv = document.createElement("div");
            this.graphRootDiv.classList.add("barChart");
            this.target.appendChild(this.graphRootDiv);
        
        }

        

    }
     


    public update(options: VisualUpdateOptions) {


        
        const dataView: DataView = options.dataViews[0];
        const tableDataView: DataViewTable = dataView.table;


     

        if (!tableDataView) 
            return;
        


        let TableData = [];

        console.log(TableData);
        
        //creation of a table of objects
        tableDataView.rows.forEach((row: DataViewTableRow) => {
  

            let dataRow : any = {};


            dataRow.category1 = row[tableDataView.columns.filter((d) => d.roles.category1 != undefined )[0].index];
            
            /*dataRow.Order = row[tableDataView.columns.filter((d) => d.roles.Order != undefined )[0].index];
           */

            dataRow.TxChargeable = row[tableDataView.columns.filter((d) => d.roles.TxChargeable != undefined )[0].index];
            dataRow.TxPrevis = row[tableDataView.columns.filter((d) => d.roles.TxPrevis != undefined )[0].index];
            dataRow.Budget = row[tableDataView.columns.filter((d) => d.roles.Budget != undefined )[0].index];
           

            TableData.push(dataRow);
    
          
        });

        console.log(TableData);


        this.graphRootDiv.innerHTML = "";

      const ordinate =  this.graphRootDiv.appendChild(document.createElement("div"));
      ordinate.classList.add("barChart-ordinate");


      TableData.forEach((d) => 
      {

        let barChartElement =  this.graphRootDiv.appendChild(document.createElement("div"));
        barChartElement.classList.add("barChart-Element");

        let barChartElementLegend =  barChartElement.appendChild(document.createElement("div"));
        barChartElementLegend.classList.add("barChart-Element-legend");
        barChartElementLegend.appendChild(document.createTextNode(d.category1));

        let barChartElementBar =  barChartElement.appendChild(document.createElement("div"));
        barChartElementBar.classList.add("barChart-Element-bar");

        let barChartElementInner1 =  barChartElementBar.appendChild(document.createElement("div"));
        barChartElementInner1.classList.add("barChart-Element-inner");
        barChartElementInner1.classList.add("color1");
        barChartElementInner1.setAttribute("style", "width: "  + (250 * d.TxChargeable).toString() + "px;");

        let barChartElementInner2 =  barChartElementBar.appendChild(document.createElement("div"));
        barChartElementInner2.classList.add("barChart-Element-inner");
        barChartElementInner2.classList.add("color2");
        barChartElementInner2.setAttribute("style", "width: "  + (250 * d.TxPrevis).toString() + "px;");

        let barChartElementInnerText =  barChartElementBar.appendChild(document.createElement("div"));
        barChartElementInnerText.classList.add("barChart-Element-innerText");
        barChartElementInnerText.appendChild(document.createTextNode((Math.round((d.TxChargeable+d.TxPrevis)*1000)/10).toString() + '%'));

        let barChartElementBudget =  barChartElement.appendChild(document.createElement("div"));
        barChartElementBudget.classList.add("barChart-Element-budget");

        if (d.Budget > d.TxChargeable)
        barChartElementBudget.classList.add("colorBad");

        else
        barChartElementBudget.classList.add("colorGood");
        
        let sign  = d.Budget > d.TxChargeable ? '-' : '+';
        barChartElementBudget.appendChild(document.createTextNode(sign + (Math.round((d.Budget-d.TxChargeable)*1000)/10).toString() + '%'));


      })
      ;

    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return <VisualSettings>VisualSettings.parse(dataView);
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}