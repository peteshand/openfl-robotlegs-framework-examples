package com.imagination.robotlegs.away3d;

import openfl.display.Sprite;

import com.imagination.robotlegs.away3d.commands.CommandConfig;
import com.imagination.robotlegs.away3d.model.config.ConfigModel;
import com.imagination.robotlegs.away3d.model.ModelConfig;
import com.imagination.robotlegs.away3d.services.ServiceConfig;
import com.imagination.robotlegs.away3d.view.ViewConfig;

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
			.install([ImagBundle, Away3DBundle])
			.configure([new ConfigModel()])
			.configure([CommandConfig, ModelConfig, ServiceConfig, ViewConfig])
			.configure([new ContextView(this)]);
	}
}
