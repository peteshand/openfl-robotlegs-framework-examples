package com.imagination.robotlegs.starling;

import openfl.display.Sprite;
import robotlegs.bender.bundles.StarlingBundle;

import com.imagination.robotlegs.starling.commands.CommandConfig;
import com.imagination.robotlegs.starling.model.config.ConfigModel;
import com.imagination.robotlegs.starling.model.ModelConfig;
import com.imagination.robotlegs.starling.services.ServiceConfig;
import com.imagination.robotlegs.starling.view.ViewConfig;

import robotlegs.bender.bundles.Away3DBundle;
import robotlegs.bender.bundles.ImagBundle;
import robotlegs.bender.extensions.contextView.ContextView;
import robotlegs.bender.framework.api.IContext;
import robotlegs.bender.framework.impl.Context;

/**
 * ...
 * @author P.J.Shand
 */

class Main extends Sprite 
{
	private var _context:IContext;
	
	public function new() 
	{
		super();
		
		_context = new Context()
			.install([ImagBundle, Away3DBundle, StarlingBundle])
			.configure(new ConfigModel())
			.configure([CommandConfig, ModelConfig, ServiceConfig, ViewConfig])
			.configure(new ContextView(this));
		
	}
}
