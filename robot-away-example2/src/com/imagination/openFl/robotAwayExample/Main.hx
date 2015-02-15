package com.imagination.openFl.robotAwayExample;

import openfl.display.Sprite;

import com.imagination.openFl.robotAwayExample.commands.CommandConfig;
import com.imagination.openFl.robotAwayExample.model.config.ConfigModel;
import com.imagination.openFl.robotAwayExample.model.ModelConfig;
import com.imagination.openFl.robotAwayExample.services.ServiceConfig;
import com.imagination.openFl.robotAwayExample.view.ViewConfig;

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