package robotlegs.bender.extensions.imag.impl.commands.errorLogging
{
	CONFIG::air import flash.desktop.NativeApplication;
	CONFIG::air import flash.filesystem.File;
	CONFIG::air import flash.filesystem.FileMode;
	CONFIG::air import flash.filesystem.FileStream;
	/**
	* ...
	* @author Pete Shand
	*/
	internal class FileLog
	{
		CONFIG::air private var targetFile:File;
		CONFIG::air private var fileStream:FileStream;
		
		private var logContent:String = "";
		private var _saveDestination:int = -1;
		private const newline:String = "\r\n";
		
		public function FileLog():void
		{
			CONFIG::air {
				var now:Date = new Date();
				var path:String = "imagination/" + NativeApplication.nativeApplication.applicationID + "/errorLog/";
				var fileName:String = "errorLog-" + now.toDateString().split(" ").join("") + ".txt";
				targetFile = File.documentsDirectory;
				targetFile = targetFile.resolvePath(path + fileName);
			}
		}
		
		public function set saveDestination(destination:int):void
		{
			if (CONFIG::air) {
				_saveDestination = destination;
			}
		}
		
		public function get saveDestination():int 
		{
			return _saveDestination;
		}
		
		public function log(error:String):void 
		{
			if (CONFIG::air) {
				if (!targetFile && saveDestination == -1) {
					saveDestination = 0;
					Clear();
				}
			}
			ReadLogFile();
			WriteLogFile(error);
		}

		private function ReadLogFile():void
		{
			if (CONFIG::air) {
				if (targetFile.exists){
					fileStream = new FileStream();
					fileStream.open(targetFile, FileMode.READ);
					logContent = fileStream.readUTFBytes(fileStream.bytesAvailable);
					fileStream.close();
					return;
				}
			}
		}

		private function WriteLogFile(error:String):void
		{
			if (CONFIG::air) {
				fileStream = new FileStream();
				fileStream.open(targetFile, FileMode.WRITE);
				fileStream.writeUTFBytes(logContent + error + newline);
				fileStream.close();
				return;
			}
			trace("error");
		}
		
		private function Clear():void
		{
			WriteLogFile("");
		}
	}
}