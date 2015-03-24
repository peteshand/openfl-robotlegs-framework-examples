package com.imagination.robotlegs.basic.away3d;

import openfl.display.Sprite;
import robotlegs.bender.bundles.mvcs.MVCSBundle;

import com.imagination.robotlegs.basic.away3d.commands.CommandConfig;
import com.imagination.robotlegs.basic.away3d.model.ModelConfig;
import com.imagination.robotlegs.basic.away3d.services.ServiceConfig;
import com.imagination.robotlegs.basic.away3d.view.ViewConfig;

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
			.install([MVCSBundle])
			.configure([CommandConfig, ModelConfig, ServiceConfig, ViewConfig])
			.configure([new ContextView(this)]);
	}
}
