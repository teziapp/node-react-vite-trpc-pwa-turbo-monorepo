import { UAParser } from "ua-parser-js";

export const uaParser = (ua?: string) => {
  const parser = new UAParser(ua);
  const parserResults = parser.getResult();

  const uaTokenItems = {
    browser_name: parserResults.browser.name,
    cpu_architecture: parserResults.cpu.architecture,
    device_model: parserResults.device.model,
    device_type: parserResults.device.type,
    device_vendor: parserResults.device.vendor,
    engine_name: parserResults.engine.name,
    engine_version: parserResults.engine.version,
    os_name: parserResults.os.name,
  };

  return {
    parserResults,
    uaTokenItems
  }
}