package robotlegs.bender.bundles
{
	import robotlegs.bender.extensions.stage3D.away3d.AlternativaIntegrationExtension;
	import robotlegs.bender.extensions.stage3D.away3d.AlternativaStageSyncExtension;
	import robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension;
	import robotlegs.bender.framework.api.IBundle;
	import robotlegs.bender.framework.api.IContext;
	
	public class Alternativa3DBundle implements IBundle
	{
		/*============================================================================*/
		/* Public Functions                                                           */
		/*============================================================================*/

		/** @inheritDoc **/
		public function extend(context:IContext):void
		{
			context.install(
				Stage3DStackExtension,
				AlternativaIntegrationExtension,
				AlternativaStageSyncExtension
			);
			
		}
	}
}
