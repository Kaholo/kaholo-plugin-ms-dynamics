const uuid = require("uuid");
const dynamicsService = require("./dynamics.service");
const helpers = require("./helpers");

async function exportSolution(action, settings) {
  
  await dynamicsService.init(settings);

  const outputPath = action.params.outputPath;

  /**
   * All params can be found at:
   * https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/exportsolution?view=dynamics-ce-odata-9
   */
  const exportOptions = {
    SolutionName: action.params.solutionName,
    Managed: helpers.handleBoolean(action.params.managed) || false,
    ExportAutoNumberingSettings : helpers.handleBoolean(action.params.exportAutoNumberingSettings),
    ExportCalendarSettings : helpers.handleBoolean(action.params.exportCalendarSettings),
    ExportCustomizationSettings : helpers.handleBoolean(action.params.exportCustomizationSettings),
    ExportEmailTrackingSettings : helpers.handleBoolean(action.params.exportEmailTrackingSettings),
    ExportGeneralSettings : helpers.handleBoolean(action.params.exportGeneralSettings),
    ExportMarketingSettings : helpers.handleBoolean(action.params.exportMarketingSettings),
    ExportOutlookSynchronizationSettings : helpers.handleBoolean(action.params.exportOutlookSynchronizationSettings),
    ExportRelationshipRoles : helpers.handleBoolean(action.params.exportRelationshipRoles),
    ExportIsvConfig : helpers.handleBoolean(action.params.exportIsvConfig),
    ExportSales : helpers.handleBoolean(action.params.exportSales),
    ExportExternalApplications : helpers.handleBoolean(action.params.exportExternalApplications),
  };

  return dynamicsService.exportSolution(outputPath, exportOptions);
}

async function importSolution(action, settings) {
  
  await dynamicsService.init(settings);

  const zipPath = action.params.zipPath;
  
  /**
   * All params can be found at:
   * https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/importsolution?view=dynamics-ce-odata-9
   */
  const importOptions = {
    // auto generate GUID if not supploed
    ImportJobId: action.params.importJobId || uuid.v4(),
    OverwriteUnmanagedCustomizations: helpers.handleBoolean(action.params.overwriteUnmanagedCustomizations) || false,
    PublishWorkflows: helpers.handleBoolean(action.params.publishWorkflows) || false,
    ConvertToManaged: helpers.handleBoolean(action.params.convertToManaged),
    SkipProductUpdateDependencies: helpers.handleBoolean(action.params.skipProductUpdateDependencies),
    HoldingSolution: helpers.handleBoolean(action.params.holdingSolution),
    SkipQueueRibbonJob: helpers.handleBoolean(action.params.skipQueueRibbonJob),
    AsyncRibbonProcessing: helpers.handleBoolean(action.params.asyncRibbonProcessing),
  };
  return dynamicsService.importSolution(zipPath, importOptions);
}

module.exports = {
  exportSolution,
  importSolution
};