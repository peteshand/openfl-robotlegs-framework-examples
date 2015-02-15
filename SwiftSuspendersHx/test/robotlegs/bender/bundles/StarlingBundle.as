package robotlegs.bender.bundles
{
	import robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension;
	import robotlegs.bender.extensions.stage3D.starling.StarlingIntegrationExtension;
	import robotlegs.bender.extensions.stage3D.starling.StarlingStageSyncExtension;
	import robotlegs.bender.framework.api.IBundle;
	import robotlegs.bender.framework.api.IContext;
	
	public class StarlingBundle implements IBundle
	{
		/*============================================================================*/
		/* Public Functions                                                           */
		/*============================================================================*/

		/** @inheritDoc **/
		public function extend(context:IContext):void
		{
			context.install(
				Stage3DStackExtension,
				StarlingIntegrationExtension,
				StarlingStageSyncExtension
			);
			
		}
	}
}
