package com.imagination.robotlegs.imagBasic;

import openfl.display.Sprite;

import com.imagination.robotlegs.imagBasic.commands.CommandConfig;
import com.imagination.robotlegs.imagBasic.model.config.ConfigModel;
import com.imagination.robotlegs.imagBasic.model.ModelConfig;
import com.imagination.robotlegs.imagBasic.services.ServiceConfig;
import com.imagination.robotlegs.imagBasic.view.ViewConfig;

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
			.install([ImagBundle])
			.configure([new ConfigModel()])
			.configure([CommandConfig, ModelConfig, ServiceConfig, ViewConfig])
			.configure([new ContextView(this)]);
	}
}
