package robotlegs.bender.bundles
{
	import robotlegs.bender.extensions.stage3D.away3d.AwayIntegrationExtension;
	import robotlegs.bender.extensions.stage3D.away3d.AwayStageSyncExtension;
	import robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension;
	import robotlegs.bender.extensions.stage3D.genome.GenomeIntegrationExtension;
	import robotlegs.bender.extensions.stage3D.genome.GenomeStageSyncExtension;
	import robotlegs.bender.framework.api.IBundle;
	import robotlegs.bender.framework.api.IContext;
	
	public class GenomeBundle implements IBundle
	{
		/*============================================================================*/
		/* Public Functions                                                           */
		/*============================================================================*/

		/** @inheritDoc **/
		public function extend(context:IContext):void
		{
			context.install(
				Stage3DStackExtension,
				GenomeIntegrationExtension,
				GenomeStageSyncExtension
			);
			
		}
	}
}
