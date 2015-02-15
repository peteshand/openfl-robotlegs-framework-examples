package robotlegs.bender.extensions.stage3D.genome.impl
{
	import flash.utils.Dictionary;
	import robotlegs.bender.extensions.stage3D.base.impl.BaseCollection;
	import robotlegs.bender.extensions.stage3D.genome.impl.GenomeLayer;
	
	/**
	 * The <code>GenomeCollection</code> class represents collection of GenomeLayer
	 * instances which will be used in SARS extension.
	 * 
	 * <p>This class will adds support to have multiple instances of GenomeLayer available
	 * in Robotlegs application. All GenomeLayer instances when added to collection must
	 * have defined name which will actually be used as named injection of GenomeLayer
	 * view.</p>
	 */	
	public class GenomeCollection extends BaseCollection
	{
		
		public function GenomeCollection(genomeCollectionData:Array=null) 
		{
			if (genomeCollectionData){
				addItem(GenomeLayer(genomeCollectionData[0]), String(genomeCollectionData[1]));
			}
		}
		
		/*============================================================================*/
		/* Public Methods
		/*============================================================================*/
		
		/**
		 * Add GenomeLayer instance to collection.
		 * 
		 * <p>Instance will be added to dictionary with key as name provided. When 
		 * using this collection with SARS, GenomeLayer views will be mapped to injector
		 * and differentiated by named injection. Name will be exact same as one
		 * provieded when adding instance to this collection.</p>
		 * 
		 * @param genome GenomeLayer instace to add to collection.
		 * 
		 * @param name Name by which GenomeLayer instance will be remembered.
		 * 
		 * @return Return number of instances in collection.
		 */
		public var genomes:Vector.<GenomeLayer> = new Vector.<GenomeLayer>();
		
		public function addItem(genome:GenomeLayer, name:String):uint
		{
			genomes.push(genome);
			
			if (_collection[name] == undefined) {
				_collection[name] = genome;
				_length++;
			}
			
			return _length;
		}
		
		/**
		 * Remove GenomeLayer item from collection by its name.
		 * 
		 * @param name Name by which GenomeLayer instance was added to collection.
		 * 
		 * @return Returns GenomeLayer instance which was removed if it is found, or if 
		 * not found by that name, returns <code>null</code>. 
		 */		
		public function removeItem(name:String):GenomeLayer
		{
			var result:GenomeLayer = getItem(name);
			for (var i:int = 0; i < genomes.length; i++) 
			{
				if (genomes[i] == result) genomes.splice(i, 1);
			}
			//If GenomeLayer instance is found in collection, remove entry
			if (result) {
				delete _collection[name];
				_length--;
			}
			
			return result;
		}
		
		/**
		 * Get GenomeLayer instance by name.
		 * 
		 * @param name Name provided when GenomeLayer instance was added to collection.
		 * 
		 * @return Returns GenomeLayer instance it it was found, or <code>null</code> 
		 * otherwise.
		 */		
		public function getItem(name:String):GenomeLayer
		{
			if (_collection[name] == undefined)
				return null;
			
			return GenomeLayer(_collection[name]);
		}
	}
}