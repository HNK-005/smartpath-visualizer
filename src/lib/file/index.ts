export class FileHandler {
  public async saveFile(data: string): Promise<void> {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'data.json',
        types: [
          {
            description: 'File JSON',
            accept: { 'application/json': ['.json'] },
          },
        ],
      });
      const write = await handle.createWritable();
      write.write(data);
      await write.close();
    } catch (error) {
      console.error('File save cancelled or failed:', error);
      return;
    }
  }

  public async readFile(): Promise<string | null> {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'File JSON',
            accept: { 'application/json': ['.json'] },
          },
        ],
        multiple: false,
      });
      const file = await handle.getFile();
      const content = await file.text();
      return content;
    } catch (error) {
      console.error('File open cancelled or failed:', error);
      return null;
    }
  }
}
