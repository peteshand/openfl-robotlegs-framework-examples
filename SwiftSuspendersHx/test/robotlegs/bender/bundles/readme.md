# Imagination Bundle

This bundle installs a number of extensions and configurations for Imagination Creative Developers.
The idea behind this bundle is to make it easier to re-use common functionality between apps, reducing setup time and code duplication.

## Included Extensions

* DefaultAppSettingsExtension -  
* ConfigExtension -  
* ImagServiceExtension -  
* LoggingExtension - allows you to inject loggers into clients
* TraceLoggingExtension - sets up a simple trace log target
* SARSIntegrationExtension - allows you to inject Starling (with named injection) and Away3D views
* SARSContextViewExtension - consumes a display object container as the contextView (reimplementation of ContextViewExtension to disallow View3D being mapped as context view)
* EventDispatcherExtension - makes a shared event dispatcher available
* ModularityExtension - allows the context to expose and/or inherit dependencies
* CommandMapExtension - the foundation for other command map extensions
* EventCommandMapExtension - an event driven command map
* LocalEventMapExtension - automatically cleans up listeners for its clients
* ViewManagerExtension - allows you to add multiple containers as "view roots"
* StageObserverExtension - watches the stage for view components using magic
* ManualStageObserverExtension - non-magical view wiring
* MediatorMapExtension - configures and creates mediators for view components
* SignalCommandMapExtension - an signal driven command map
* SARSStageSyncExtension - automatically initialize context when all Starling views and context view gain stage reference.

Note: for more information on these extensions please see the extensions package.

## Included Configs

* ContextViewListenerConfig - adds the contextView to the viewManager

## Usage

Example of using bundle:

	_context = new Context()
		.install(ImagBundle)
		.configure(new ConfigModel())
		.configure(CommandConfig, ModelConfig, ServiceConfig, ViewConfig)
		.configure(new ContextView(this));