package robotlegs.bender.bundles
{
	import robotlegs.bender.extensions.stage3D.flare3d.FlareIntegrationExtension
	import robotlegs.bender.extensions.stage3D.flare3d.FlareStageSyncExtension;
	import robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension;
	import robotlegs.bender.framework.api.IBundle;
	import robotlegs.bender.framework.api.IContext;
	
	public class Flare3DBundle implements IBundle
	{
		/*============================================================================*/
		/* Public Functions                                                           */
		/*============================================================================*/

		/** @inheritDoc **/
		public function extend(context:IContext):void
		{
			context.install(
				Stage3DStackExtension,
				FlareIntegrationExtension,
				Stage3DStackExtension
			);
		}
	}
}
