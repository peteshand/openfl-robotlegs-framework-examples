package com.imagination.todo;

import openfl.display.Sprite;

import com.imagination.todo.view.ViewConfig;
import com.imagination.todo.commands.CommandConfig;
import com.imagination.todo.model.ModelConfig;
import com.imagination.todo.services.ServiceConfig;

import robotlegs.bender.bundles.mvcs.MVCSBundle;
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
			.configure(new ContextView(this));
		
	}
}
