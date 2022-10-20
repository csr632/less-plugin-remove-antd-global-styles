import Less from 'less'
import path from 'path'
import { normalizePath } from './utils'

// ref: less-plugin-module-resolver
// https://github.com/bundle-matters/less-plugin-module-resolver/blob/main/src/alias-file-manager.ts

export class LessPluginRemoveAntdGlobalStyles implements Less.Plugin {
  constructor() {}

  public install(_less: LessStatic, pluginManager: Less.PluginManager): void {
    pluginManager.addFileManager(new FileManager())
  }
}

class FileManager extends Less.FileManager {
  constructor() {
    super()
  }
  public supports(
    filename: string,
    currentDirectory: string,
    _options: Less.LoadFileOptions,
    _environment: Less.Environment
  ): boolean {
    if (filename.includes('global')) {
      // match antd global style file
      const fullPath = normalizePath(path.join(currentDirectory, filename))
      if (
        fullPath.includes('antd/es/style/core/global') ||
        fullPath.includes('antd/lib/style/core/global')
      ) {
        return true
      }
    }
    return false
  }

  public async loadFile(): Promise<Less.FileLoadResult> {
    return {
      filename: 'dummy-empty-global-style.less',
      contents: '',
    }
  }
}
