package com.imagination.interoperation;

import openfl.display.Sprite;

import com.imagination.interoperation.view.ViewConfig;
import com.imagination.interoperation.commands.CommandConfig;
import com.imagination.interoperation.model.ModelConfig;
import com.imagination.interoperation.services.ServiceConfig;

import robotlegs.bender.bundles.mvcs.MVCSBundle;
import robotlegs.bender.bundles.stage3D.Stage3DBundle;
import robotlegs.bender.bundles.stage3D.Away3DBundle;
import robotlegs.bender.bundles.stage3D.StarlingBundle;
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
			.install([MVCSBundle, Stage3DBundle, Away3DBundle, StarlingBundle])
			.configure([CommandConfig, ModelConfig, ServiceConfig, ViewConfig])
			.configure(new ContextView(this));
		
	}
}
