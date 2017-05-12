function DataTable_RowActions_CatChain(dataTable) {
    this.dataTable = dataTable;
     this.actionName = "/cat/r/model";
}

DataTable_RowActions_CatChain.prototype = new DataTable_RowAction;

DataTable_RowActions_CatChain.isPageUrlReport = function (module, action) {
    return false;
};

DataTable_RowActions_CatChain.isPageTitleReport = function (module, action) {
    return true;
};

DataTable_RowActions_CatChain.registeredReports = [];
DataTable_RowActions_CatChain.registerReport = function (handler) {
    console.info('DataTable_RowActions_CatChain.registerReport ');
    DataTable_RowActions_CatChain.registeredReports.push(handler);
}

/** To be overridden */
DataTable_RowAction.prototype.performAction = function (label, tr, e) {
  var separator = ' > '; // LabelFilter::SEPARATOR_RECURSIVE_LABEL
   var labelParts = label.split(separator);
   for (var i = 0; i < labelParts.length; i++) {
       var labelPart = labelParts[i].replace('@', '');
       labelParts[i] = $.trim(decodeURIComponent(labelPart));
   }
   label = labelParts.join(piwik.config.action_url_category_delimiter);
   tr.label=label;
};

DataTable_RowActions_CatChain.prototype.onClick = function (actionA, tr, e) {
     var actionName=tr.label;
     var date = piwik.currentDateString.replace('-','').replace('-','');
     var period = piwik.period;
     var href = CatChain_Helper.getCatLink(this.dataTable.param.idSite, period,date,actionName);
  actionA.attr({
      target: '_blank',
      href: href
  });
    return true;
};

DataTable_RowActions_Registry.register({
    name: 'CatChain',

    dataTableIcon: 'plugins/CatChain/images/catchain_icon.png',
    dataTableIconHover: 'plugins/CatChain/images/catchain_icon_hover.png',

    order: 20,

    dataTableIconTooltip: [
      'CAT Chain',
      'Cat Call Chain view'
    ],

    createInstance: function (dataTable) {
        return new DataTable_RowActions_CatChain(dataTable);
    },

    isAvailableOnReport: function (dataTableParams) {
        if('getPageTitles'===dataTableParams.action){
          return true;
        }

        return false;
    },

    isAvailableOnRow: function (dataTableParams, tr) {
        if (tr.hasClass('subDataTable')) {
            return false;
        }
        return true;
    }

});
