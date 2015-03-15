(function ($hx_exports) { "use strict";
$hx_exports.openfl = $hx_exports.openfl || {};
$hx_exports.lime = $hx_exports.lime || {};
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.config = null;
ApplicationMain.preloader = null;
ApplicationMain.app = null;
ApplicationMain.create = function() {
	ApplicationMain.app = new openfl.display.Application();
	ApplicationMain.app.create(ApplicationMain.config);
	var display = new NMEPreloader();
	ApplicationMain.preloader = new openfl.display.Preloader(display);
	ApplicationMain.preloader.onComplete = ApplicationMain.init;
	ApplicationMain.preloader.create(ApplicationMain.config);
	var urls = [];
	var types = [];
	urls.push("xml/config.xml");
	types.push("TEXT");
	urls.push("xml/_example_config.xml");
	types.push("TEXT");
	ApplicationMain.preloader.load(urls,types);
	var result = ApplicationMain.app.exec();
};
ApplicationMain.init = function() {
	var loaded = 0;
	var total = 0;
	var library_onLoad = function(__) {
		loaded++;
		if(loaded == total) ApplicationMain.start();
	};
	ApplicationMain.preloader = null;
	if(loaded == total) ApplicationMain.start();
};
ApplicationMain.main = function() {
	ApplicationMain.config = { antialiasing : 0, background : 0, borderless : false, depthBuffer : false, fps : 60, fullscreen : true, height : 0, orientation : "", resizable : true, stencilBuffer : false, title : "ImagRobotlegsBasic", vsync : false, width : 0};
};
ApplicationMain.start = function() {
	openfl.Lib.current.stage.align = openfl.display.StageAlign.TOP_LEFT;
	openfl.Lib.current.stage.scaleMode = openfl.display.StageScaleMode.NO_SCALE;
	var hasMain = false;
	var _g = 0;
	var _g1 = Type.getClassFields(com.imagination.robotlegs.imagBasic.Main);
	while(_g < _g1.length) {
		var methodName = _g1[_g];
		++_g;
		if(methodName == "main") {
			hasMain = true;
			break;
		}
	}
	if(hasMain) Reflect.callMethod(com.imagination.robotlegs.imagBasic.Main,Reflect.field(com.imagination.robotlegs.imagBasic.Main,"main"),[]); else {
		var instance = Type.createInstance(DocumentClass,[]);
	}
	openfl.Lib.current.stage.dispatchEvent(new openfl.events.Event(openfl.events.Event.RESIZE,false,false));
};
var openfl = {};
openfl.events = {};
openfl.events.IEventDispatcher = function() { };
$hxClasses["openfl.events.IEventDispatcher"] = openfl.events.IEventDispatcher;
openfl.events.IEventDispatcher.__name__ = ["openfl","events","IEventDispatcher"];
openfl.events.IEventDispatcher.prototype = {
	addEventListener: null
	,dispatchEvent: null
	,hasEventListener: null
	,removeEventListener: null
	,willTrigger: null
	,__class__: openfl.events.IEventDispatcher
};
openfl.events.EventDispatcher = function(target) {
	if(target != null) this.__targetDispatcher = target;
};
$hxClasses["openfl.events.EventDispatcher"] = openfl.events.EventDispatcher;
openfl.events.EventDispatcher.__name__ = ["openfl","events","EventDispatcher"];
openfl.events.EventDispatcher.__interfaces__ = [openfl.events.IEventDispatcher];
openfl.events.EventDispatcher.__sortByPriority = function(l1,l2) {
	if(l1.priority == l2.priority) return 0; else if(l1.priority > l2.priority) return -1; else return 1;
};
openfl.events.EventDispatcher.prototype = {
	__targetDispatcher: null
	,__eventMap: null
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		if(this.__eventMap == null) this.__eventMap = new haxe.ds.StringMap();
		if(!this.__eventMap.exists(type)) {
			var list = new Array();
			list.push(new openfl.events._EventDispatcher.Listener(listener,useCapture,priority));
			this.__eventMap.set(type,list);
		} else {
			var list1 = this.__eventMap.get(type);
			var _g1 = 0;
			var _g = list1.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(Reflect.compareMethods(list1[i].callback,listener)) return;
			}
			list1.push(new openfl.events._EventDispatcher.Listener(listener,useCapture,priority));
			list1.sort(openfl.events.EventDispatcher.__sortByPriority);
		}
	}
	,dispatchEvent: function(event) {
		if(this.__eventMap == null || event == null) return false;
		var list = this.__eventMap.get(event.type);
		if(list == null) return false;
		if(event.target == null) {
			if(this.__targetDispatcher != null) event.target = this.__targetDispatcher; else event.target = this;
		}
		event.currentTarget = this;
		if(event.target == event.currentTarget) event.eventPhase = openfl.events.EventPhase.AT_TARGET;
		var capture = event.eventPhase == openfl.events.EventPhase.CAPTURING_PHASE;
		var index = 0;
		var listener;
		while(index < list.length) {
			listener = list[index];
			if(listener.useCapture == capture) {
				listener.callback(event);
				if(event.__isCancelledNow) return true;
			}
			if(listener == list[index]) index++;
		}
		return true;
	}
	,hasEventListener: function(type) {
		if(this.__eventMap == null) return false;
		return this.__eventMap.exists(type);
	}
	,removeEventListener: function(type,listener,capture) {
		if(capture == null) capture = false;
		if(this.__eventMap == null) return;
		var list = this.__eventMap.get(type);
		if(list == null) return;
		var _g1 = 0;
		var _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].match(listener,capture)) {
				list.splice(i,1);
				break;
			}
		}
		if(list.length == 0) this.__eventMap.remove(type);
		if(!this.__eventMap.iterator().hasNext()) this.__eventMap = null;
	}
	,willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,__class__: openfl.events.EventDispatcher
};
openfl.display = {};
openfl.display.IBitmapDrawable = function() { };
$hxClasses["openfl.display.IBitmapDrawable"] = openfl.display.IBitmapDrawable;
openfl.display.IBitmapDrawable.__name__ = ["openfl","display","IBitmapDrawable"];
openfl.display.DisplayObject = function() {
	openfl.events.EventDispatcher.call(this);
	this.set_alpha(1);
	this.set_rotation(0);
	this.set_scaleX(1);
	this.set_scaleY(1);
	this.set_visible(true);
	this.set_x(0);
	this.set_y(0);
	this.__worldAlpha = 1;
	this.__worldTransform = new openfl.geom.Matrix();
	this.__rotationCache = 0;
	this.__rotationSine = 0;
	this.__rotationCosine = 1;
	this.__worldVisible = true;
	this.set_name("instance" + ++openfl.display.DisplayObject.__instanceCount);
};
$hxClasses["openfl.display.DisplayObject"] = openfl.display.DisplayObject;
openfl.display.DisplayObject.__name__ = ["openfl","display","DisplayObject"];
openfl.display.DisplayObject.__interfaces__ = [openfl.display.IBitmapDrawable];
openfl.display.DisplayObject.__super__ = openfl.events.EventDispatcher;
openfl.display.DisplayObject.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	blendMode: null
	,cacheAsBitmap: null
	,loaderInfo: null
	,parent: null
	,stage: null
	,__worldTransform: null
	,__alpha: null
	,__graphics: null
	,__isMask: null
	,__mask: null
	,__name: null
	,__renderable: null
	,__renderDirty: null
	,__rotation: null
	,__rotationCache: null
	,__rotationCosine: null
	,__rotationSine: null
	,__scaleX: null
	,__scaleY: null
	,__scrollRect: null
	,__transformDirty: null
	,__visible: null
	,__worldAlpha: null
	,__worldAlphaChanged: null
	,__worldClip: null
	,__worldClipChanged: null
	,__worldTransformCache: null
	,__worldTransformChanged: null
	,__worldVisible: null
	,__worldVisibleChanged: null
	,__worldZ: null
	,__x: null
	,__y: null
	,__canvas: null
	,__context: null
	,__style: null
	,dispatchEvent: function(event) {
		if(event.type == openfl.events.Event.ADDED_TO_STAGE) {
			if(this.parent != null && this.parent != this) {
				this.parent.__targetDispatcher = this;
				this.parent.dispatchEvent(event);
			}
		} else event.eventPhase = openfl.events.EventPhase.AT_TARGET;
		var result = openfl.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
		if(event.__isCancelled) return true;
		if(event.bubbles && this.parent != null && this.parent != this) {
			event.eventPhase = openfl.events.EventPhase.BUBBLING_PHASE;
			this.parent.dispatchEvent(event);
		}
		return result;
	}
	,globalToLocal: function(pos) {
		return this.__getTransform().clone().invert().transformPoint(pos);
	}
	,__broadcast: function(event,notifyChilden) {
		if(this.__eventMap != null && this.hasEventListener(event.type)) {
			var result = openfl.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
			if(event.__isCancelled) return true;
			return result;
		}
		return false;
	}
	,__getBounds: function(rect,matrix) {
	}
	,__getTransform: function() {
		if(openfl.display.DisplayObject.__worldTransformDirty > 0) {
			var list = [];
			var current = this;
			var transformDirty = this.__transformDirty;
			while(current.parent != null) {
				list.push(current);
				current = current.parent;
				if(current.__transformDirty) transformDirty = true;
			}
			if(transformDirty) {
				var i = list.length;
				while(--i >= 0) list[i].__update(true,false);
			}
		}
		return this.__worldTransform;
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		return false;
	}
	,__renderCanvas: function(renderSession) {
	}
	,__renderDOM: function(renderSession) {
	}
	,__renderGL: function(renderSession) {
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) this.dispatchEvent(new openfl.events.Event(openfl.events.Event.REMOVED_FROM_STAGE,false,false));
			this.stage = stage;
			if(stage != null) this.dispatchEvent(new openfl.events.Event(openfl.events.Event.ADDED_TO_STAGE,false,false));
		}
	}
	,__update: function(transformOnly,updateChildren) {
		this.__renderable = this.get_visible() && this.get_scaleX() != 0 && this.get_scaleY() != 0 && !this.__isMask;
		if(this.get_rotation() != this.__rotationCache) {
			this.__rotationCache = this.get_rotation();
			var radians = this.get_rotation() * (Math.PI / 180);
			this.__rotationSine = Math.sin(radians);
			this.__rotationCosine = Math.cos(radians);
		}
		if(this.parent != null) {
			var parentTransform = this.parent.__worldTransform;
			var a00 = this.__rotationCosine * this.get_scaleX();
			var a01 = this.__rotationSine * this.get_scaleX();
			var a10 = -this.__rotationSine * this.get_scaleY();
			var a11 = this.__rotationCosine * this.get_scaleY();
			var b00 = parentTransform.a;
			var b01 = parentTransform.b;
			var b10 = parentTransform.c;
			var b11 = parentTransform.d;
			this.__worldTransform.a = a00 * b00 + a01 * b10;
			this.__worldTransform.b = a00 * b01 + a01 * b11;
			this.__worldTransform.c = a10 * b00 + a11 * b10;
			this.__worldTransform.d = a10 * b01 + a11 * b11;
			if(this.get_scrollRect() == null) {
				this.__worldTransform.tx = this.get_x() * b00 + this.get_y() * b10 + parentTransform.tx;
				this.__worldTransform.ty = this.get_x() * b01 + this.get_y() * b11 + parentTransform.ty;
			} else {
				this.__worldTransform.tx = (this.get_x() - this.get_scrollRect().x) * b00 + (this.get_y() - this.get_scrollRect().y) * b10 + parentTransform.tx;
				this.__worldTransform.ty = (this.get_x() - this.get_scrollRect().x) * b01 + (this.get_y() - this.get_scrollRect().y) * b11 + parentTransform.ty;
			}
		} else {
			this.__worldTransform.a = this.__rotationCosine * this.get_scaleX();
			this.__worldTransform.c = -this.__rotationSine * this.get_scaleY();
			this.__worldTransform.b = this.__rotationSine * this.get_scaleX();
			this.__worldTransform.d = this.__rotationCosine * this.get_scaleY();
			if(this.get_scrollRect() == null) {
				this.__worldTransform.tx = this.get_x();
				this.__worldTransform.ty = this.get_y();
			} else {
				this.__worldTransform.tx = this.get_y() - this.get_scrollRect().x;
				this.__worldTransform.ty = this.get_y() - this.get_scrollRect().y;
			}
		}
		if(updateChildren && this.__transformDirty) {
			this.__transformDirty = false;
			openfl.display.DisplayObject.__worldTransformDirty--;
		}
		if(!transformOnly) {
			this.__worldTransformChanged = !this.__worldTransform.equals(this.__worldTransformCache);
			this.__worldTransformCache = this.__worldTransform.clone();
			var worldClip = null;
			if(this.parent != null) {
				var worldVisible = this.parent.__worldVisible && this.get_visible();
				this.__worldVisibleChanged = this.__worldVisible != worldVisible;
				this.__worldVisible = worldVisible;
				var worldAlpha = this.get_alpha() * this.parent.__worldAlpha;
				this.__worldAlphaChanged = this.__worldAlpha != worldAlpha;
				this.__worldAlpha = worldAlpha;
				if(this.parent.__worldClip != null) worldClip = this.parent.__worldClip.clone();
				if(this.get_scrollRect() != null) {
					var bounds = this.get_scrollRect().clone();
					bounds = bounds.transform(this.__worldTransform);
					if(worldClip != null) bounds.__contract(worldClip.x - this.get_scrollRect().x,worldClip.y - this.get_scrollRect().y,worldClip.width,worldClip.height);
					worldClip = bounds;
				}
			} else {
				this.__worldAlpha = this.get_alpha();
				this.__worldVisibleChanged = this.__worldVisible != this.get_visible();
				this.__worldVisible = this.get_visible();
				this.__worldAlphaChanged = this.__worldAlpha != this.get_alpha();
				if(this.get_scrollRect() != null) worldClip = this.get_scrollRect().clone().transform(this.__worldTransform);
			}
			this.__worldClipChanged = worldClip == null && this.__worldClip != null || worldClip != null && !worldClip.equals(this.__worldClip);
			this.__worldClip = worldClip;
			if(updateChildren && this.__renderDirty) this.__renderDirty = false;
		}
	}
	,__updateChildren: function(transformOnly) {
		this.__renderable = this.get_visible() && this.get_scaleX() != 0 && this.get_scaleY() != 0 && !this.__isMask;
		if(!this.__renderable && !this.__isMask) return;
		this.__worldAlpha = this.get_alpha();
		if(this.__transformDirty) {
			this.__transformDirty = false;
			openfl.display.DisplayObject.__worldTransformDirty--;
		}
	}
	,get_alpha: function() {
		return this.__alpha;
	}
	,set_alpha: function(value) {
		if(value != this.__alpha) {
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
		}
		return this.__alpha = value;
	}
	,set_height: function(value) {
		var bounds = new openfl.geom.Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl.geom.Matrix());
		if(value != bounds.height) this.set_scaleY(value / bounds.height); else this.set_scaleY(1);
		return value;
	}
	,set_name: function(value) {
		return this.__name = value;
	}
	,get_rotation: function() {
		return this.__rotation;
	}
	,set_rotation: function(value) {
		if(value != this.__rotation) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__rotation = value;
	}
	,get_scaleX: function() {
		return this.__scaleX;
	}
	,set_scaleX: function(value) {
		if(value != this.__scaleX) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scaleX = value;
	}
	,get_scaleY: function() {
		return this.__scaleY;
	}
	,set_scaleY: function(value) {
		if(this.__scaleY != value) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__scaleY = value;
	}
	,get_scrollRect: function() {
		return this.__scrollRect;
	}
	,set_scrollRect: function(value) {
		if(value != this.__scrollRect) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
		}
		return this.__scrollRect = value;
	}
	,get_visible: function() {
		return this.__visible;
	}
	,set_visible: function(value) {
		if(value != this.__visible) {
			if(!this.__renderDirty) {
				this.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
		}
		return this.__visible = value;
	}
	,set_width: function(value) {
		var bounds = new openfl.geom.Rectangle();
		this.__getTransform();
		this.__getBounds(bounds,new openfl.geom.Matrix());
		if(value != bounds.width) this.set_scaleX(value / bounds.width); else this.set_scaleX(1);
		return value;
	}
	,get_x: function() {
		return this.__x;
	}
	,set_x: function(value) {
		if(value != this.__x) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__x = value;
	}
	,get_y: function() {
		return this.__y;
	}
	,set_y: function(value) {
		if(value != this.__y) {
			if(!this.__transformDirty) {
				this.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
		}
		return this.__y = value;
	}
	,__class__: openfl.display.DisplayObject
	,__properties__: {set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_width:"set_width",set_visible:"set_visible",get_visible:"get_visible",set_scrollRect:"set_scrollRect",get_scrollRect:"get_scrollRect",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_rotation:"set_rotation",get_rotation:"get_rotation",set_name:"set_name",set_height:"set_height",set_alpha:"set_alpha",get_alpha:"get_alpha"}
});
openfl.display.InteractiveObject = function() {
	openfl.display.DisplayObject.call(this);
	this.doubleClickEnabled = false;
	this.mouseEnabled = true;
	this.needsSoftKeyboard = false;
	this.tabEnabled = true;
	this.tabIndex = -1;
};
$hxClasses["openfl.display.InteractiveObject"] = openfl.display.InteractiveObject;
openfl.display.InteractiveObject.__name__ = ["openfl","display","InteractiveObject"];
openfl.display.InteractiveObject.__super__ = openfl.display.DisplayObject;
openfl.display.InteractiveObject.prototype = $extend(openfl.display.DisplayObject.prototype,{
	doubleClickEnabled: null
	,mouseEnabled: null
	,needsSoftKeyboard: null
	,tabEnabled: null
	,tabIndex: null
	,__getInteractive: function(stack) {
		stack.push(this);
		if(this.parent != null) this.parent.__getInteractive(stack);
	}
	,__class__: openfl.display.InteractiveObject
});
openfl.display.DisplayObjectContainer = function() {
	openfl.display.InteractiveObject.call(this);
	this.mouseChildren = true;
	this.__children = new Array();
	this.__removedChildren = new Array();
};
$hxClasses["openfl.display.DisplayObjectContainer"] = openfl.display.DisplayObjectContainer;
openfl.display.DisplayObjectContainer.__name__ = ["openfl","display","DisplayObjectContainer"];
openfl.display.DisplayObjectContainer.__super__ = openfl.display.InteractiveObject;
openfl.display.DisplayObjectContainer.prototype = $extend(openfl.display.InteractiveObject.prototype,{
	mouseChildren: null
	,__children: null
	,__removedChildren: null
	,addChild: function(child) {
		if(child != null) {
			if(child.parent != null) child.parent.removeChild(child);
			this.__children.push(child);
			child.parent = this;
			if(this.stage != null) child.__setStageReference(this.stage);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
			var event = new openfl.events.Event(openfl.events.Event.ADDED,true);
			event.target = child;
			child.dispatchEvent(event);
		}
		return child;
	}
	,addChildAt: function(child,index) {
		if(index > this.__children.length || index < 0) throw "Invalid index position " + index;
		if(child.parent == this) HxOverrides.remove(this.__children,child); else {
			if(child.parent != null) child.parent.removeChild(child);
			child.parent = this;
			if(this.stage != null) child.__setStageReference(this.stage);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
			var event = new openfl.events.Event(openfl.events.Event.ADDED,true);
			event.target = child;
			child.dispatchEvent(event);
		}
		this.__children.splice(index,0,child);
		return child;
	}
	,contains: function(child) {
		return HxOverrides.indexOf(this.__children,child,0) > -1;
	}
	,getChildAt: function(index) {
		if(index >= 0 && index < this.__children.length) return this.__children[index];
		return null;
	}
	,removeChild: function(child) {
		if(child != null && child.parent == this) {
			if(this.stage != null) child.__setStageReference(null);
			child.parent = null;
			HxOverrides.remove(this.__children,child);
			this.__removedChildren.push(child);
			if(!child.__transformDirty) {
				child.__transformDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty++;
			}
			if(!child.__renderDirty) {
				child.__renderDirty = true;
				openfl.display.DisplayObject.__worldRenderDirty++;
			}
			child.dispatchEvent(new openfl.events.Event(openfl.events.Event.REMOVED,true));
		}
		return child;
	}
	,__broadcast: function(event,notifyChilden) {
		if(event.target == null) event.target = this;
		if(notifyChilden) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__broadcast(event,true);
				if(event.__isCancelled) return true;
			}
		}
		return openfl.display.InteractiveObject.prototype.__broadcast.call(this,event,notifyChilden);
	}
	,__getBounds: function(rect,matrix) {
		if(this.__children.length == 0) return;
		var matrixCache = null;
		if(matrix != null) {
			matrixCache = this.__worldTransform;
			this.__worldTransform = matrix;
			this.__updateChildren(true);
		}
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(!child.__renderable) continue;
			child.__getBounds(rect,null);
		}
		if(matrix != null) {
			this.__worldTransform = matrixCache;
			this.__updateChildren(true);
		}
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || interactiveOnly && !this.mouseEnabled) return false;
		var i = this.__children.length;
		if(interactiveOnly) {
			if(stack == null || !this.mouseChildren) {
				while(--i >= 0) if(this.__children[i].__hitTest(x,y,shapeFlag,null,true)) {
					if(stack != null) stack.push(this);
					return true;
				}
			} else if(stack != null) {
				var length = stack.length;
				while(--i >= 0) if(this.__children[i].__hitTest(x,y,shapeFlag,stack,interactiveOnly)) {
					stack.splice(length,0,this);
					return true;
				}
			}
		} else while(--i >= 0) this.__children[i].__hitTest(x,y,shapeFlag,stack,false);
		return false;
	}
	,__renderCanvas: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.get_scrollRect() != null) {
		}
		if(this.__mask != null) {
		}
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderCanvas(renderSession);
		}
		this.__removedChildren = [];
		if(this.__mask != null) {
		}
		if(this.get_scrollRect() != null) {
		}
	}
	,__renderDOM: function(renderSession) {
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderDOM(renderSession);
		}
		var _g2 = 0;
		var _g11 = this.__removedChildren;
		while(_g2 < _g11.length) {
			var orphan = _g11[_g2];
			++_g2;
			if(orphan.stage == null) orphan.__renderDOM(renderSession);
		}
		this.__removedChildren = [];
	}
	,__renderGL: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__renderGL(renderSession);
		}
		this.__removedChildren = [];
	}
	,__setStageReference: function(stage) {
		if(this.stage != stage) {
			if(this.stage != null) this.dispatchEvent(new openfl.events.Event(openfl.events.Event.REMOVED_FROM_STAGE,false,false));
			this.stage = stage;
			if(stage != null) this.dispatchEvent(new openfl.events.Event(openfl.events.Event.ADDED_TO_STAGE,false,false));
			if(this.__children != null) {
				var _g = 0;
				var _g1 = this.__children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					child.__setStageReference(stage);
				}
			}
		}
	}
	,__update: function(transformOnly,updateChildren) {
		openfl.display.InteractiveObject.prototype.__update.call(this,transformOnly,updateChildren);
		if(!this.__renderable && !this.__worldAlphaChanged && !this.__worldClipChanged && !this.__worldTransformChanged && !this.__worldVisibleChanged) return;
		if(updateChildren) {
			var _g = 0;
			var _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__update(transformOnly,true);
			}
		}
	}
	,__updateChildren: function(transformOnly) {
		openfl.display.InteractiveObject.prototype.__updateChildren.call(this,transformOnly);
		var _g = 0;
		var _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__update(transformOnly,true);
		}
	}
	,get_numChildren: function() {
		return this.__children.length;
	}
	,__class__: openfl.display.DisplayObjectContainer
	,__properties__: $extend(openfl.display.InteractiveObject.prototype.__properties__,{get_numChildren:"get_numChildren"})
});
openfl.display.Sprite = function() {
	openfl.display.DisplayObjectContainer.call(this);
	this.buttonMode = false;
	this.useHandCursor = true;
};
$hxClasses["openfl.display.Sprite"] = openfl.display.Sprite;
openfl.display.Sprite.__name__ = ["openfl","display","Sprite"];
openfl.display.Sprite.__super__ = openfl.display.DisplayObjectContainer;
openfl.display.Sprite.prototype = $extend(openfl.display.DisplayObjectContainer.prototype,{
	buttonMode: null
	,useHandCursor: null
	,__getBounds: function(rect,matrix) {
		openfl.display.DisplayObjectContainer.prototype.__getBounds.call(this,rect,matrix);
		if(this.__graphics != null) this.__graphics.__getBounds(rect,matrix != null?matrix:this.__worldTransform);
	}
	,__hitTest: function(x,y,shapeFlag,stack,interactiveOnly) {
		if(!this.get_visible() || interactiveOnly && !this.mouseEnabled) return false;
		var length = 0;
		if(stack != null) length = stack.length;
		if(openfl.display.DisplayObjectContainer.prototype.__hitTest.call(this,x,y,shapeFlag,stack,interactiveOnly)) return interactiveOnly; else if(this.__graphics != null && this.__graphics.__hitTest(x,y,shapeFlag,this.__getTransform())) {
			if(stack != null) stack.push(this);
			return true;
		}
		return false;
	}
	,__renderCanvas: function(renderSession) {
		openfl._internal.renderer.canvas.CanvasShape.render(this,renderSession);
		openfl.display.DisplayObjectContainer.prototype.__renderCanvas.call(this,renderSession);
	}
	,__renderDOM: function(renderSession) {
		openfl._internal.renderer.dom.DOMShape.render(this,renderSession);
		openfl.display.DisplayObjectContainer.prototype.__renderDOM.call(this,renderSession);
	}
	,__renderGL: function(renderSession) {
		if(!this.__renderable || this.__worldAlpha <= 0) return;
		if(this.__graphics != null) openfl._internal.renderer.opengl.utils.GraphicsRenderer.render(this,renderSession);
		openfl.display.DisplayObjectContainer.prototype.__renderGL.call(this,renderSession);
	}
	,get_graphics: function() {
		if(this.__graphics == null) this.__graphics = new openfl.display.Graphics();
		return this.__graphics;
	}
	,__class__: openfl.display.Sprite
	,__properties__: $extend(openfl.display.DisplayObjectContainer.prototype.__properties__,{get_graphics:"get_graphics"})
});
var com = {};
com.imagination = {};
com.imagination.robotlegs = {};
com.imagination.robotlegs.imagBasic = {};
com.imagination.robotlegs.imagBasic.Main = function() {
	openfl.display.Sprite.call(this);
	this._context = new robotlegs.bender.framework.impl.Context().install([robotlegs.bender.bundles.ImagBundle]).configure([new com.imagination.robotlegs.imagBasic.model.config.ConfigModel()]).configure([com.imagination.robotlegs.imagBasic.commands.CommandConfig,com.imagination.robotlegs.imagBasic.model.ModelConfig,com.imagination.robotlegs.imagBasic.services.ServiceConfig,com.imagination.robotlegs.imagBasic.view.ViewConfig]).configure([new robotlegs.bender.extensions.contextView.ContextView(this)]);
};
$hxClasses["com.imagination.robotlegs.imagBasic.Main"] = com.imagination.robotlegs.imagBasic.Main;
com.imagination.robotlegs.imagBasic.Main.__name__ = ["com","imagination","robotlegs","imagBasic","Main"];
com.imagination.robotlegs.imagBasic.Main.__super__ = openfl.display.Sprite;
com.imagination.robotlegs.imagBasic.Main.prototype = $extend(openfl.display.Sprite.prototype,{
	_context: null
	,__class__: com.imagination.robotlegs.imagBasic.Main
});
var DocumentClass = function() {
	openfl.Lib.current.addChild(this);
	com.imagination.robotlegs.imagBasic.Main.call(this);
	this.dispatchEvent(new openfl.events.Event(openfl.events.Event.ADDED_TO_STAGE,false,false));
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = ["DocumentClass"];
DocumentClass.__super__ = com.imagination.robotlegs.imagBasic.Main;
DocumentClass.prototype = $extend(com.imagination.robotlegs.imagBasic.Main.prototype,{
	__class__: DocumentClass
});
var lime = {};
lime.AssetLibrary = function() {
};
$hxClasses["lime.AssetLibrary"] = lime.AssetLibrary;
lime.AssetLibrary.__name__ = ["lime","AssetLibrary"];
lime.AssetLibrary.prototype = {
	eventCallback: null
	,exists: function(id,type) {
		return false;
	}
	,getBytes: function(id) {
		return null;
	}
	,getText: function(id) {
		var bytes = this.getBytes(id);
		if(bytes == null) return null; else return bytes.readUTFBytes(bytes.length);
	}
	,isLocal: function(id,type) {
		return true;
	}
	,__class__: lime.AssetLibrary
};
var DefaultAssetLibrary = function() {
	this.type = new haxe.ds.StringMap();
	this.path = new haxe.ds.StringMap();
	lime.AssetLibrary.call(this);
	var id;
	id = "xml/config.xml";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "xml/_example_config.xml";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
};
$hxClasses["DefaultAssetLibrary"] = DefaultAssetLibrary;
DefaultAssetLibrary.__name__ = ["DefaultAssetLibrary"];
DefaultAssetLibrary.__super__ = lime.AssetLibrary;
DefaultAssetLibrary.prototype = $extend(lime.AssetLibrary.prototype,{
	path: null
	,type: null
	,exists: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js.Boot.__cast(type , String); else requestedType = null;
		var assetType = this.type.get(id);
		if(assetType != null) {
			if(assetType == requestedType || (requestedType == "SOUND" || requestedType == "MUSIC") && (assetType == "MUSIC" || assetType == "SOUND")) return true;
			if(requestedType == "BINARY" || requestedType == null || assetType == "BINARY" && requestedType == "TEXT") return true;
		}
		return false;
	}
	,getBytes: function(id) {
		var bytes = null;
		var data = ((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime.app.Preloader.loaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") {
			bytes = new lime.utils.ByteArray();
			bytes.writeUTFBytes(data);
		} else if(js.Boot.__instanceof(data,lime.utils.ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes;
		} else return null;
	}
	,getText: function(id) {
		var bytes = null;
		var data = ((function($this) {
			var $r;
			var key = $this.path.get(id);
			$r = lime.app.Preloader.loaders.get(key);
			return $r;
		}(this))).data;
		if(typeof(data) == "string") return data; else if(js.Boot.__instanceof(data,lime.utils.ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes.readUTFBytes(bytes.length);
		} else return null;
	}
	,isLocal: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js.Boot.__cast(type , String); else requestedType = null;
		return true;
	}
	,__class__: DefaultAssetLibrary
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var NMEPreloader = function() {
	openfl.display.Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 9;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 3;
	this.outline = new openfl.display.Sprite();
	this.outline.get_graphics().lineStyle(1,color,0.15,true);
	this.outline.get_graphics().drawRoundRect(0,0,width,height,padding * 2,padding * 2);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new openfl.display.Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = openfl.display.Sprite;
NMEPreloader.prototype = $extend(openfl.display.Sprite.prototype,{
	outline: null
	,progress: null
	,getBackgroundColor: function() {
		return 0;
	}
	,getHeight: function() {
		var height = 0;
		if(height > 0) return height; else return openfl.Lib.current.stage.stageHeight;
	}
	,getWidth: function() {
		var width = 0;
		if(width > 0) return width; else return openfl.Lib.current.stage.stageWidth;
	}
	,onInit: function() {
	}
	,onLoaded: function() {
		this.dispatchEvent(new openfl.events.Event(openfl.events.Event.COMPLETE));
	}
	,onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded = 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,__class__: NMEPreloader
});
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
};
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return js.Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
};
var _UInt = {};
_UInt.UInt_Impl_ = function() { };
$hxClasses["_UInt.UInt_Impl_"] = _UInt.UInt_Impl_;
_UInt.UInt_Impl_.__name__ = ["_UInt","UInt_Impl_"];
var XmlType = $hxClasses["XmlType"] = { __ename__ : true, __constructs__ : [] };
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.ProcessingInstruction = null;
Xml.Document = null;
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
};
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new haxe.ds.StringMap();
	r.set_nodeName(name);
	return r;
};
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.set_nodeValue(data);
	return r;
};
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.set_nodeValue(data);
	return r;
};
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.set_nodeValue(data);
	return r;
};
Xml.createProcessingInstruction = function(data) {
	var r = new Xml();
	r.nodeType = Xml.ProcessingInstruction;
	r.set_nodeValue(data);
	return r;
};
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
};
Xml.prototype = {
	nodeType: null
	,_nodeName: null
	,_nodeValue: null
	,_attributes: null
	,_children: null
	,_parent: null
	,get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,set_nodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,elements: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				if(this.x[k].nodeType == Xml.Element) break;
				k += 1;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k1 = this.cur;
			var l1 = this.x.length;
			while(k1 < l1) {
				var n = this.x[k1];
				k1 += 1;
				if(n.nodeType == Xml.Element) {
					this.cur = k1;
					return n;
				}
			}
			return null;
		}};
	}
	,elementsNamed: function(name) {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				if(n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k1 = this.cur;
			var l1 = this.x.length;
			while(k1 < l1) {
				var n1 = this.x[k1];
				k1++;
				if(n1.nodeType == Xml.Element && n1._nodeName == name) {
					this.cur = k1;
					return n1;
				}
			}
			return null;
		}};
	}
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,__class__: Xml
	,__properties__: {set_nodeValue:"set_nodeValue",set_nodeName:"set_nodeName",get_nodeName:"get_nodeName"}
};
com.imagination.core = {};
com.imagination.core.model = {};
com.imagination.core.model.scene = {};
com.imagination.core.model.scene.SceneModel = function() { };
$hxClasses["com.imagination.core.model.scene.SceneModel"] = com.imagination.core.model.scene.SceneModel;
com.imagination.core.model.scene.SceneModel.__name__ = ["com","imagination","core","model","scene","SceneModel"];
var robotlegs = {};
robotlegs.bender = {};
robotlegs.bender.framework = {};
robotlegs.bender.framework.api = {};
robotlegs.bender.framework.api.IConfig = function() { };
$hxClasses["robotlegs.bender.framework.api.IConfig"] = robotlegs.bender.framework.api.IConfig;
robotlegs.bender.framework.api.IConfig.__name__ = ["robotlegs","bender","framework","api","IConfig"];
com.imagination.robotlegs.imagBasic.commands = {};
com.imagination.robotlegs.imagBasic.commands.CommandConfig = function() {
};
$hxClasses["com.imagination.robotlegs.imagBasic.commands.CommandConfig"] = com.imagination.robotlegs.imagBasic.commands.CommandConfig;
com.imagination.robotlegs.imagBasic.commands.CommandConfig.__name__ = ["com","imagination","robotlegs","imagBasic","commands","CommandConfig"];
com.imagination.robotlegs.imagBasic.commands.CommandConfig.__interfaces__ = [robotlegs.bender.framework.api.IConfig];
com.imagination.robotlegs.imagBasic.commands.CommandConfig.prototype = {
	commandMap: null
	,injector: null
	,configure: function() {
		this.commandMap.map(robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal).toCommand(com.imagination.robotlegs.imagBasic.commands.example.ExampleCommand);
	}
	,__class__: com.imagination.robotlegs.imagBasic.commands.CommandConfig
};
robotlegs.bender.extensions = {};
robotlegs.bender.extensions.commandCenter = {};
robotlegs.bender.extensions.commandCenter.api = {};
robotlegs.bender.extensions.commandCenter.api.ICommand = function() { };
$hxClasses["robotlegs.bender.extensions.commandCenter.api.ICommand"] = robotlegs.bender.extensions.commandCenter.api.ICommand;
robotlegs.bender.extensions.commandCenter.api.ICommand.__name__ = ["robotlegs","bender","extensions","commandCenter","api","ICommand"];
robotlegs.bender.bundles = {};
robotlegs.bender.bundles.mvcs = {};
robotlegs.bender.bundles.mvcs.Command = function() { };
$hxClasses["robotlegs.bender.bundles.mvcs.Command"] = robotlegs.bender.bundles.mvcs.Command;
robotlegs.bender.bundles.mvcs.Command.__name__ = ["robotlegs","bender","bundles","mvcs","Command"];
robotlegs.bender.bundles.mvcs.Command.__interfaces__ = [robotlegs.bender.extensions.commandCenter.api.ICommand];
robotlegs.bender.bundles.mvcs.Command.prototype = {
	execute: function() {
	}
	,__class__: robotlegs.bender.bundles.mvcs.Command
};
com.imagination.robotlegs.imagBasic.commands.example = {};
com.imagination.robotlegs.imagBasic.commands.example.ExampleCommand = function() {
};
$hxClasses["com.imagination.robotlegs.imagBasic.commands.example.ExampleCommand"] = com.imagination.robotlegs.imagBasic.commands.example.ExampleCommand;
com.imagination.robotlegs.imagBasic.commands.example.ExampleCommand.__name__ = ["com","imagination","robotlegs","imagBasic","commands","example","ExampleCommand"];
com.imagination.robotlegs.imagBasic.commands.example.ExampleCommand.__super__ = robotlegs.bender.bundles.mvcs.Command;
com.imagination.robotlegs.imagBasic.commands.example.ExampleCommand.prototype = $extend(robotlegs.bender.bundles.mvcs.Command.prototype,{
	execute: function() {
	}
	,__class__: com.imagination.robotlegs.imagBasic.commands.example.ExampleCommand
});
openfl.events.Event = function(type,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.type = type;
	this.bubbles = bubbles;
	this.cancelable = cancelable;
	this.eventPhase = openfl.events.EventPhase.CAPTURING_PHASE;
};
$hxClasses["openfl.events.Event"] = openfl.events.Event;
openfl.events.Event.__name__ = ["openfl","events","Event"];
openfl.events.Event.prototype = {
	bubbles: null
	,cancelable: null
	,currentTarget: null
	,eventPhase: null
	,target: null
	,type: null
	,__isCancelled: null
	,__isCancelledNow: null
	,stopImmediatePropagation: function() {
		this.__isCancelled = true;
		this.__isCancelledNow = true;
	}
	,__class__: openfl.events.Event
};
com.imagination.robotlegs.imagBasic.events = {};
com.imagination.robotlegs.imagBasic.events.AppEvent = function() { };
$hxClasses["com.imagination.robotlegs.imagBasic.events.AppEvent"] = com.imagination.robotlegs.imagBasic.events.AppEvent;
com.imagination.robotlegs.imagBasic.events.AppEvent.__name__ = ["com","imagination","robotlegs","imagBasic","events","AppEvent"];
com.imagination.robotlegs.imagBasic.events.AppEvent.__super__ = openfl.events.Event;
com.imagination.robotlegs.imagBasic.events.AppEvent.prototype = $extend(openfl.events.Event.prototype,{
	__class__: com.imagination.robotlegs.imagBasic.events.AppEvent
});
com.imagination.robotlegs.imagBasic.model = {};
com.imagination.robotlegs.imagBasic.model.ModelConfig = function() {
};
$hxClasses["com.imagination.robotlegs.imagBasic.model.ModelConfig"] = com.imagination.robotlegs.imagBasic.model.ModelConfig;
com.imagination.robotlegs.imagBasic.model.ModelConfig.__name__ = ["com","imagination","robotlegs","imagBasic","model","ModelConfig"];
com.imagination.robotlegs.imagBasic.model.ModelConfig.__interfaces__ = [robotlegs.bender.framework.api.IConfig];
com.imagination.robotlegs.imagBasic.model.ModelConfig.prototype = {
	injector: null
	,configModel: null
	,configure: function() {
		this.injector.map(com.imagination.robotlegs.imagBasic.model.example.ExampleModel).asSingleton();
		this.injector.map(com.imagination.core.model.scene.SceneModel).asSingleton();
	}
	,__class__: com.imagination.robotlegs.imagBasic.model.ModelConfig
};
robotlegs.bender.extensions.imag = {};
robotlegs.bender.extensions.imag.impl = {};
robotlegs.bender.extensions.imag.impl.model = {};
robotlegs.bender.extensions.imag.impl.model.config = {};
robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel = function() {
};
$hxClasses["robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel"] = robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel;
robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel.__name__ = ["robotlegs","bender","extensions","imag","impl","model","config","BaseConfigModel"];
robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel.prototype = {
	get_configURL: function() {
		return robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel._configURL;
	}
	,set_configURL: function(value) {
		robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel._configURL = value;
		return value;
	}
	,__class__: robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel
	,__properties__: {set_configURL:"set_configURL",get_configURL:"get_configURL"}
};
robotlegs.bender.extensions.imag.api = {};
robotlegs.bender.extensions.imag.api.model = {};
robotlegs.bender.extensions.imag.api.model.config = {};
robotlegs.bender.extensions.imag.api.model.config.IConfigModel = function() { };
$hxClasses["robotlegs.bender.extensions.imag.api.model.config.IConfigModel"] = robotlegs.bender.extensions.imag.api.model.config.IConfigModel;
robotlegs.bender.extensions.imag.api.model.config.IConfigModel.__name__ = ["robotlegs","bender","extensions","imag","api","model","config","IConfigModel"];
com.imagination.robotlegs.imagBasic.model.config = {};
com.imagination.robotlegs.imagBasic.model.config.ConfigModel = function() {
	robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel.call(this);
};
$hxClasses["com.imagination.robotlegs.imagBasic.model.config.ConfigModel"] = com.imagination.robotlegs.imagBasic.model.config.ConfigModel;
com.imagination.robotlegs.imagBasic.model.config.ConfigModel.__name__ = ["com","imagination","robotlegs","imagBasic","model","config","ConfigModel"];
com.imagination.robotlegs.imagBasic.model.config.ConfigModel.__interfaces__ = [robotlegs.bender.extensions.imag.api.model.config.IConfigModel];
com.imagination.robotlegs.imagBasic.model.config.ConfigModel.__super__ = robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel;
com.imagination.robotlegs.imagBasic.model.config.ConfigModel.prototype = $extend(robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel.prototype,{
	__class__: com.imagination.robotlegs.imagBasic.model.config.ConfigModel
});
com.imagination.robotlegs.imagBasic.model.example = {};
com.imagination.robotlegs.imagBasic.model.example.ExampleModel = function() {
	this.change = new msignal.Signal0();
};
$hxClasses["com.imagination.robotlegs.imagBasic.model.example.ExampleModel"] = com.imagination.robotlegs.imagBasic.model.example.ExampleModel;
com.imagination.robotlegs.imagBasic.model.example.ExampleModel.__name__ = ["com","imagination","robotlegs","imagBasic","model","example","ExampleModel"];
com.imagination.robotlegs.imagBasic.model.example.ExampleModel.prototype = {
	_value: null
	,change: null
	,get_value: function() {
		return this._value;
	}
	,set_value: function(value) {
		if(this._value == value) return value;
		this._value = value;
		this.change.dispatch();
		return value;
	}
	,__class__: com.imagination.robotlegs.imagBasic.model.example.ExampleModel
	,__properties__: {set_value:"set_value",get_value:"get_value"}
};
com.imagination.robotlegs.imagBasic.services = {};
com.imagination.robotlegs.imagBasic.services.ServiceConfig = function() {
};
$hxClasses["com.imagination.robotlegs.imagBasic.services.ServiceConfig"] = com.imagination.robotlegs.imagBasic.services.ServiceConfig;
com.imagination.robotlegs.imagBasic.services.ServiceConfig.__name__ = ["com","imagination","robotlegs","imagBasic","services","ServiceConfig"];
com.imagination.robotlegs.imagBasic.services.ServiceConfig.__interfaces__ = [robotlegs.bender.framework.api.IConfig];
com.imagination.robotlegs.imagBasic.services.ServiceConfig.prototype = {
	injector: null
	,configure: function() {
		this.injector.map(com.imagination.robotlegs.imagBasic.services.example.ExampleService).asSingleton();
	}
	,__class__: com.imagination.robotlegs.imagBasic.services.ServiceConfig
};
com.imagination.robotlegs.imagBasic.services.example = {};
com.imagination.robotlegs.imagBasic.services.example.ExampleService = function() {
};
$hxClasses["com.imagination.robotlegs.imagBasic.services.example.ExampleService"] = com.imagination.robotlegs.imagBasic.services.example.ExampleService;
com.imagination.robotlegs.imagBasic.services.example.ExampleService.__name__ = ["com","imagination","robotlegs","imagBasic","services","example","ExampleService"];
com.imagination.robotlegs.imagBasic.services.example.ExampleService.prototype = {
	__class__: com.imagination.robotlegs.imagBasic.services.example.ExampleService
};
com.imagination.robotlegs.imagBasic.view = {};
com.imagination.robotlegs.imagBasic.view.ViewConfig = function() {
};
$hxClasses["com.imagination.robotlegs.imagBasic.view.ViewConfig"] = com.imagination.robotlegs.imagBasic.view.ViewConfig;
com.imagination.robotlegs.imagBasic.view.ViewConfig.__name__ = ["com","imagination","robotlegs","imagBasic","view","ViewConfig"];
com.imagination.robotlegs.imagBasic.view.ViewConfig.__interfaces__ = [robotlegs.bender.framework.api.IConfig];
com.imagination.robotlegs.imagBasic.view.ViewConfig.prototype = {
	context: null
	,commandMap: null
	,mediatorMap: null
	,stack: null
	,renderer: null
	,contextView: null
	,configure: function() {
		this.context.afterInitializing($bind(this,this.init));
	}
	,init: function() {
		this.renderer.get_onReady().addOnce($bind(this,this.OnContext3DReady));
		this.renderer.init("baseline",0);
		this.renderer.start();
	}
	,OnContext3DReady: function() {
		this.mapMediators();
		this.initView();
		this.renderer.start();
	}
	,mapMediators: function() {
		this.mediatorMap.map(com.imagination.robotlegs.imagBasic.view.openfl.MainView).toMediator(com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator);
	}
	,initView: function() {
		this.contextView.view.addChild(new com.imagination.robotlegs.imagBasic.view.openfl.MainView());
	}
	,__class__: com.imagination.robotlegs.imagBasic.view.ViewConfig
};
com.imagination.robotlegs.imagBasic.view.openfl = {};
com.imagination.robotlegs.imagBasic.view.openfl.MainView = function() {
	openfl.display.Sprite.call(this);
	haxe.Log.trace("MainView",{ fileName : "MainView.hx", lineNumber : 19, className : "com.imagination.robotlegs.imagBasic.view.openfl.MainView", methodName : "new"});
};
$hxClasses["com.imagination.robotlegs.imagBasic.view.openfl.MainView"] = com.imagination.robotlegs.imagBasic.view.openfl.MainView;
com.imagination.robotlegs.imagBasic.view.openfl.MainView.__name__ = ["com","imagination","robotlegs","imagBasic","view","openfl","MainView"];
com.imagination.robotlegs.imagBasic.view.openfl.MainView.__super__ = openfl.display.Sprite;
com.imagination.robotlegs.imagBasic.view.openfl.MainView.prototype = $extend(openfl.display.Sprite.prototype,{
	initialize: function() {
		var subView = new com.imagination.robotlegs.imagBasic.view.openfl.display.SubView();
		this.addChild(subView);
	}
	,__class__: com.imagination.robotlegs.imagBasic.view.openfl.MainView
});
robotlegs.bender.extensions.mediatorMap = {};
robotlegs.bender.extensions.mediatorMap.api = {};
robotlegs.bender.extensions.mediatorMap.api.IMediator = function() { };
$hxClasses["robotlegs.bender.extensions.mediatorMap.api.IMediator"] = robotlegs.bender.extensions.mediatorMap.api.IMediator;
robotlegs.bender.extensions.mediatorMap.api.IMediator.__name__ = ["robotlegs","bender","extensions","mediatorMap","api","IMediator"];
robotlegs.bender.bundles.mvcs.Mediator = function() { };
$hxClasses["robotlegs.bender.bundles.mvcs.Mediator"] = robotlegs.bender.bundles.mvcs.Mediator;
robotlegs.bender.bundles.mvcs.Mediator.__name__ = ["robotlegs","bender","bundles","mvcs","Mediator"];
robotlegs.bender.bundles.mvcs.Mediator.__interfaces__ = [robotlegs.bender.extensions.mediatorMap.api.IMediator];
robotlegs.bender.bundles.mvcs.Mediator.prototype = {
	eventMap: null
	,eventDispatcher: null
	,_viewComponent: null
	,set_viewComponent: function(view) {
		this._viewComponent = view;
	}
	,initialize: function() {
	}
	,destroy: function() {
	}
	,postDestroy: function() {
		this.eventMap.unmapListeners();
	}
	,addViewListener: function(eventString,listener,eventClass) {
		this.eventMap.mapListener(js.Boot.__cast(this._viewComponent , openfl.events.IEventDispatcher),eventString,listener,eventClass);
	}
	,addContextListener: function(eventString,listener,eventClass) {
		this.eventMap.mapListener(this.eventDispatcher,eventString,listener,eventClass);
	}
	,removeViewListener: function(eventString,listener,eventClass) {
		this.eventMap.unmapListener(js.Boot.__cast(this._viewComponent , openfl.events.IEventDispatcher),eventString,listener,eventClass);
	}
	,removeContextListener: function(eventString,listener,eventClass) {
		this.eventMap.unmapListener(this.eventDispatcher,eventString,listener,eventClass);
	}
	,dispatch: function(event) {
		if(this.eventDispatcher.hasEventListener(event.type)) this.eventDispatcher.dispatchEvent(event);
	}
	,__class__: robotlegs.bender.bundles.mvcs.Mediator
};
com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator = function() {
};
$hxClasses["com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator"] = com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator;
com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator.__name__ = ["com","imagination","robotlegs","imagBasic","view","openfl","MainViewMediator"];
com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator.__super__ = robotlegs.bender.bundles.mvcs.Mediator;
com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator.prototype = $extend(robotlegs.bender.bundles.mvcs.Mediator.prototype,{
	view: null
	,exampleService: null
	,dispatcher: null
	,initialize: function() {
		this.view.initialize();
		haxe.Log.trace("MainViewMediator",{ fileName : "MainViewMediator.hx", lineNumber : 30, className : "com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator", methodName : "initialize"});
		this.dispatcher.dispatchEvent(new openfl.events.Event(com.imagination.robotlegs.imagBasic.events.AppEvent.INIT));
	}
	,__class__: com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator
});
com.imagination.robotlegs.imagBasic.view.openfl.display = {};
com.imagination.robotlegs.imagBasic.view.openfl.display.SubView = function() {
	openfl.display.Sprite.call(this);
};
$hxClasses["com.imagination.robotlegs.imagBasic.view.openfl.display.SubView"] = com.imagination.robotlegs.imagBasic.view.openfl.display.SubView;
com.imagination.robotlegs.imagBasic.view.openfl.display.SubView.__name__ = ["com","imagination","robotlegs","imagBasic","view","openfl","display","SubView"];
com.imagination.robotlegs.imagBasic.view.openfl.display.SubView.__super__ = openfl.display.Sprite;
com.imagination.robotlegs.imagBasic.view.openfl.display.SubView.prototype = $extend(openfl.display.Sprite.prototype,{
	initialize: function() {
	}
	,__class__: com.imagination.robotlegs.imagBasic.view.openfl.display.SubView
});
var haxe = {};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Timer = function() { };
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.ds = {};
haxe.ds.BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe.ds.BalancedTree;
haxe.ds.BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe.ds.BalancedTree.prototype = {
	root: null
	,set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe.ds.TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe.ds.TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe.ds.TreeNode(l.left,l.key,l.value,new haxe.ds.TreeNode(l.right,k,v,r)); else return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe.ds.TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe.ds.TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe.ds.TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe.ds.BalancedTree
};
haxe.ds.TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe.ds.TreeNode;
haxe.ds.TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe.ds.TreeNode.prototype = {
	left: null
	,right: null
	,key: null
	,value: null
	,_height: null
	,__class__: haxe.ds.TreeNode
};
haxe.ds.EnumValueMap = function() {
	haxe.ds.BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe.ds.EnumValueMap;
haxe.ds.EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe.ds.EnumValueMap.__interfaces__ = [IMap];
haxe.ds.EnumValueMap.__super__ = haxe.ds.BalancedTree;
haxe.ds.EnumValueMap.prototype = $extend(haxe.ds.BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe.ds.EnumValueMap
});
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,__class__: haxe.ds.StringMap
};
haxe.ds._Vector = {};
haxe.ds._Vector.Vector_Impl_ = function() { };
$hxClasses["haxe.ds._Vector.Vector_Impl_"] = haxe.ds._Vector.Vector_Impl_;
haxe.ds._Vector.Vector_Impl_.__name__ = ["haxe","ds","_Vector","Vector_Impl_"];
haxe.ds._Vector.Vector_Impl_.blit = function(src,srcPos,dest,destPos,len) {
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		dest[destPos + i] = src[srcPos + i];
	}
};
haxe.io = {};
haxe.io.Eof = function() { };
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
haxe.io.Path = function(path) {
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else this.dir = null;
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe.io.Path;
haxe.io.Path.__name__ = ["haxe","io","Path"];
haxe.io.Path.withoutExtension = function(path) {
	var s = new haxe.io.Path(path);
	s.ext = null;
	return s.toString();
};
haxe.io.Path.prototype = {
	dir: null
	,file: null
	,ext: null
	,backslash: null
	,toString: function() {
		return (this.dir == null?"":this.dir + (this.backslash?"\\":"/")) + this.file + (this.ext == null?"":"." + this.ext);
	}
	,__class__: haxe.io.Path
};
haxe.rtti = {};
haxe.rtti.Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe.rtti.Meta;
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getFields = function(t) {
	var meta = t.__meta__;
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
haxe.xml = {};
haxe.xml._Fast = {};
haxe.xml._Fast.NodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeAccess"] = haxe.xml._Fast.NodeAccess;
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype = {
	__x: null
	,resolve: function(name) {
		var x = this.__x.elementsNamed(name).next();
		if(x == null) {
			var xname;
			if(this.__x.nodeType == Xml.Document) xname = "Document"; else xname = this.__x.get_nodeName();
			throw xname + " is missing element " + name;
		}
		return new haxe.xml.Fast(x);
	}
	,__class__: haxe.xml._Fast.NodeAccess
};
haxe.xml._Fast.AttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.AttribAccess"] = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype = {
	__x: null
	,resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		var v = this.__x.get(name);
		if(v == null) throw this.__x.get_nodeName() + " is missing attribute " + name;
		return v;
	}
	,__class__: haxe.xml._Fast.AttribAccess
};
haxe.xml._Fast.HasAttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasAttribAccess"] = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype = {
	__x: null
	,resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		return this.__x.exists(name);
	}
	,__class__: haxe.xml._Fast.HasAttribAccess
};
haxe.xml._Fast.HasNodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasNodeAccess"] = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype = {
	__x: null
	,__class__: haxe.xml._Fast.HasNodeAccess
};
haxe.xml._Fast.NodeListAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeListAccess"] = haxe.xml._Fast.NodeListAccess;
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype = {
	__x: null
	,__class__: haxe.xml._Fast.NodeListAccess
};
haxe.xml.Fast = function(x) {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + Std.string(x.nodeType);
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
};
$hxClasses["haxe.xml.Fast"] = haxe.xml.Fast;
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype = {
	x: null
	,node: null
	,nodes: null
	,att: null
	,has: null
	,hasNode: null
	,get_name: function() {
		if(this.x.nodeType == Xml.Document) return "Document"; else return this.x.get_nodeName();
	}
	,get_elements: function() {
		var it = this.x.elements();
		return { hasNext : $bind(it,it.hasNext), next : function() {
			var x = it.next();
			if(x == null) return null;
			return new haxe.xml.Fast(x);
		}};
	}
	,__class__: haxe.xml.Fast
	,__properties__: {get_elements:"get_elements",get_name:"get_name"}
};
haxe.xml.Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe.xml.Parser;
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
};
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start));
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw "Expected </" + parent.get_nodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var i;
					if(s.charCodeAt(1) == 120) i = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else i = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.add(String.fromCharCode(i));
				} else if(!haxe.xml.Parser.escapes.exists(s)) buf.b += Std.string("&" + s + ";"); else buf.add(haxe.xml.Parser.escapes.get(s));
				start = p + 1;
				state = next;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js.Boot.__nativeClassName(o);
		if(name != null) return js.Boot.__resolveNativeClass(name);
		return null;
	}
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js.Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
js.Boot.__nativeClassName = function(o) {
	var name = js.Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js.Boot.__isNativeObj = function(o) {
	return js.Boot.__nativeClassName(o) != null;
};
js.Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
lime.AssetCache = function() {
	this.audio = new haxe.ds.StringMap();
	this.font = new haxe.ds.StringMap();
	this.image = new haxe.ds.StringMap();
};
$hxClasses["lime.AssetCache"] = lime.AssetCache;
lime.AssetCache.__name__ = ["lime","AssetCache"];
lime.AssetCache.prototype = {
	audio: null
	,image: null
	,font: null
	,clear: function(prefix) {
		if(prefix == null) {
			this.audio = new haxe.ds.StringMap();
			this.font = new haxe.ds.StringMap();
			this.image = new haxe.ds.StringMap();
		} else {
			var keys = this.audio.keys();
			while( keys.hasNext() ) {
				var key = keys.next();
				if(StringTools.startsWith(key,prefix)) this.audio.remove(key);
			}
			var keys1 = this.font.keys();
			while( keys1.hasNext() ) {
				var key1 = keys1.next();
				if(StringTools.startsWith(key1,prefix)) this.font.remove(key1);
			}
			var keys2 = this.image.keys();
			while( keys2.hasNext() ) {
				var key2 = keys2.next();
				if(StringTools.startsWith(key2,prefix)) this.image.remove(key2);
			}
		}
	}
	,__class__: lime.AssetCache
};
lime.Assets = function() { };
$hxClasses["lime.Assets"] = lime.Assets;
lime.Assets.__name__ = ["lime","Assets"];
lime.Assets.getLibrary = function(name) {
	if(name == null || name == "") name = "default";
	return lime.Assets.libraries.get(name);
};
lime.Assets.getText = function(id) {
	lime.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"TEXT")) {
			if(library.isLocal(symbolName,"TEXT")) return library.getText(symbolName); else haxe.Log.trace("[Assets] String asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 469, className : "lime.Assets", methodName : "getText"});
		} else haxe.Log.trace("[Assets] There is no String asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 475, className : "lime.Assets", methodName : "getText"});
	} else haxe.Log.trace("[Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 481, className : "lime.Assets", methodName : "getText"});
	return null;
};
lime.Assets.initialize = function() {
	if(!lime.Assets.initialized) {
		lime.Assets.registerLibrary("default",new DefaultAssetLibrary());
		lime.Assets.initialized = true;
	}
};
lime.Assets.registerLibrary = function(name,library) {
	if(lime.Assets.libraries.exists(name)) lime.Assets.unloadLibrary(name);
	if(library != null) library.eventCallback = lime.Assets.library_onEvent;
	lime.Assets.libraries.set(name,library);
};
lime.Assets.unloadLibrary = function(name) {
	lime.Assets.initialize();
	var library = lime.Assets.libraries.get(name);
	if(library != null) {
		lime.Assets.cache.clear(name + ":");
		library.eventCallback = null;
	}
	lime.Assets.libraries.remove(name);
};
lime.Assets.library_onEvent = function(library,type) {
	if(type == "change") lime.Assets.cache.clear();
};
lime._backend = {};
lime._backend.html5 = {};
lime._backend.html5.HTML5Application = function(parent) {
	this.parent = parent;
	lime.app.Application.__instance = parent;
	lime.audio.AudioManager.init();
};
$hxClasses["lime._backend.html5.HTML5Application"] = lime._backend.html5.HTML5Application;
lime._backend.html5.HTML5Application.__name__ = ["lime","_backend","html5","HTML5Application"];
lime._backend.html5.HTML5Application.handleUpdateEvent = function(__) {
	lime.app.Application.__instance.update(16);
	var listeners = lime.app.Application.onUpdate.listeners;
	var repeat = lime.app.Application.onUpdate.repeat;
	var length = listeners.length;
	var i = 0;
	while(i < length) {
		listeners[i](16);
		if(!repeat[i]) {
			lime.app.Application.onUpdate.remove(listeners[i]);
			length--;
		} else i++;
	}
	lime.graphics.Renderer.render();
	window.requestAnimationFrame(lime._backend.html5.HTML5Application.handleUpdateEvent);
};
lime._backend.html5.HTML5Application.prototype = {
	parent: null
	,convertKeyCode: function(keyCode) {
		if(keyCode >= 65 && keyCode <= 90) return keyCode + 32;
		switch(keyCode) {
		case 16:
			return 1073742049;
		case 17:
			return 1073742048;
		case 18:
			return 1073742050;
		case 20:
			return 1073741881;
		case 144:
			return 1073741907;
		case 37:
			return 1073741904;
		case 38:
			return 1073741906;
		case 39:
			return 1073741903;
		case 40:
			return 1073741905;
		case 45:
			return 1073741897;
		case 46:
			return 127;
		case 36:
			return 1073741898;
		case 35:
			return 1073741901;
		case 33:
			return 1073741899;
		case 34:
			return 1073741902;
		case 112:
			return 1073741882;
		case 113:
			return 1073741883;
		case 114:
			return 1073741884;
		case 115:
			return 1073741885;
		case 116:
			return 1073741886;
		case 117:
			return 1073741887;
		case 118:
			return 1073741888;
		case 119:
			return 1073741889;
		case 120:
			return 1073741890;
		case 121:
			return 1073741891;
		case 122:
			return 1073741892;
		case 123:
			return 1073741893;
		}
		return keyCode;
	}
	,create: function(config) {
		this.parent.config = config;
		window.addEventListener("keydown",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("keyup",$bind(this,this.handleKeyEvent),false);
		lime.ui.KeyEventManager.onKeyDown.add(($_=this.parent,$bind($_,$_.onKeyDown)));
		lime.ui.KeyEventManager.onKeyUp.add(($_=this.parent,$bind($_,$_.onKeyUp)));
		lime.ui.MouseEventManager.onMouseDown.add(($_=this.parent,$bind($_,$_.onMouseDown)));
		lime.ui.MouseEventManager.onMouseMove.add(($_=this.parent,$bind($_,$_.onMouseMove)));
		lime.ui.MouseEventManager.onMouseUp.add(($_=this.parent,$bind($_,$_.onMouseUp)));
		lime.ui.MouseEventManager.onMouseWheel.add(($_=this.parent,$bind($_,$_.onMouseWheel)));
		lime.ui.TouchEventManager.onTouchStart.add(($_=this.parent,$bind($_,$_.onTouchStart)));
		lime.ui.TouchEventManager.onTouchMove.add(($_=this.parent,$bind($_,$_.onTouchMove)));
		lime.ui.TouchEventManager.onTouchEnd.add(($_=this.parent,$bind($_,$_.onTouchEnd)));
		lime.graphics.Renderer.onRenderContextLost.add(($_=this.parent,$bind($_,$_.onRenderContextLost)));
		lime.graphics.Renderer.onRenderContextRestored.add(($_=this.parent,$bind($_,$_.onRenderContextRestored)));
		lime.ui.Window.onWindowActivate.add(($_=this.parent,$bind($_,$_.onWindowActivate)));
		lime.ui.Window.onWindowClose.add(($_=this.parent,$bind($_,$_.onWindowClose)));
		lime.ui.Window.onWindowDeactivate.add(($_=this.parent,$bind($_,$_.onWindowDeactivate)));
		lime.ui.Window.onWindowFocusIn.add(($_=this.parent,$bind($_,$_.onWindowFocusIn)));
		lime.ui.Window.onWindowFocusOut.add(($_=this.parent,$bind($_,$_.onWindowFocusOut)));
		lime.ui.Window.onWindowMove.add(($_=this.parent,$bind($_,$_.onWindowMove)));
		lime.ui.Window.onWindowResize.add(($_=this.parent,$bind($_,$_.onWindowResize)));
		var $window = new lime.ui.Window(config);
		var renderer = new lime.graphics.Renderer($window);
		$window.width = config.width;
		$window.height = config.height;
		$window.backend.element = config.element;
		this.parent.addWindow($window);
	}
	,exec: function() {
		
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
										   || window[vendors[x]+'CancelRequestAnimationFrame'];
			}
			
			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					  timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			
			window.requestAnimFrame = window.requestAnimationFrame;
		;
		lime._backend.html5.HTML5Application.handleUpdateEvent();
		return 0;
	}
	,handleKeyEvent: function(event) {
		var _g = event.keyCode;
		switch(_g) {
		case 32:case 37:case 38:case 39:case 40:
			event.preventDefault();
			break;
		}
		var keyCode = this.convertKeyCode(event.keyCode != null?event.keyCode:event.which);
		var modifier = 0;
		if(event.type == "keydown") {
			var listeners = lime.ui.KeyEventManager.onKeyDown.listeners;
			var repeat = lime.ui.KeyEventManager.onKeyDown.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i](keyCode,modifier);
				if(!repeat[i]) {
					lime.ui.KeyEventManager.onKeyDown.remove(listeners[i]);
					length--;
				} else i++;
			}
		} else {
			var listeners1 = lime.ui.KeyEventManager.onKeyUp.listeners;
			var repeat1 = lime.ui.KeyEventManager.onKeyUp.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1](keyCode,modifier);
				if(!repeat1[i1]) {
					lime.ui.KeyEventManager.onKeyUp.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
		}
	}
	,__class__: lime._backend.html5.HTML5Application
};
lime._backend.html5.HTML5Mouse = function() { };
$hxClasses["lime._backend.html5.HTML5Mouse"] = lime._backend.html5.HTML5Mouse;
lime._backend.html5.HTML5Mouse.__name__ = ["lime","_backend","html5","HTML5Mouse"];
lime._backend.html5.HTML5Mouse.__cursor = null;
lime._backend.html5.HTML5Mouse.__hidden = null;
lime._backend.html5.HTML5Mouse.set_cursor = function(value) {
	if(lime._backend.html5.HTML5Mouse.__cursor != value) {
		if(!lime._backend.html5.HTML5Mouse.__hidden) {
			var _g = 0;
			var _g1 = lime.app.Application.__instance.windows;
			while(_g < _g1.length) {
				var $window = _g1[_g];
				++_g;
				switch(value[1]) {
				case 0:
					$window.backend.element.style.cursor = "default";
					break;
				case 1:
					$window.backend.element.style.cursor = "crosshair";
					break;
				case 3:
					$window.backend.element.style.cursor = "move";
					break;
				case 4:
					$window.backend.element.style.cursor = "pointer";
					break;
				case 5:
					$window.backend.element.style.cursor = "nesw-resize";
					break;
				case 6:
					$window.backend.element.style.cursor = "ns-resize";
					break;
				case 7:
					$window.backend.element.style.cursor = "nwse-resize";
					break;
				case 8:
					$window.backend.element.style.cursor = "ew-resize";
					break;
				case 9:
					$window.backend.element.style.cursor = "text";
					break;
				case 10:
					$window.backend.element.style.cursor = "wait";
					break;
				case 11:
					$window.backend.element.style.cursor = "wait";
					break;
				default:
					$window.backend.element.style.cursor = "auto";
				}
			}
		}
		lime._backend.html5.HTML5Mouse.__cursor = value;
	}
	return lime._backend.html5.HTML5Mouse.__cursor;
};
lime._backend.html5.HTML5Renderer = function(parent) {
	this.parent = parent;
};
$hxClasses["lime._backend.html5.HTML5Renderer"] = lime._backend.html5.HTML5Renderer;
lime._backend.html5.HTML5Renderer.__name__ = ["lime","_backend","html5","HTML5Renderer"];
lime._backend.html5.HTML5Renderer.render = function() {
	var _g = 0;
	var _g1 = lime.app.Application.__instance.windows;
	while(_g < _g1.length) {
		var $window = _g1[_g];
		++_g;
		if($window.currentRenderer != null) $window.currentRenderer.backend.renderEvent();
	}
};
lime._backend.html5.HTML5Renderer.prototype = {
	parent: null
	,create: function() {
		this.createContext();
		{
			var _g = this.parent.context;
			switch(_g[1]) {
			case 0:
				this.parent.window.backend.canvas.addEventListener("webglcontextlost",$bind(this,this.handleEvent),false);
				this.parent.window.backend.canvas.addEventListener("webglcontextrestored",$bind(this,this.handleEvent),false);
				break;
			default:
			}
		}
	}
	,createContext: function() {
		if(this.parent.window.backend.div != null) this.parent.context = lime.graphics.RenderContext.DOM(this.parent.window.backend.div); else if(this.parent.window.backend.canvas != null) {
			var webgl = null;
			if(webgl == null) this.parent.context = lime.graphics.RenderContext.CANVAS(this.parent.window.backend.canvas.getContext("2d")); else {
				lime.graphics.opengl.GL.context = webgl;
				this.parent.context = lime.graphics.RenderContext.OPENGL(lime.graphics.opengl.GL.context);
			}
		}
	}
	,flip: function() {
	}
	,handleEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "webglcontextlost":
			event.preventDefault();
			this.parent.context = null;
			var listeners = lime.graphics.Renderer.onRenderContextLost.listeners;
			var repeat = lime.graphics.Renderer.onRenderContextLost.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i]();
				if(!repeat[i]) {
					lime.graphics.Renderer.onRenderContextLost.remove(listeners[i]);
					length--;
				} else i++;
			}
			break;
		case "webglcontextrestored":
			this.createContext();
			var listeners1 = lime.graphics.Renderer.onRenderContextRestored.listeners;
			var repeat1 = lime.graphics.Renderer.onRenderContextRestored.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1](this.parent.context);
				if(!repeat1[i1]) {
					lime.graphics.Renderer.onRenderContextRestored.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			break;
		default:
		}
	}
	,renderEvent: function() {
		if(!lime.app.Application.__initialized) {
			lime.app.Application.__initialized = true;
			lime.app.Application.__instance.init(this.parent.context);
		}
		lime.app.Application.__instance.render(this.parent.context);
		var listeners = lime.graphics.Renderer.onRender.listeners;
		var repeat = lime.graphics.Renderer.onRender.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](this.parent.context);
			if(!repeat[i]) {
				lime.graphics.Renderer.onRender.remove(listeners[i]);
				length--;
			} else i++;
		}
		this.flip();
	}
	,__class__: lime._backend.html5.HTML5Renderer
};
lime._backend.html5.HTML5Window = function(parent) {
	this.parent = parent;
};
$hxClasses["lime._backend.html5.HTML5Window"] = lime._backend.html5.HTML5Window;
lime._backend.html5.HTML5Window.__name__ = ["lime","_backend","html5","HTML5Window"];
lime._backend.html5.HTML5Window.prototype = {
	canvas: null
	,div: null
	,element: null
	,parent: null
	,setHeight: null
	,setWidth: null
	,create: function(application) {
		this.setWidth = this.parent.width;
		this.setHeight = this.parent.height;
		if(js.Boot.__instanceof(this.element,HTMLCanvasElement)) this.canvas = this.element; else this.div = window.document.createElement("div");
		if(this.canvas != null) {
			var style = this.canvas.style;
			style.setProperty("-webkit-transform","translateZ(0)",null);
			style.setProperty("transform","translateZ(0)",null);
		} else if(this.div != null) {
			var style1 = this.div.style;
			style1.setProperty("-webkit-transform","translate3D(0,0,0)",null);
			style1.setProperty("transform","translate3D(0,0,0)",null);
			style1.position = "relative";
			style1.overflow = "hidden";
			style1.setProperty("-webkit-user-select","none",null);
			style1.setProperty("-moz-user-select","none",null);
			style1.setProperty("-ms-user-select","none",null);
			style1.setProperty("-o-user-select","none",null);
		}
		if(this.parent.width == 0 && this.parent.height == 0) {
			if(this.element != null) {
				this.parent.width = this.element.clientWidth;
				this.parent.height = this.element.clientHeight;
			} else {
				this.parent.width = window.innerWidth;
				this.parent.height = window.innerHeight;
			}
			this.parent.fullscreen = true;
		}
		if(this.canvas != null) {
			this.canvas.width = this.parent.width;
			this.canvas.height = this.parent.height;
		} else {
			this.div.style.width = this.parent.width + "px";
			this.div.style.height = this.parent.height + "px";
		}
		this.handleResize();
		if(this.element != null) {
			if(this.canvas != null) {
				if(this.element != this.canvas) this.element.appendChild(this.canvas);
			} else this.element.appendChild(this.div);
			var events = ["mousedown","mousemove","mouseup","wheel"];
			var _g = 0;
			while(_g < events.length) {
				var event = events[_g];
				++_g;
				this.element.addEventListener(event,$bind(this,this.handleMouseEvent),true);
			}
			window.document.addEventListener("dragstart",function(e) {
				if(e.target.nodeName.toLowerCase() == "img") {
					e.preventDefault();
					return false;
				}
				return true;
			},false);
			this.element.addEventListener("touchstart",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchmove",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchend",$bind(this,this.handleTouchEvent),true);
		}
		window.addEventListener("focus",$bind(this,this.handleEvent),false);
		window.addEventListener("blur",$bind(this,this.handleEvent),false);
		window.addEventListener("resize",$bind(this,this.handleEvent),false);
		window.addEventListener("beforeunload",$bind(this,this.handleEvent),false);
	}
	,handleEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "focus":
			var listeners = lime.ui.Window.onWindowFocusIn.listeners;
			var repeat = lime.ui.Window.onWindowFocusIn.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i]();
				if(!repeat[i]) {
					lime.ui.Window.onWindowFocusIn.remove(listeners[i]);
					length--;
				} else i++;
			}
			var listeners1 = lime.ui.Window.onWindowActivate.listeners;
			var repeat1 = lime.ui.Window.onWindowActivate.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1]();
				if(!repeat1[i1]) {
					lime.ui.Window.onWindowActivate.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			break;
		case "blur":
			var listeners2 = lime.ui.Window.onWindowFocusOut.listeners;
			var repeat2 = lime.ui.Window.onWindowFocusOut.repeat;
			var length2 = listeners2.length;
			var i2 = 0;
			while(i2 < length2) {
				listeners2[i2]();
				if(!repeat2[i2]) {
					lime.ui.Window.onWindowFocusOut.remove(listeners2[i2]);
					length2--;
				} else i2++;
			}
			var listeners3 = lime.ui.Window.onWindowDeactivate.listeners;
			var repeat3 = lime.ui.Window.onWindowDeactivate.repeat;
			var length3 = listeners3.length;
			var i3 = 0;
			while(i3 < length3) {
				listeners3[i3]();
				if(!repeat3[i3]) {
					lime.ui.Window.onWindowDeactivate.remove(listeners3[i3]);
					length3--;
				} else i3++;
			}
			break;
		case "resize":
			var cacheWidth = this.parent.width;
			var cacheHeight = this.parent.height;
			this.handleResize();
			if(this.parent.width != cacheWidth || this.parent.height != cacheHeight) {
				var listeners4 = lime.ui.Window.onWindowResize.listeners;
				var repeat4 = lime.ui.Window.onWindowResize.repeat;
				var length4 = listeners4.length;
				var i4 = 0;
				while(i4 < length4) {
					listeners4[i4](this.parent.width,this.parent.height);
					if(!repeat4[i4]) {
						lime.ui.Window.onWindowResize.remove(listeners4[i4]);
						length4--;
					} else i4++;
				}
			}
			break;
		case "beforeunload":
			var listeners5 = lime.ui.Window.onWindowClose.listeners;
			var repeat5 = lime.ui.Window.onWindowClose.repeat;
			var length5 = listeners5.length;
			var i5 = 0;
			while(i5 < length5) {
				listeners5[i5]();
				if(!repeat5[i5]) {
					lime.ui.Window.onWindowClose.remove(listeners5[i5]);
					length5--;
				} else i5++;
			}
			break;
		}
	}
	,handleMouseEvent: function(event) {
		var x = 0.0;
		var y = 0.0;
		if(event.type != "wheel") {
			if(this.element != null) {
				if(this.canvas != null) {
					var rect = this.canvas.getBoundingClientRect();
					x = (event.clientX - rect.left) * (this.parent.width / rect.width);
					y = (event.clientY - rect.top) * (this.parent.height / rect.height);
				} else if(this.div != null) {
					var rect1 = this.div.getBoundingClientRect();
					x = event.clientX - rect1.left;
					y = event.clientY - rect1.top;
				} else {
					var rect2 = this.element.getBoundingClientRect();
					x = (event.clientX - rect2.left) * (this.parent.width / rect2.width);
					y = (event.clientY - rect2.top) * (this.parent.height / rect2.height);
				}
			} else {
				x = event.clientX;
				y = event.clientY;
			}
			var _g = event.type;
			switch(_g) {
			case "mousedown":
				var listeners = lime.ui.MouseEventManager.onMouseDown.listeners;
				var repeat = lime.ui.MouseEventManager.onMouseDown.repeat;
				var length = listeners.length;
				var i = 0;
				while(i < length) {
					listeners[i](x,y,event.button);
					if(!repeat[i]) {
						lime.ui.MouseEventManager.onMouseDown.remove(listeners[i]);
						length--;
					} else i++;
				}
				break;
			case "mouseup":
				var listeners1 = lime.ui.MouseEventManager.onMouseUp.listeners;
				var repeat1 = lime.ui.MouseEventManager.onMouseUp.repeat;
				var length1 = listeners1.length;
				var i1 = 0;
				while(i1 < length1) {
					listeners1[i1](x,y,event.button);
					if(!repeat1[i1]) {
						lime.ui.MouseEventManager.onMouseUp.remove(listeners1[i1]);
						length1--;
					} else i1++;
				}
				break;
			case "mousemove":
				var listeners2 = lime.ui.MouseEventManager.onMouseMove.listeners;
				var repeat2 = lime.ui.MouseEventManager.onMouseMove.repeat;
				var length2 = listeners2.length;
				var i2 = 0;
				while(i2 < length2) {
					listeners2[i2](x,y,event.button);
					if(!repeat2[i2]) {
						lime.ui.MouseEventManager.onMouseMove.remove(listeners2[i2]);
						length2--;
					} else i2++;
				}
				break;
			default:
			}
		} else {
			var listeners3 = lime.ui.MouseEventManager.onMouseWheel.listeners;
			var repeat3 = lime.ui.MouseEventManager.onMouseWheel.repeat;
			var length3 = listeners3.length;
			var i3 = 0;
			while(i3 < length3) {
				listeners3[i3](event.deltaX,event.deltaY);
				if(!repeat3[i3]) {
					lime.ui.MouseEventManager.onMouseWheel.remove(listeners3[i3]);
					length3--;
				} else i3++;
			}
		}
	}
	,handleResize: function() {
		var stretch = this.parent.fullscreen || this.setWidth == 0 && this.setHeight == 0;
		if(this.element != null && (this.div == null || this.div != null && stretch)) {
			if(stretch) {
				if(this.parent.width != this.element.clientWidth || this.parent.height != this.element.clientHeight) {
					this.parent.width = this.element.clientWidth;
					this.parent.height = this.element.clientHeight;
					if(this.canvas != null) {
						if(this.element != this.canvas) {
							this.canvas.width = this.element.clientWidth;
							this.canvas.height = this.element.clientHeight;
						}
					} else {
						this.div.style.width = this.element.clientWidth + "px";
						this.div.style.height = this.element.clientHeight + "px";
					}
				}
			} else {
				var scaleX = this.element.clientWidth / this.setWidth;
				var scaleY = this.element.clientHeight / this.setHeight;
				var currentRatio = scaleX / scaleY;
				var targetRatio = Math.min(scaleX,scaleY);
				if(this.canvas != null) {
					if(this.element != this.canvas) {
						this.canvas.style.width = this.setWidth * targetRatio + "px";
						this.canvas.style.height = this.setHeight * targetRatio + "px";
						this.canvas.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
						this.canvas.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
					}
				} else {
					this.div.style.width = this.setWidth * targetRatio + "px";
					this.div.style.height = this.setHeight * targetRatio + "px";
					this.div.style.marginLeft = (this.element.clientWidth - this.setWidth * targetRatio) / 2 + "px";
					this.div.style.marginTop = (this.element.clientHeight - this.setHeight * targetRatio) / 2 + "px";
				}
			}
		}
	}
	,handleTouchEvent: function(event) {
		event.preventDefault();
		var touch = event.changedTouches[0];
		var id = touch.identifier;
		var x = 0.0;
		var y = 0.0;
		if(this.element != null) {
			if(this.canvas != null) {
				var rect = this.canvas.getBoundingClientRect();
				x = (touch.clientX - rect.left) * (this.parent.width / rect.width);
				y = (touch.clientY - rect.top) * (this.parent.height / rect.height);
			} else if(this.div != null) {
				var rect1 = this.div.getBoundingClientRect();
				x = touch.clientX - rect1.left;
				y = touch.clientY - rect1.top;
			} else {
				var rect2 = this.element.getBoundingClientRect();
				x = (touch.clientX - rect2.left) * (this.parent.width / rect2.width);
				y = (touch.clientY - rect2.top) * (this.parent.height / rect2.height);
			}
		} else {
			x = touch.clientX;
			y = touch.clientY;
		}
		var _g = event.type;
		switch(_g) {
		case "touchstart":
			var listeners = lime.ui.TouchEventManager.onTouchStart.listeners;
			var repeat = lime.ui.TouchEventManager.onTouchStart.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i](x,y,id);
				if(!repeat[i]) {
					lime.ui.TouchEventManager.onTouchStart.remove(listeners[i]);
					length--;
				} else i++;
			}
			break;
		case "touchmove":
			var listeners1 = lime.ui.TouchEventManager.onTouchMove.listeners;
			var repeat1 = lime.ui.TouchEventManager.onTouchMove.repeat;
			var length1 = listeners1.length;
			var i1 = 0;
			while(i1 < length1) {
				listeners1[i1](x,y,id);
				if(!repeat1[i1]) {
					lime.ui.TouchEventManager.onTouchMove.remove(listeners1[i1]);
					length1--;
				} else i1++;
			}
			break;
		case "touchend":
			var listeners2 = lime.ui.TouchEventManager.onTouchEnd.listeners;
			var repeat2 = lime.ui.TouchEventManager.onTouchEnd.repeat;
			var length2 = listeners2.length;
			var i2 = 0;
			while(i2 < length2) {
				listeners2[i2](x,y,id);
				if(!repeat2[i2]) {
					lime.ui.TouchEventManager.onTouchEnd.remove(listeners2[i2]);
					length2--;
				} else i2++;
			}
			break;
		default:
		}
	}
	,__class__: lime._backend.html5.HTML5Window
};
lime.app = {};
lime.app.Module = function() {
};
$hxClasses["lime.app.Module"] = lime.app.Module;
lime.app.Module.__name__ = ["lime","app","Module"];
lime.app.Module.prototype = {
	__class__: lime.app.Module
};
lime.app.Event = function() {
	this.listeners = new Array();
	this.priorities = new Array();
	this.repeat = new Array();
};
$hxClasses["lime.app.Event"] = lime.app.Event;
lime.app.Event.__name__ = ["lime","app","Event"];
lime.app.Event.prototype = {
	listeners: null
	,repeat: null
	,priorities: null
	,add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.priorities[i]) {
				this.listeners.splice(i,0,listener);
				this.priorities.splice(i,0,priority);
				this.repeat.splice(i,0,!once);
				return;
			}
		}
		this.listeners.push(listener);
		this.priorities.push(priority);
		this.repeat.push(!once);
	}
	,remove: function(listener) {
		var index = HxOverrides.indexOf(this.listeners,listener,0);
		if(index > -1) {
			this.listeners.splice(index,1);
			this.priorities.splice(index,1);
			this.repeat.splice(index,1);
		}
	}
	,__class__: lime.app.Event
};
lime.app.Application = function() {
	lime.app.Module.call(this);
	this.windows = new Array();
	this.backend = new lime._backend.html5.HTML5Application(this);
};
$hxClasses["lime.app.Application"] = lime.app.Application;
lime.app.Application.__name__ = ["lime","app","Application"];
lime.app.Application.__initialized = null;
lime.app.Application.__instance = null;
lime.app.Application.__super__ = lime.app.Module;
lime.app.Application.prototype = $extend(lime.app.Module.prototype,{
	config: null
	,windows: null
	,backend: null
	,addWindow: function(window) {
		this.windows.push(window);
		window.create(this);
	}
	,create: function(config) {
		this.backend.create(config);
	}
	,exec: function() {
		return this.backend.exec();
	}
	,init: function(context) {
	}
	,onKeyDown: function(keyCode,modifier) {
	}
	,onKeyUp: function(keyCode,modifier) {
	}
	,onMouseDown: function(x,y,button) {
	}
	,onMouseMove: function(x,y,button) {
	}
	,onMouseUp: function(x,y,button) {
	}
	,onMouseWheel: function(deltaX,deltaY) {
	}
	,onRenderContextLost: function() {
	}
	,onRenderContextRestored: function(context) {
	}
	,onTouchEnd: function(x,y,id) {
	}
	,onTouchMove: function(x,y,id) {
	}
	,onTouchStart: function(x,y,id) {
	}
	,onWindowActivate: function() {
	}
	,onWindowClose: function() {
	}
	,onWindowDeactivate: function() {
	}
	,onWindowFocusIn: function() {
	}
	,onWindowFocusOut: function() {
	}
	,onWindowMove: function(x,y) {
	}
	,onWindowResize: function(width,height) {
	}
	,render: function(context) {
	}
	,update: function(deltaTime) {
	}
	,__class__: lime.app.Application
});
lime.app.Preloader = function() {
	this.total = 0;
	this.loaded = 0;
};
$hxClasses["lime.app.Preloader"] = lime.app.Preloader;
lime.app.Preloader.__name__ = ["lime","app","Preloader"];
lime.app.Preloader.prototype = {
	onComplete: null
	,loaded: null
	,total: null
	,create: function(config) {
	}
	,load: function(urls,types) {
		var url = null;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "IMAGE":
				var image = new Image();
				lime.app.Preloader.images.set(url,image);
				image.onload = $bind(this,this.image_onLoad);
				image.src = url;
				this.total++;
				break;
			case "BINARY":
				var loader = new lime.net.URLLoader();
				loader.set_dataFormat(lime.net.URLLoaderDataFormat.BINARY);
				lime.app.Preloader.loaders.set(url,loader);
				this.total++;
				break;
			case "TEXT":
				var loader1 = new lime.net.URLLoader();
				lime.app.Preloader.loaders.set(url,loader1);
				this.total++;
				break;
			case "FONT":
				this.total++;
				this.loadFont(url);
				break;
			default:
			}
		}
		var $it0 = lime.app.Preloader.loaders.keys();
		while( $it0.hasNext() ) {
			var url1 = $it0.next();
			var loader2 = lime.app.Preloader.loaders.get(url1);
			loader2.onComplete.add($bind(this,this.loader_onComplete));
			loader2.load(new lime.net.URLRequest(url1));
		}
		if(this.total == 0) this.start();
	}
	,loadFont: function(font) {
		var _g = this;
		var node = window.document.createElement("span");
		node.innerHTML = "giItT1WQy@!-/#";
		var style = node.style;
		style.position = "absolute";
		style.left = "-10000px";
		style.top = "-10000px";
		style.fontSize = "300px";
		style.fontFamily = "sans-serif";
		style.fontVariant = "normal";
		style.fontStyle = "normal";
		style.fontWeight = "normal";
		style.letterSpacing = "0";
		window.document.body.appendChild(node);
		var width = node.offsetWidth;
		style.fontFamily = "'" + font + "', sans-serif";
		var interval = null;
		var found = false;
		var checkFont = function() {
			if(node.offsetWidth != width) {
				if(!found) {
					found = true;
					return false;
				}
				_g.loaded++;
				if(interval != null) window.clearInterval(interval);
				node.parentNode.removeChild(node);
				node = null;
				_g.update(_g.loaded,_g.total);
				if(_g.loaded == _g.total) _g.start();
				return true;
			}
			return false;
		};
		if(!checkFont()) interval = window.setInterval(checkFont,50);
	}
	,start: function() {
		if(this.onComplete != null) this.onComplete();
	}
	,update: function(loaded,total) {
	}
	,image_onLoad: function(_) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,loader_onComplete: function(loader) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: lime.app.Preloader
};
lime.audio = {};
lime.audio.ALAudioContext = function() { };
$hxClasses["lime.audio.ALAudioContext"] = lime.audio.ALAudioContext;
lime.audio.ALAudioContext.__name__ = ["lime","audio","ALAudioContext"];
lime.audio.ALCAudioContext = function() { };
$hxClasses["lime.audio.ALCAudioContext"] = lime.audio.ALCAudioContext;
lime.audio.ALCAudioContext.__name__ = ["lime","audio","ALCAudioContext"];
lime.audio.AudioBuffer = function() { };
$hxClasses["lime.audio.AudioBuffer"] = lime.audio.AudioBuffer;
lime.audio.AudioBuffer.__name__ = ["lime","audio","AudioBuffer"];
lime.audio.AudioContext = $hxClasses["lime.audio.AudioContext"] = { __ename__ : true, __constructs__ : ["OPENAL","HTML5","WEB","FLASH","CUSTOM"] };
lime.audio.AudioContext.OPENAL = function(alc,al) { var $x = ["OPENAL",0,alc,al]; $x.__enum__ = lime.audio.AudioContext; $x.toString = $estr; return $x; };
lime.audio.AudioContext.HTML5 = function(context) { var $x = ["HTML5",1,context]; $x.__enum__ = lime.audio.AudioContext; $x.toString = $estr; return $x; };
lime.audio.AudioContext.WEB = function(context) { var $x = ["WEB",2,context]; $x.__enum__ = lime.audio.AudioContext; $x.toString = $estr; return $x; };
lime.audio.AudioContext.FLASH = function(context) { var $x = ["FLASH",3,context]; $x.__enum__ = lime.audio.AudioContext; $x.toString = $estr; return $x; };
lime.audio.AudioContext.CUSTOM = function(data) { var $x = ["CUSTOM",4,data]; $x.__enum__ = lime.audio.AudioContext; $x.toString = $estr; return $x; };
lime.audio.AudioManager = function() { };
$hxClasses["lime.audio.AudioManager"] = lime.audio.AudioManager;
lime.audio.AudioManager.__name__ = ["lime","audio","AudioManager"];
lime.audio.AudioManager.context = null;
lime.audio.AudioManager.init = function(context) {
	if(lime.audio.AudioManager.context == null) {
		if(context == null) try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;;
			lime.audio.AudioManager.context = lime.audio.AudioContext.WEB(new AudioContext ());
		} catch( e ) {
			lime.audio.AudioManager.context = lime.audio.AudioContext.HTML5(new lime.audio.HTML5AudioContext());
		} else lime.audio.AudioManager.context = context;
	}
};
lime.audio.FlashAudioContext = function() { };
$hxClasses["lime.audio.FlashAudioContext"] = lime.audio.FlashAudioContext;
lime.audio.FlashAudioContext.__name__ = ["lime","audio","FlashAudioContext"];
lime.audio.HTML5AudioContext = function() {
};
$hxClasses["lime.audio.HTML5AudioContext"] = lime.audio.HTML5AudioContext;
lime.audio.HTML5AudioContext.__name__ = ["lime","audio","HTML5AudioContext"];
lime.audio.HTML5AudioContext.prototype = {
	__class__: lime.audio.HTML5AudioContext
};
lime.graphics = {};
lime.graphics.ConsoleRenderContext = function() { };
$hxClasses["lime.graphics.ConsoleRenderContext"] = lime.graphics.ConsoleRenderContext;
lime.graphics.ConsoleRenderContext.__name__ = ["lime","graphics","ConsoleRenderContext"];
lime.graphics.FlashRenderContext = function() { };
$hxClasses["lime.graphics.FlashRenderContext"] = lime.graphics.FlashRenderContext;
lime.graphics.FlashRenderContext.__name__ = ["lime","graphics","FlashRenderContext"];
lime.graphics.Image = function(buffer,offsetX,offsetY,width,height,color,type) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(offsetY == null) offsetY = 0;
	if(offsetX == null) offsetX = 0;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.width = width;
	this.height = height;
	if(type == null) {
		if(lime.app.Application.__instance != null && lime.app.Application.__instance.windows[0] != null && lime.app.Application.__instance.windows[0].currentRenderer != null) {
			var _g = lime.app.Application.__instance.windows[0].currentRenderer.context;
			switch(_g[1]) {
			case 2:case 1:
				this.type = lime.graphics.ImageType.CANVAS;
				break;
			case 3:
				this.type = lime.graphics.ImageType.FLASH;
				break;
			default:
				this.type = lime.graphics.ImageType.DATA;
			}
		} else this.type = lime.graphics.ImageType.DATA;
	} else this.type = type;
	if(buffer == null) {
		if(width > 0 && height > 0) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 0:
				this.buffer = new lime.graphics.ImageBuffer(null,width,height);
				lime.graphics.utils.ImageCanvasUtil.createCanvas(this,width,height);
				if(color != null) this.fillRect(new lime.math.Rectangle(0,0,width,height),color);
				break;
			case 1:
				this.buffer = new lime.graphics.ImageBuffer(new Uint8Array(width * height * 4),width,height);
				if(color != null) this.fillRect(new lime.math.Rectangle(0,0,width,height),color);
				break;
			case 2:
				break;
			default:
			}
		}
	} else this.__fromImageBuffer(buffer);
};
$hxClasses["lime.graphics.Image"] = lime.graphics.Image;
lime.graphics.Image.__name__ = ["lime","graphics","Image"];
lime.graphics.Image.prototype = {
	buffer: null
	,dirty: null
	,height: null
	,offsetX: null
	,offsetY: null
	,type: null
	,width: null
	,clone: function() {
		lime.graphics.utils.ImageCanvasUtil.sync(this);
		var image = new lime.graphics.Image(this.buffer.clone(),this.offsetX,this.offsetY,this.width,this.height,null,this.type);
		return image;
	}
	,fillRect: function(rect,color) {
		rect = this.__clipRect(rect);
		if(this.buffer == null || rect == null) return;
		var _g = this.type;
		switch(_g[1]) {
		case 0:
			lime.graphics.utils.ImageCanvasUtil.fillRect(this,rect,color);
			break;
		case 1:
			lime.graphics.utils.ImageCanvasUtil.convertToData(this);
			lime.graphics.utils.ImageDataUtil.fillRect(this,rect,color);
			break;
		case 2:
			rect.offset(this.offsetX,this.offsetY);
			this.buffer.__srcBitmapData.fillRect(rect.__toFlashRectangle(),color);
			break;
		default:
		}
	}
	,__clipRect: function(r) {
		if(r == null) return null;
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= this.width) {
			r.width -= r.x + r.width - this.width;
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= this.height) {
			r.height -= r.y + r.height - this.height;
			if(r.height <= 0) return null;
		}
		return r;
	}
	,__fromImageBuffer: function(buffer) {
		this.buffer = buffer;
		if(buffer != null) {
			if(this.width == 0) this.width = buffer.width;
			if(this.height == 0) this.height = buffer.height;
		}
	}
	,get_data: function() {
		if(this.buffer.data == null && this.buffer.width > 0 && this.buffer.height > 0) {
			lime.graphics.utils.ImageCanvasUtil.convertToCanvas(this);
			lime.graphics.utils.ImageCanvasUtil.createImageData(this);
		}
		return this.buffer.data;
	}
	,get_powerOfTwo: function() {
		return this.buffer.width != 0 && (this.buffer.width & ~this.buffer.width + 1) == this.buffer.width && (this.buffer.height != 0 && (this.buffer.height & ~this.buffer.height + 1) == this.buffer.height);
	}
	,set_premultiplied: function(value) {
		if(value && !this.buffer.premultiplied) {
			var _g = this.type;
			switch(_g[1]) {
			case 1:
				lime.graphics.utils.ImageCanvasUtil.convertToData(this);
				lime.graphics.utils.ImageDataUtil.multiplyAlpha(this);
				break;
			default:
			}
		} else if(!value && this.buffer.premultiplied) {
			var _g1 = this.type;
			switch(_g1[1]) {
			case 1:
				lime.graphics.utils.ImageCanvasUtil.convertToData(this);
				lime.graphics.utils.ImageDataUtil.unmultiplyAlpha(this);
				break;
			default:
			}
		}
		return value;
	}
	,get_src: function() {
		return this.buffer.get_src();
	}
	,get_transparent: function() {
		return this.buffer.transparent;
	}
	,__class__: lime.graphics.Image
	,__properties__: {get_transparent:"get_transparent",get_src:"get_src",set_premultiplied:"set_premultiplied",get_powerOfTwo:"get_powerOfTwo",get_data:"get_data"}
};
lime.graphics.ImageBuffer = function(data,width,height,bitsPerPixel) {
	if(bitsPerPixel == null) bitsPerPixel = 4;
	if(height == null) height = 0;
	if(width == null) width = 0;
	this.data = data;
	this.width = width;
	this.height = height;
	this.bitsPerPixel = bitsPerPixel;
	this.transparent = true;
};
$hxClasses["lime.graphics.ImageBuffer"] = lime.graphics.ImageBuffer;
lime.graphics.ImageBuffer.__name__ = ["lime","graphics","ImageBuffer"];
lime.graphics.ImageBuffer.prototype = {
	bitsPerPixel: null
	,data: null
	,height: null
	,premultiplied: null
	,transparent: null
	,width: null
	,__srcBitmapData: null
	,__srcCanvas: null
	,__srcContext: null
	,__srcImage: null
	,__srcImageData: null
	,clone: function() {
		var buffer = new lime.graphics.ImageBuffer(this.data,this.width,this.height,this.bitsPerPixel);
		buffer.set_src(this.get_src());
		buffer.premultiplied = this.premultiplied;
		buffer.transparent = this.transparent;
		return buffer;
	}
	,get_src: function() {
		if(this.__srcImage != null) return this.__srcImage;
		return this.__srcCanvas;
	}
	,set_src: function(value) {
		if(js.Boot.__instanceof(value,Image)) this.__srcImage = value; else if(js.Boot.__instanceof(value,HTMLCanvasElement)) {
			this.__srcCanvas = value;
			this.__srcContext = this.__srcCanvas.getContext("2d");
		}
		return value;
	}
	,__class__: lime.graphics.ImageBuffer
	,__properties__: {set_src:"set_src",get_src:"get_src"}
};
lime.graphics.ImageType = $hxClasses["lime.graphics.ImageType"] = { __ename__ : true, __constructs__ : ["CANVAS","DATA","FLASH","CUSTOM"] };
lime.graphics.ImageType.CANVAS = ["CANVAS",0];
lime.graphics.ImageType.CANVAS.toString = $estr;
lime.graphics.ImageType.CANVAS.__enum__ = lime.graphics.ImageType;
lime.graphics.ImageType.DATA = ["DATA",1];
lime.graphics.ImageType.DATA.toString = $estr;
lime.graphics.ImageType.DATA.__enum__ = lime.graphics.ImageType;
lime.graphics.ImageType.FLASH = ["FLASH",2];
lime.graphics.ImageType.FLASH.toString = $estr;
lime.graphics.ImageType.FLASH.__enum__ = lime.graphics.ImageType;
lime.graphics.ImageType.CUSTOM = ["CUSTOM",3];
lime.graphics.ImageType.CUSTOM.toString = $estr;
lime.graphics.ImageType.CUSTOM.__enum__ = lime.graphics.ImageType;
lime.graphics.RenderContext = $hxClasses["lime.graphics.RenderContext"] = { __ename__ : true, __constructs__ : ["OPENGL","CANVAS","DOM","FLASH","CONSOLE","CUSTOM"] };
lime.graphics.RenderContext.OPENGL = function(gl) { var $x = ["OPENGL",0,gl]; $x.__enum__ = lime.graphics.RenderContext; $x.toString = $estr; return $x; };
lime.graphics.RenderContext.CANVAS = function(context) { var $x = ["CANVAS",1,context]; $x.__enum__ = lime.graphics.RenderContext; $x.toString = $estr; return $x; };
lime.graphics.RenderContext.DOM = function(element) { var $x = ["DOM",2,element]; $x.__enum__ = lime.graphics.RenderContext; $x.toString = $estr; return $x; };
lime.graphics.RenderContext.FLASH = function(stage) { var $x = ["FLASH",3,stage]; $x.__enum__ = lime.graphics.RenderContext; $x.toString = $estr; return $x; };
lime.graphics.RenderContext.CONSOLE = function(context) { var $x = ["CONSOLE",4,context]; $x.__enum__ = lime.graphics.RenderContext; $x.toString = $estr; return $x; };
lime.graphics.RenderContext.CUSTOM = function(data) { var $x = ["CUSTOM",5,data]; $x.__enum__ = lime.graphics.RenderContext; $x.toString = $estr; return $x; };
lime.graphics.Renderer = function(window) {
	this.window = window;
	this.backend = new lime._backend.html5.HTML5Renderer(this);
	this.window.currentRenderer = this;
};
$hxClasses["lime.graphics.Renderer"] = lime.graphics.Renderer;
lime.graphics.Renderer.__name__ = ["lime","graphics","Renderer"];
lime.graphics.Renderer.render = function() {
	lime._backend.html5.HTML5Renderer.render();
};
lime.graphics.Renderer.prototype = {
	context: null
	,backend: null
	,window: null
	,create: function() {
		this.backend.create();
	}
	,__class__: lime.graphics.Renderer
};
lime.graphics.opengl = {};
lime.graphics.opengl.GL = function() { };
$hxClasses["lime.graphics.opengl.GL"] = lime.graphics.opengl.GL;
lime.graphics.opengl.GL.__name__ = ["lime","graphics","opengl","GL"];
lime.graphics.opengl.GL.context = null;
lime.graphics.utils = {};
lime.graphics.utils.ImageCanvasUtil = function() { };
$hxClasses["lime.graphics.utils.ImageCanvasUtil"] = lime.graphics.utils.ImageCanvasUtil;
lime.graphics.utils.ImageCanvasUtil.__name__ = ["lime","graphics","utils","ImageCanvasUtil"];
lime.graphics.utils.ImageCanvasUtil.convertToCanvas = function(image) {
	var buffer = image.buffer;
	if(buffer.__srcImage != null) {
		if(buffer.__srcCanvas == null) {
			lime.graphics.utils.ImageCanvasUtil.createCanvas(image,buffer.__srcImage.width,buffer.__srcImage.height);
			buffer.__srcContext.drawImage(buffer.__srcImage,0,0);
		}
		buffer.__srcImage = null;
	}
};
lime.graphics.utils.ImageCanvasUtil.convertToData = function(image) {
	if(image.buffer.data == null) {
		lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
		lime.graphics.utils.ImageCanvasUtil.createImageData(image);
		image.buffer.__srcCanvas = null;
		image.buffer.__srcContext = null;
	}
};
lime.graphics.utils.ImageCanvasUtil.createCanvas = function(image,width,height) {
	var buffer = image.buffer;
	if(buffer.__srcCanvas == null) {
		buffer.__srcCanvas = window.document.createElement("canvas");
		buffer.__srcCanvas.width = width;
		buffer.__srcCanvas.height = height;
		if(!image.get_transparent()) {
			if(!image.get_transparent()) buffer.__srcCanvas.setAttribute("moz-opaque","true");
			buffer.__srcContext = buffer.__srcCanvas.getContext ("2d", { alpha: false });
		} else buffer.__srcContext = buffer.__srcCanvas.getContext("2d");
		buffer.__srcContext.mozImageSmoothingEnabled = false;
		buffer.__srcContext.webkitImageSmoothingEnabled = false;
		buffer.__srcContext.imageSmoothingEnabled = false;
	}
};
lime.graphics.utils.ImageCanvasUtil.createImageData = function(image) {
	var buffer = image.buffer;
	if(buffer.data == null) {
		buffer.__srcImageData = buffer.__srcContext.getImageData(0,0,buffer.width,buffer.height);
		buffer.data = new Uint8Array(buffer.__srcImageData.data);
	}
};
lime.graphics.utils.ImageCanvasUtil.fillRect = function(image,rect,color) {
	lime.graphics.utils.ImageCanvasUtil.convertToCanvas(image);
	lime.graphics.utils.ImageCanvasUtil.sync(image);
	if(rect.x == 0 && rect.y == 0 && rect.width == image.width && rect.height == image.height) {
		if(image.get_transparent() && (color & -16777216) == 0) {
			image.buffer.__srcCanvas.width = image.buffer.width;
			return;
		}
	}
	var a;
	if(image.get_transparent()) a = (color & -16777216) >>> 24; else a = 255;
	var r = (color & 16711680) >>> 16;
	var g = (color & 65280) >>> 8;
	var b = color & 255;
	image.buffer.__srcContext.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
	image.buffer.__srcContext.fillRect(rect.x + image.offsetX,rect.y + image.offsetY,rect.width + image.offsetX,rect.height + image.offsetY);
};
lime.graphics.utils.ImageCanvasUtil.sync = function(image) {
	if(image.dirty && image.type != lime.graphics.ImageType.DATA) {
		image.buffer.__srcContext.putImageData(image.buffer.__srcImageData,0,0);
		image.buffer.data = null;
		image.dirty = false;
	}
};
lime.graphics.utils.ImageDataUtil = function() { };
$hxClasses["lime.graphics.utils.ImageDataUtil"] = lime.graphics.utils.ImageDataUtil;
lime.graphics.utils.ImageDataUtil.__name__ = ["lime","graphics","utils","ImageDataUtil"];
lime.graphics.utils.ImageDataUtil.__alpha16 = null;
lime.graphics.utils.ImageDataUtil.__clamp = null;
lime.graphics.utils.ImageDataUtil.fillRect = function(image,rect,color) {
	var a;
	if(image.get_transparent()) a = (color & -16777216) >>> 24; else a = 255;
	var r = (color & 16711680) >>> 16;
	var g = (color & 65280) >>> 8;
	var b = color & 255;
	var rgba = r | g << 8 | b << 16 | a << 24;
	var data = image.buffer.data;
	if(rect.width == image.buffer.width && rect.height == image.buffer.height && rect.x == 0 && rect.y == 0 && image.offsetX == 0 && image.offsetY == 0) {
		var length = image.buffer.width * image.buffer.height;
		var j = 0;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			j = i * 4;
			data[j] = r;
			data[j + 1] = g;
			data[j + 2] = b;
			data[j + 3] = a;
		}
	} else {
		var stride = image.buffer.width * 4;
		var offset;
		var rowStart = rect.y + image.offsetY | 0;
		var rowEnd = Std["int"](rect.get_bottom() + image.offsetY);
		var columnStart = rect.x + image.offsetX | 0;
		var columnEnd = Std["int"](rect.get_right() + image.offsetX);
		var _g1 = rowStart;
		while(_g1 < rowEnd) {
			var row = _g1++;
			var _g11 = columnStart;
			while(_g11 < columnEnd) {
				var column = _g11++;
				offset = row * stride + column * 4;
				data[offset] = r;
				data[offset + 1] = g;
				data[offset + 2] = b;
				data[offset + 3] = a;
			}
		}
	}
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.multiplyAlpha = function(image) {
	var data = image.buffer.data;
	if(data == null) return;
	var index;
	var a16;
	var length = data.length / 4 | 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		index = i * 4;
		var a161 = lime.graphics.utils.ImageDataUtil.__alpha16[data[index + 3]];
		data[index] = data[index] * a161 >> 16;
		data[index + 1] = data[index + 1] * a161 >> 16;
		data[index + 2] = data[index + 2] * a161 >> 16;
	}
	image.buffer.premultiplied = true;
	image.dirty = true;
};
lime.graphics.utils.ImageDataUtil.unmultiplyAlpha = function(image) {
	var data = image.buffer.data;
	var index;
	var a;
	var unmultiply;
	var length = data.length / 4 | 0;
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		index = i * 4;
		a = data[index + 3];
		if(a != 0) {
			unmultiply = 255.0 / a;
			data[index] = lime.graphics.utils.ImageDataUtil.__clamp[data[index] * unmultiply | 0];
			data[index + 1] = lime.graphics.utils.ImageDataUtil.__clamp[data[index + 1] * unmultiply | 0];
			data[index + 2] = lime.graphics.utils.ImageDataUtil.__clamp[data[index + 2] * unmultiply | 0];
		}
	}
	image.buffer.premultiplied = false;
	image.dirty = true;
};
lime.math = {};
lime.math.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["lime.math.Rectangle"] = lime.math.Rectangle;
lime.math.Rectangle.__name__ = ["lime","math","Rectangle"];
lime.math.Rectangle.prototype = {
	height: null
	,width: null
	,x: null
	,y: null
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,__toFlashRectangle: function() {
		return null;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,__class__: lime.math.Rectangle
	,__properties__: {get_right:"get_right",get_bottom:"get_bottom"}
};
lime.net = {};
lime.net.URLLoader = function(request) {
	this.onSecurityError = new lime.app.Event();
	this.onProgress = new lime.app.Event();
	this.onOpen = new lime.app.Event();
	this.onIOError = new lime.app.Event();
	this.onHTTPStatus = new lime.app.Event();
	this.onComplete = new lime.app.Event();
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(lime.net.URLLoaderDataFormat.TEXT);
	this.__data = "";
	this.__curl = lime.net.curl.CURLEasy.init();
	if(request != null) this.load(request);
};
$hxClasses["lime.net.URLLoader"] = lime.net.URLLoader;
lime.net.URLLoader.__name__ = ["lime","net","URLLoader"];
lime.net.URLLoader.prototype = {
	bytesLoaded: null
	,bytesTotal: null
	,data: null
	,dataFormat: null
	,onComplete: null
	,onHTTPStatus: null
	,onIOError: null
	,onOpen: null
	,onProgress: null
	,onSecurityError: null
	,__curl: null
	,__data: null
	,getData: function() {
		return null;
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,registerEvents: function(subject) {
		var _g = this;
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.__onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s;
			try {
				s = subject.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) {
				var listeners = self.onHTTPStatus.listeners;
				var repeat = self.onHTTPStatus.repeat;
				var length = listeners.length;
				var i = 0;
				while(i < length) {
					listeners[i](_g,s);
					if(!repeat[i]) {
						self.onHTTPStatus.remove(listeners[i]);
						length--;
					} else i++;
				}
			}
			if(s != null && s >= 200 && s < 400) self.__onData(subject.response); else if(s == null) {
				var listeners1 = self.onIOError.listeners;
				var repeat1 = self.onIOError.repeat;
				var length1 = listeners1.length;
				var i1 = 0;
				while(i1 < length1) {
					listeners1[i1](_g,"Failed to connect or resolve host");
					if(!repeat1[i1]) {
						self.onIOError.remove(listeners1[i1]);
						length1--;
					} else i1++;
				}
			} else if(s == 12029) {
				var listeners2 = self.onIOError.listeners;
				var repeat2 = self.onIOError.repeat;
				var length2 = listeners2.length;
				var i2 = 0;
				while(i2 < length2) {
					listeners2[i2](_g,"Failed to connect to host");
					if(!repeat2[i2]) {
						self.onIOError.remove(listeners2[i2]);
						length2--;
					} else i2++;
				}
			} else if(s == 12007) {
				var listeners3 = self.onIOError.listeners;
				var repeat3 = self.onIOError.repeat;
				var length3 = listeners3.length;
				var i3 = 0;
				while(i3 < length3) {
					listeners3[i3](_g,"Unknown host");
					if(!repeat3[i3]) {
						self.onIOError.remove(listeners3[i3]);
						length3--;
					} else i3++;
				}
			} else if(s == 0) {
				var listeners4 = self.onIOError.listeners;
				var repeat4 = self.onIOError.repeat;
				var length4 = listeners4.length;
				var i4 = 0;
				while(i4 < length4) {
					listeners4[i4](_g,"Unable to make request (may be blocked due to cross-domain permissions)");
					if(!repeat4[i4]) {
						self.onIOError.remove(listeners4[i4]);
						length4--;
					} else i4++;
				}
				var listeners5 = self.onSecurityError.listeners;
				var repeat5 = self.onSecurityError.repeat;
				var length5 = listeners5.length;
				var i5 = 0;
				while(i5 < length5) {
					listeners5[i5](_g,"Unable to make request (may be blocked due to cross-domain permissions)");
					if(!repeat5[i5]) {
						self.onSecurityError.remove(listeners5[i5]);
						length5--;
					} else i5++;
				}
			} else {
				var listeners6 = self.onIOError.listeners;
				var repeat6 = self.onIOError.repeat;
				var length6 = listeners6.length;
				var i6 = 0;
				while(i6 < length6) {
					listeners6[i6](_g,"Http Error #" + subject.status);
					if(!repeat6[i6]) {
						self.onIOError.remove(listeners6[i6]);
						length6--;
					} else i6++;
				}
			}
		};
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js.Boot.__instanceof(data,lime.utils.ByteArray)) {
			var data1 = data;
			var _g = this.dataFormat;
			switch(_g[1]) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js.Boot.__instanceof(data,lime.net.URLVariables)) {
			var data2 = data;
			var _g1 = 0;
			var _g11 = Reflect.fields(data2);
			while(_g1 < _g11.length) {
				var p = _g11[_g1];
				++_g1;
				if(uri.length != 0) uri += "&";
				uri += encodeURIComponent(p) + "=" + StringTools.urlEncode(Reflect.field(data2,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open("GET",url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(js.Boot.__cast(method , String),url,true);
		} catch( e ) {
			var listeners = this.onIOError.listeners;
			var repeat = this.onIOError.repeat;
			var length = listeners.length;
			var i = 0;
			while(i < length) {
				listeners[i](this,e.toString());
				if(!repeat[i]) {
					this.onIOError.remove(listeners[i]);
					length--;
				} else i++;
			}
			return;
		}
		var _g2 = this.dataFormat;
		switch(_g2[1]) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g3 = 0;
		while(_g3 < requestHeaders.length) {
			var header = requestHeaders[_g3];
			++_g3;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		var listeners1 = this.onOpen.listeners;
		var repeat1 = this.onOpen.repeat;
		var length1 = listeners1.length;
		var i1 = 0;
		while(i1 < length1) {
			listeners1[i1](this);
			if(!repeat1[i1]) {
				this.onOpen.remove(listeners1[i1]);
				length1--;
			} else i1++;
		}
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,__onData: function(_) {
		var content = this.getData();
		var _g = this.dataFormat;
		switch(_g[1]) {
		case 0:
			this.data = lime.utils.ByteArray.__ofBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var listeners = this.onComplete.listeners;
		var repeat = this.onComplete.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](this);
			if(!repeat[i]) {
				this.onComplete.remove(listeners[i]);
				length--;
			} else i++;
		}
	}
	,__onProgress: function(event) {
		this.bytesLoaded = event.loaded;
		this.bytesTotal = event.total;
		var listeners = this.onProgress.listeners;
		var repeat = this.onProgress.repeat;
		var length = listeners.length;
		var i = 0;
		while(i < length) {
			listeners[i](this,this.bytesLoaded,this.bytesTotal);
			if(!repeat[i]) {
				this.onProgress.remove(listeners[i]);
				length--;
			} else i++;
		}
	}
	,set_dataFormat: function(inputVal) {
		if(inputVal == lime.net.URLLoaderDataFormat.BINARY && !Reflect.hasField(window,"ArrayBuffer")) this.dataFormat = lime.net.URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,__class__: lime.net.URLLoader
	,__properties__: {set_dataFormat:"set_dataFormat"}
};
lime.net.URLLoaderDataFormat = $hxClasses["lime.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] };
lime.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
lime.net.URLLoaderDataFormat.BINARY.toString = $estr;
lime.net.URLLoaderDataFormat.BINARY.__enum__ = lime.net.URLLoaderDataFormat;
lime.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
lime.net.URLLoaderDataFormat.TEXT.toString = $estr;
lime.net.URLLoaderDataFormat.TEXT.__enum__ = lime.net.URLLoaderDataFormat;
lime.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
lime.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
lime.net.URLLoaderDataFormat.VARIABLES.__enum__ = lime.net.URLLoaderDataFormat;
lime.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = "GET";
	this.contentType = null;
};
$hxClasses["lime.net.URLRequest"] = lime.net.URLRequest;
lime.net.URLRequest.__name__ = ["lime","net","URLRequest"];
lime.net.URLRequest.prototype = {
	contentType: null
	,data: null
	,method: null
	,requestHeaders: null
	,url: null
	,formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == "GET" || this.data == null) return res;
		if(typeof(this.data) == "string" || js.Boot.__instanceof(this.data,lime.utils.ByteArray)) {
			res = res.slice();
			res.push(new lime.net.URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: lime.net.URLRequest
};
lime.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["lime.net.URLRequestHeader"] = lime.net.URLRequestHeader;
lime.net.URLRequestHeader.__name__ = ["lime","net","URLRequestHeader"];
lime.net.URLRequestHeader.prototype = {
	name: null
	,value: null
	,__class__: lime.net.URLRequestHeader
};
lime.net.URLVariables = function() { };
$hxClasses["lime.net.URLVariables"] = lime.net.URLVariables;
lime.net.URLVariables.__name__ = ["lime","net","URLVariables"];
lime.net.curl = {};
lime.net.curl.CURLEasy = function() { };
$hxClasses["lime.net.curl.CURLEasy"] = lime.net.curl.CURLEasy;
lime.net.curl.CURLEasy.__name__ = ["lime","net","curl","CURLEasy"];
lime.net.curl.CURLEasy.init = function() {
	return 0;
};
lime.system = {};
lime.system.System = function() { };
$hxClasses["lime.system.System"] = lime.system.System;
lime.system.System.__name__ = ["lime","system","System"];
lime.system.System.embed = $hx_exports.lime.embed = function(element,width,height,background) {
	var htmlElement = null;
	if(typeof(element) == "string") htmlElement = window.document.getElementById(js.Boot.__cast(element , String)); else if(element == null) htmlElement = window.document.createElement("div"); else htmlElement = element;
	var color = null;
	if(background != null) {
		background = StringTools.replace(background,"#","");
		if(background.indexOf("0x") > -1) color = Std.parseInt(background); else color = Std.parseInt("0x" + background);
	}
	if(width == null) width = 0;
	if(height == null) height = 0;
	ApplicationMain.config.background = color;
	ApplicationMain.config.element = htmlElement;
	ApplicationMain.config.width = width;
	ApplicationMain.config.height = height;
	ApplicationMain.create();
};
lime.ui = {};
lime.ui.KeyEventManager = function() { };
$hxClasses["lime.ui.KeyEventManager"] = lime.ui.KeyEventManager;
lime.ui.KeyEventManager.__name__ = ["lime","ui","KeyEventManager"];
lime.ui.Mouse = function() { };
$hxClasses["lime.ui.Mouse"] = lime.ui.Mouse;
lime.ui.Mouse.__name__ = ["lime","ui","Mouse"];
lime.ui.Mouse.__properties__ = {set_cursor:"set_cursor"}
lime.ui.Mouse.set_cursor = function(value) {
	return lime._backend.html5.HTML5Mouse.set_cursor(value);
};
lime.ui.MouseCursor = $hxClasses["lime.ui.MouseCursor"] = { __ename__ : true, __constructs__ : ["ARROW","CROSSHAIR","DEFAULT","MOVE","POINTER","RESIZE_NESW","RESIZE_NS","RESIZE_NWSE","RESIZE_WE","TEXT","WAIT","WAIT_ARROW","CUSTOM"] };
lime.ui.MouseCursor.ARROW = ["ARROW",0];
lime.ui.MouseCursor.ARROW.toString = $estr;
lime.ui.MouseCursor.ARROW.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.CROSSHAIR = ["CROSSHAIR",1];
lime.ui.MouseCursor.CROSSHAIR.toString = $estr;
lime.ui.MouseCursor.CROSSHAIR.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.DEFAULT = ["DEFAULT",2];
lime.ui.MouseCursor.DEFAULT.toString = $estr;
lime.ui.MouseCursor.DEFAULT.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.MOVE = ["MOVE",3];
lime.ui.MouseCursor.MOVE.toString = $estr;
lime.ui.MouseCursor.MOVE.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.POINTER = ["POINTER",4];
lime.ui.MouseCursor.POINTER.toString = $estr;
lime.ui.MouseCursor.POINTER.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.RESIZE_NESW = ["RESIZE_NESW",5];
lime.ui.MouseCursor.RESIZE_NESW.toString = $estr;
lime.ui.MouseCursor.RESIZE_NESW.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.RESIZE_NS = ["RESIZE_NS",6];
lime.ui.MouseCursor.RESIZE_NS.toString = $estr;
lime.ui.MouseCursor.RESIZE_NS.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.RESIZE_NWSE = ["RESIZE_NWSE",7];
lime.ui.MouseCursor.RESIZE_NWSE.toString = $estr;
lime.ui.MouseCursor.RESIZE_NWSE.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.RESIZE_WE = ["RESIZE_WE",8];
lime.ui.MouseCursor.RESIZE_WE.toString = $estr;
lime.ui.MouseCursor.RESIZE_WE.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.TEXT = ["TEXT",9];
lime.ui.MouseCursor.TEXT.toString = $estr;
lime.ui.MouseCursor.TEXT.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.WAIT = ["WAIT",10];
lime.ui.MouseCursor.WAIT.toString = $estr;
lime.ui.MouseCursor.WAIT.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.WAIT_ARROW = ["WAIT_ARROW",11];
lime.ui.MouseCursor.WAIT_ARROW.toString = $estr;
lime.ui.MouseCursor.WAIT_ARROW.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseCursor.CUSTOM = ["CUSTOM",12];
lime.ui.MouseCursor.CUSTOM.toString = $estr;
lime.ui.MouseCursor.CUSTOM.__enum__ = lime.ui.MouseCursor;
lime.ui.MouseEventManager = function() { };
$hxClasses["lime.ui.MouseEventManager"] = lime.ui.MouseEventManager;
lime.ui.MouseEventManager.__name__ = ["lime","ui","MouseEventManager"];
lime.ui.TouchEventManager = function() { };
$hxClasses["lime.ui.TouchEventManager"] = lime.ui.TouchEventManager;
lime.ui.TouchEventManager.__name__ = ["lime","ui","TouchEventManager"];
lime.ui.Window = function(config) {
	this.config = config;
	this.backend = new lime._backend.html5.HTML5Window(this);
};
$hxClasses["lime.ui.Window"] = lime.ui.Window;
lime.ui.Window.__name__ = ["lime","ui","Window"];
lime.ui.Window.prototype = {
	currentRenderer: null
	,config: null
	,fullscreen: null
	,height: null
	,width: null
	,backend: null
	,create: function(application) {
		this.backend.create(application);
		if(this.currentRenderer != null) this.currentRenderer.create();
	}
	,__class__: lime.ui.Window
};
lime.utils = {};
lime.utils.ByteArray = function(size) {
	if(size == null) size = 0;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	if(size > 0) this.allocated = size;
	this.___resizeBuffer(this.allocated);
	this.set_length(this.allocated);
};
$hxClasses["lime.utils.ByteArray"] = lime.utils.ByteArray;
lime.utils.ByteArray.__name__ = ["lime","utils","ByteArray"];
lime.utils.ByteArray.__ofBuffer = function(buffer) {
	var bytes = new lime.utils.ByteArray();
	bytes.set_length(bytes.allocated = buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
};
lime.utils.ByteArray.prototype = {
	length: null
	,position: null
	,allocated: null
	,byteView: null
	,data: null
	,readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var data = this.data;
			var c = data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | data.getUint8(this.position++) & 127);
			} else {
				var c21 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,writeByte: function(value) {
		var lengthToEnsure = this.position + 1;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		var data = this.data;
		data.setInt8(this.position,value);
		this.position += 1;
	}
	,writeUTFBytes: function(value) {
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,__get: function(pos) {
		return this.data.getInt8(pos);
	}
	,___resizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,set_length: function(value) {
		if(this.allocated < value) this.___resizeBuffer(this.allocated = Std["int"](Math.max(value,this.allocated * 2))); else if(this.allocated > value) this.___resizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,__class__: lime.utils.ByteArray
	,__properties__: {set_length:"set_length"}
};
var msignal = {};
msignal.Signal = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal.SlotList.NIL;
	this.priorityBased = false;
};
$hxClasses["msignal.Signal"] = msignal.Signal;
msignal.Signal.__name__ = ["msignal","Signal"];
msignal.Signal.prototype = {
	valueClasses: null
	,slots: null
	,priorityBased: null
	,add: function(listener) {
		return this.registerListener(listener);
	}
	,addOnce: function(listener) {
		return this.registerListener(listener,true);
	}
	,remove: function(listener) {
		var slot = this.slots.find(listener);
		if(slot == null) return null;
		this.slots = this.slots.filterNot(listener);
		return slot;
	}
	,registerListener: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		if(this.registrationPossible(listener,once)) {
			var newSlot = this.createSlot(listener,once,priority);
			if(!this.priorityBased && priority != 0) this.priorityBased = true;
			if(!this.priorityBased && priority == 0) this.slots = this.slots.prepend(newSlot); else this.slots = this.slots.insertWithPriority(newSlot);
			return newSlot;
		}
		return this.slots.find(listener);
	}
	,registrationPossible: function(listener,once) {
		if(!this.slots.nonEmpty) return true;
		var existingSlot = this.slots.find(listener);
		if(existingSlot == null) return true;
		if(existingSlot.once != once) throw "You cannot addOnce() then add() the same listener without removing the relationship first.";
		return false;
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return null;
	}
	,__class__: msignal.Signal
};
msignal.Signal0 = function() {
	msignal.Signal.call(this);
};
$hxClasses["msignal.Signal0"] = msignal.Signal0;
msignal.Signal0.__name__ = ["msignal","Signal0"];
msignal.Signal0.__super__ = msignal.Signal;
msignal.Signal0.prototype = $extend(msignal.Signal.prototype,{
	dispatch: function() {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute();
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal.Slot0(this,listener,once,priority);
	}
	,__class__: msignal.Signal0
});
msignal.Signal2 = function(type1,type2) {
	msignal.Signal.call(this,[type1,type2]);
};
$hxClasses["msignal.Signal2"] = msignal.Signal2;
msignal.Signal2.__name__ = ["msignal","Signal2"];
msignal.Signal2.__super__ = msignal.Signal;
msignal.Signal2.prototype = $extend(msignal.Signal.prototype,{
	dispatch: function(value1,value2) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value1,value2);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal.Slot2(this,listener,once,priority);
	}
	,__class__: msignal.Signal2
});
msignal.Slot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
$hxClasses["msignal.Slot"] = msignal.Slot;
msignal.Slot.__name__ = ["msignal","Slot"];
msignal.Slot.prototype = {
	listener: null
	,once: null
	,priority: null
	,enabled: null
	,signal: null
	,remove: function() {
		this.signal.remove(this.listener);
	}
	,set_listener: function(value) {
		if(value == null) throw "listener cannot be null";
		return this.listener = value;
	}
	,__class__: msignal.Slot
	,__properties__: {set_listener:"set_listener"}
};
msignal.Slot0 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot0"] = msignal.Slot0;
msignal.Slot0.__name__ = ["msignal","Slot0"];
msignal.Slot0.__super__ = msignal.Slot;
msignal.Slot0.prototype = $extend(msignal.Slot.prototype,{
	execute: function() {
		if(!this.enabled) return;
		if(this.once) this.remove();
		this.listener();
	}
	,__class__: msignal.Slot0
});
msignal.Slot2 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
$hxClasses["msignal.Slot2"] = msignal.Slot2;
msignal.Slot2.__name__ = ["msignal","Slot2"];
msignal.Slot2.__super__ = msignal.Slot;
msignal.Slot2.prototype = $extend(msignal.Slot.prototype,{
	param1: null
	,param2: null
	,execute: function(value1,value2) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param1 != null) value1 = this.param1;
		if(this.param2 != null) value2 = this.param2;
		this.listener(value1,value2);
	}
	,__class__: msignal.Slot2
});
msignal.SlotList = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) {
		if(msignal.SlotList.NIL != null) throw "Parameters head and tail are null. Use the NIL element instead.";
		this.nonEmpty = false;
	} else if(head == null) throw "Parameter head cannot be null."; else {
		this.head = head;
		if(tail == null) this.tail = msignal.SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
$hxClasses["msignal.SlotList"] = msignal.SlotList;
msignal.SlotList.__name__ = ["msignal","SlotList"];
msignal.SlotList.NIL = null;
msignal.SlotList.prototype = {
	head: null
	,tail: null
	,nonEmpty: null
	,prepend: function(slot) {
		return new msignal.SlotList(slot,this);
	}
	,insertWithPriority: function(slot) {
		if(!this.nonEmpty) return new msignal.SlotList(slot);
		var priority = slot.priority;
		if(priority >= this.head.priority) return this.prepend(slot);
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(priority > current.head.priority) {
				subClone.tail = current.prepend(slot);
				return wholeClone;
			}
			subClone = subClone.tail = new msignal.SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal.SlotList(slot);
		return wholeClone;
	}
	,filterNot: function(listener) {
		if(!this.nonEmpty || listener == null) return this;
		if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(Reflect.compareMethods(current.head.listener,listener)) {
				subClone.tail = current.tail;
				return wholeClone;
			}
			subClone = subClone.tail = new msignal.SlotList(current.head);
			current = current.tail;
		}
		return this;
	}
	,find: function(listener) {
		if(!this.nonEmpty) return null;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return p.head;
			p = p.tail;
		}
		return null;
	}
	,__class__: msignal.SlotList
};
openfl.Assets = function() { };
$hxClasses["openfl.Assets"] = openfl.Assets;
openfl.Assets.__name__ = ["openfl","Assets"];
openfl.Assets.getText = function(id) {
	return lime.Assets.getText(id);
};
openfl.display.MovieClip = function() {
	openfl.display.Sprite.call(this);
	this.__currentFrame = 0;
	this.__currentLabels = [];
	this.__totalFrames = 0;
	this.enabled = true;
	this.loaderInfo = openfl.display.LoaderInfo.create(null);
};
$hxClasses["openfl.display.MovieClip"] = openfl.display.MovieClip;
openfl.display.MovieClip.__name__ = ["openfl","display","MovieClip"];
openfl.display.MovieClip.__super__ = openfl.display.Sprite;
openfl.display.MovieClip.prototype = $extend(openfl.display.Sprite.prototype,{
	enabled: null
	,__currentFrame: null
	,__currentLabels: null
	,__totalFrames: null
	,__class__: openfl.display.MovieClip
});
openfl.display.LoaderInfo = function() {
	openfl.events.EventDispatcher.call(this);
	this.applicationDomain = openfl.system.ApplicationDomain.currentDomain;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["openfl.display.LoaderInfo"] = openfl.display.LoaderInfo;
openfl.display.LoaderInfo.__name__ = ["openfl","display","LoaderInfo"];
openfl.display.LoaderInfo.create = function(loader) {
	var loaderInfo = new openfl.display.LoaderInfo();
	loaderInfo.uncaughtErrorEvents = new openfl.events.UncaughtErrorEvents();
	if(loader != null) loaderInfo.loader = loader; else loaderInfo.url = "";
	return loaderInfo;
};
openfl.display.LoaderInfo.__super__ = openfl.events.EventDispatcher;
openfl.display.LoaderInfo.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	applicationDomain: null
	,bytesLoaded: null
	,bytesTotal: null
	,childAllowsParent: null
	,loader: null
	,parameters: null
	,uncaughtErrorEvents: null
	,url: null
	,__class__: openfl.display.LoaderInfo
});
openfl.system = {};
openfl.system.ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) this.parentDomain = parentDomain; else this.parentDomain = openfl.system.ApplicationDomain.currentDomain;
};
$hxClasses["openfl.system.ApplicationDomain"] = openfl.system.ApplicationDomain;
openfl.system.ApplicationDomain.__name__ = ["openfl","system","ApplicationDomain"];
openfl.system.ApplicationDomain.prototype = {
	parentDomain: null
	,__class__: openfl.system.ApplicationDomain
};
openfl.events.UncaughtErrorEvents = function(target) {
	openfl.events.EventDispatcher.call(this,target);
};
$hxClasses["openfl.events.UncaughtErrorEvents"] = openfl.events.UncaughtErrorEvents;
openfl.events.UncaughtErrorEvents.__name__ = ["openfl","events","UncaughtErrorEvents"];
openfl.events.UncaughtErrorEvents.__super__ = openfl.events.EventDispatcher;
openfl.events.UncaughtErrorEvents.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	__class__: openfl.events.UncaughtErrorEvents
});
openfl.geom = {};
openfl.geom.Matrix = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
	this.__array = new Float32Array([a,b,c,d,tx,ty,0,0,1]);
};
$hxClasses["openfl.geom.Matrix"] = openfl.geom.Matrix;
openfl.geom.Matrix.__name__ = ["openfl","geom","Matrix"];
openfl.geom.Matrix.prototype = {
	a: null
	,b: null
	,c: null
	,d: null
	,tx: null
	,ty: null
	,__array: null
	,clone: function() {
		return new openfl.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,equals: function(matrix) {
		return matrix != null && this.tx == matrix.tx && this.ty == matrix.ty && this.a == matrix.a && this.b == matrix.b && this.c == matrix.c && this.d == matrix.d;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,mult: function(m) {
		var result = new openfl.geom.Matrix();
		result.a = this.a * m.a + this.b * m.c;
		result.b = this.a * m.b + this.b * m.d;
		result.c = this.c * m.a + this.d * m.c;
		result.d = this.c * m.b + this.d * m.d;
		result.tx = this.tx * m.a + this.ty * m.c + m.tx;
		result.ty = this.tx * m.b + this.ty * m.d + m.ty;
		return result;
	}
	,scale: function(sx,sy) {
		this.a *= sx;
		this.b *= sy;
		this.c *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;
	}
	,to3DString: function(roundPixels) {
		if(roundPixels == null) roundPixels = false;
		if(roundPixels) return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + (this.tx | 0) + ", " + (this.ty | 0) + ", 0, 1)"; else return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", 0, 1)";
	}
	,transformPoint: function(pos) {
		return new openfl.geom.Point(pos.x * this.a + pos.y * this.c + this.tx,pos.x * this.b + pos.y * this.d + this.ty);
	}
	,translate: function(dx,dy) {
		var m = new openfl.geom.Matrix();
		m.tx = dx;
		m.ty = dy;
		this.concat(m);
	}
	,toArray: function(transpose) {
		if(transpose == null) transpose = false;
		if(transpose) {
			this.__array[0] = this.a;
			this.__array[1] = this.c;
			this.__array[2] = 0;
			this.__array[3] = this.b;
			this.__array[4] = this.d;
			this.__array[5] = 0;
			this.__array[6] = this.tx;
			this.__array[7] = this.ty;
			this.__array[8] = 1;
		} else {
			this.__array[0] = this.a;
			this.__array[1] = this.b;
			this.__array[2] = this.tx;
			this.__array[3] = this.c;
			this.__array[4] = this.d;
			this.__array[5] = this.ty;
			this.__array[6] = 0;
			this.__array[7] = 0;
			this.__array[8] = 1;
		}
		return this.__array;
	}
	,__translateTransformed: function(pos) {
		this.tx = pos.x * this.a + pos.y * this.c + this.tx;
		this.ty = pos.x * this.b + pos.y * this.d + this.ty;
	}
	,__class__: openfl.geom.Matrix
};
openfl.Lib = function() { };
$hxClasses["openfl.Lib"] = openfl.Lib;
openfl.Lib.__name__ = ["openfl","Lib"];
openfl.Lib.application = null;
openfl.Lib.embed = $hx_exports.openfl.embed = function(elementName,width,height,background) {
	lime.system.System.embed(elementName,width,height,background);
};
openfl.Lib.getTimer = function() {
	return Std["int"]((haxe.Timer.stamp() - openfl.Lib.__startTime) * 1000);
};
openfl.VectorData = function() {
	this.length = 0;
};
$hxClasses["openfl.VectorData"] = openfl.VectorData;
openfl.VectorData.__name__ = ["openfl","VectorData"];
openfl.VectorData.prototype = {
	data: null
	,fixed: null
	,length: null
	,__class__: openfl.VectorData
};
openfl._internal = {};
openfl._internal.renderer = {};
openfl._internal.renderer.AbstractRenderer = function(width,height) {
	this.width = width;
	this.height = height;
};
$hxClasses["openfl._internal.renderer.AbstractRenderer"] = openfl._internal.renderer.AbstractRenderer;
openfl._internal.renderer.AbstractRenderer.__name__ = ["openfl","_internal","renderer","AbstractRenderer"];
openfl._internal.renderer.AbstractRenderer.prototype = {
	height: null
	,width: null
	,renderSession: null
	,render: function(stage) {
	}
	,resize: function(width,height) {
	}
	,__class__: openfl._internal.renderer.AbstractRenderer
};
openfl._internal.renderer.RenderSession = function() {
};
$hxClasses["openfl._internal.renderer.RenderSession"] = openfl._internal.renderer.RenderSession;
openfl._internal.renderer.RenderSession.__name__ = ["openfl","_internal","renderer","RenderSession"];
openfl._internal.renderer.RenderSession.prototype = {
	context: null
	,element: null
	,gl: null
	,renderer: null
	,roundPixels: null
	,transformProperty: null
	,transformOriginProperty: null
	,vendorPrefix: null
	,z: null
	,drawCount: null
	,currentBlendMode: null
	,projection: null
	,offset: null
	,shaderManager: null
	,maskManager: null
	,filterManager: null
	,blendModeManager: null
	,spriteBatch: null
	,stencilManager: null
	,__class__: openfl._internal.renderer.RenderSession
};
openfl._internal.renderer.canvas = {};
openfl._internal.renderer.canvas.CanvasGraphics = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasGraphics"] = openfl._internal.renderer.canvas.CanvasGraphics;
openfl._internal.renderer.canvas.CanvasGraphics.__name__ = ["openfl","_internal","renderer","canvas","CanvasGraphics"];
openfl._internal.renderer.canvas.CanvasGraphics.bounds = null;
openfl._internal.renderer.canvas.CanvasGraphics.hasFill = null;
openfl._internal.renderer.canvas.CanvasGraphics.hasStroke = null;
openfl._internal.renderer.canvas.CanvasGraphics.inPath = null;
openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix = null;
openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix = null;
openfl._internal.renderer.canvas.CanvasGraphics.positionX = null;
openfl._internal.renderer.canvas.CanvasGraphics.positionY = null;
openfl._internal.renderer.canvas.CanvasGraphics.setFill = null;
openfl._internal.renderer.canvas.CanvasGraphics.context = null;
openfl._internal.renderer.canvas.CanvasGraphics.pattern = null;
openfl._internal.renderer.canvas.CanvasGraphics.beginPath = function() {
	if(!openfl._internal.renderer.canvas.CanvasGraphics.inPath) {
		openfl._internal.renderer.canvas.CanvasGraphics.context.beginPath();
		openfl._internal.renderer.canvas.CanvasGraphics.inPath = true;
	}
};
openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill = function(bitmapFill,bitmapRepeat) {
	if(openfl._internal.renderer.canvas.CanvasGraphics.setFill || bitmapFill == null) return;
	if(openfl._internal.renderer.canvas.CanvasGraphics.pattern == null) openfl._internal.renderer.canvas.CanvasGraphics.pattern = openfl._internal.renderer.canvas.CanvasGraphics.context.createPattern(bitmapFill.__image.get_src(),bitmapRepeat?"repeat":"no-repeat");
	openfl._internal.renderer.canvas.CanvasGraphics.context.fillStyle = openfl._internal.renderer.canvas.CanvasGraphics.pattern;
	openfl._internal.renderer.canvas.CanvasGraphics.setFill = true;
};
openfl._internal.renderer.canvas.CanvasGraphics.closePath = function(closeFill) {
	if(openfl._internal.renderer.canvas.CanvasGraphics.inPath) {
		if(openfl._internal.renderer.canvas.CanvasGraphics.hasFill) {
			openfl._internal.renderer.canvas.CanvasGraphics.context.translate(-openfl._internal.renderer.canvas.CanvasGraphics.bounds.x,-openfl._internal.renderer.canvas.CanvasGraphics.bounds.y);
			if(openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix != null) {
				openfl._internal.renderer.canvas.CanvasGraphics.context.transform(openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.a,openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.b,openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.c,openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.d,openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.tx,openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.ty);
				openfl._internal.renderer.canvas.CanvasGraphics.context.fill();
				openfl._internal.renderer.canvas.CanvasGraphics.context.transform(openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.a,openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.b,openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.c,openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.d,openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.tx,openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.ty);
			} else openfl._internal.renderer.canvas.CanvasGraphics.context.fill();
			openfl._internal.renderer.canvas.CanvasGraphics.context.translate(openfl._internal.renderer.canvas.CanvasGraphics.bounds.x,openfl._internal.renderer.canvas.CanvasGraphics.bounds.y);
		}
		openfl._internal.renderer.canvas.CanvasGraphics.context.closePath();
		if(openfl._internal.renderer.canvas.CanvasGraphics.hasStroke) openfl._internal.renderer.canvas.CanvasGraphics.context.stroke();
	}
	openfl._internal.renderer.canvas.CanvasGraphics.inPath = false;
	if(closeFill) {
		openfl._internal.renderer.canvas.CanvasGraphics.hasFill = false;
		openfl._internal.renderer.canvas.CanvasGraphics.hasStroke = false;
		openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix = null;
		openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix = null;
	}
};
openfl._internal.renderer.canvas.CanvasGraphics.drawRoundRect = function(x,y,width,height,rx,ry) {
	if(ry == -1) ry = rx;
	rx *= 0.5;
	ry *= 0.5;
	if(rx > width / 2) rx = width / 2;
	if(ry > height / 2) ry = height / 2;
	var xe = x + width;
	var ye = y + height;
	var cx1 = -rx + rx * openfl._internal.renderer.canvas.CanvasGraphics.SIN45;
	var cx2 = -rx + rx * openfl._internal.renderer.canvas.CanvasGraphics.TAN22;
	var cy1 = -ry + ry * openfl._internal.renderer.canvas.CanvasGraphics.SIN45;
	var cy2 = -ry + ry * openfl._internal.renderer.canvas.CanvasGraphics.TAN22;
	openfl._internal.renderer.canvas.CanvasGraphics.context.moveTo(xe,ye - ry);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(xe,ye + cy2,xe + cx1,ye + cy1);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(xe + cx2,ye,xe - rx,ye);
	openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x + rx,ye);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(x - cx2,ye,x - cx1,ye + cy1);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(x,ye + cy2,x,ye - ry);
	openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x,y + ry);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(x,y - cy2,x - cx1,y - cy1);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(x - cx2,y,x + rx,y);
	openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(xe - rx,y);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(xe + cx2,y,xe + cx1,y - cy1);
	openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(xe,y - cy2,xe,y + ry);
	openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(xe,ye - ry);
};
openfl._internal.renderer.canvas.CanvasGraphics.render = function(graphics,renderSession) {
	if(graphics.__dirty) {
		openfl._internal.renderer.canvas.CanvasGraphics.bounds = graphics.__bounds;
		openfl._internal.renderer.canvas.CanvasGraphics.hasFill = false;
		openfl._internal.renderer.canvas.CanvasGraphics.hasStroke = false;
		openfl._internal.renderer.canvas.CanvasGraphics.inPath = false;
		openfl._internal.renderer.canvas.CanvasGraphics.positionX = 0;
		openfl._internal.renderer.canvas.CanvasGraphics.positionY = 0;
		if(!graphics.__visible || graphics.__commands.length == 0 || openfl._internal.renderer.canvas.CanvasGraphics.bounds == null || openfl._internal.renderer.canvas.CanvasGraphics.bounds.width == 0 || openfl._internal.renderer.canvas.CanvasGraphics.bounds.height == 0) {
			graphics.__canvas = null;
			graphics.__context = null;
		} else {
			if(graphics.__canvas == null) {
				graphics.__canvas = window.document.createElement("canvas");
				graphics.__context = graphics.__canvas.getContext("2d");
			}
			openfl._internal.renderer.canvas.CanvasGraphics.context = graphics.__context;
			graphics.__canvas.width = Math.ceil(openfl._internal.renderer.canvas.CanvasGraphics.bounds.width);
			graphics.__canvas.height = Math.ceil(openfl._internal.renderer.canvas.CanvasGraphics.bounds.height);
			var offsetX = openfl._internal.renderer.canvas.CanvasGraphics.bounds.x;
			var offsetY = openfl._internal.renderer.canvas.CanvasGraphics.bounds.y;
			var bitmapFill = null;
			var bitmapRepeat = false;
			var _g = 0;
			var _g1 = graphics.__commands;
			try {
				while(_g < _g1.length) {
					var command = _g1[_g];
					++_g;
					switch(command[1]) {
					case 0:
						var smooth = command[5];
						var repeat = command[4];
						var matrix = command[3];
						var bitmap = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.closePath(false);
						if(bitmap != bitmapFill || repeat != bitmapRepeat) {
							bitmapFill = bitmap;
							bitmapRepeat = repeat;
							openfl._internal.renderer.canvas.CanvasGraphics.pattern = null;
							openfl._internal.renderer.canvas.CanvasGraphics.setFill = false;
							bitmap.__sync();
						}
						if(matrix != null) {
							openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix = matrix;
							openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix = new openfl.geom.Matrix(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
							openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.invert();
						} else {
							openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix = null;
							openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix = null;
						}
						openfl._internal.renderer.canvas.CanvasGraphics.hasFill = true;
						break;
					case 1:
						var alpha = command[3];
						var rgb = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.closePath(false);
						if(alpha == 1) openfl._internal.renderer.canvas.CanvasGraphics.context.fillStyle = "#" + StringTools.hex(rgb,6); else {
							var r = (rgb & 16711680) >>> 16;
							var g = (rgb & 65280) >>> 8;
							var b = rgb & 255;
							openfl._internal.renderer.canvas.CanvasGraphics.context.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
						}
						bitmapFill = null;
						openfl._internal.renderer.canvas.CanvasGraphics.setFill = true;
						openfl._internal.renderer.canvas.CanvasGraphics.hasFill = true;
						break;
					case 2:
						var y = command[7];
						var x = command[6];
						var cy2 = command[5];
						var cx2 = command[4];
						var cy1 = command[3];
						var cx1 = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.context.bezierCurveTo(cx1 - offsetX,cy1 - offsetY,cx2 - offsetX,cy2 - offsetY,x - offsetX,y - offsetY);
						openfl._internal.renderer.canvas.CanvasGraphics.positionX = x;
						openfl._internal.renderer.canvas.CanvasGraphics.positionY = y;
						break;
					case 3:
						var y1 = command[5];
						var x1 = command[4];
						var cy = command[3];
						var cx = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.context.quadraticCurveTo(cx - offsetX,cy - offsetY,x1 - offsetX,y1 - offsetY);
						openfl._internal.renderer.canvas.CanvasGraphics.positionX = x1;
						openfl._internal.renderer.canvas.CanvasGraphics.positionY = y1;
						break;
					case 4:
						var radius = command[4];
						var y2 = command[3];
						var x2 = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.context.moveTo(x2 - offsetX + radius,y2 - offsetY);
						openfl._internal.renderer.canvas.CanvasGraphics.context.arc(x2 - offsetX,y2 - offsetY,radius,0,Math.PI * 2,true);
						break;
					case 5:
						var height = command[5];
						var width = command[4];
						var y3 = command[3];
						var x3 = command[2];
						x3 -= offsetX;
						y3 -= offsetY;
						var kappa = .5522848;
						var ox = width / 2 * kappa;
						var oy = height / 2 * kappa;
						var xe = x3 + width;
						var ye = y3 + height;
						var xm = x3 + width / 2;
						var ym = y3 + height / 2;
						openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.context.moveTo(x3,ym);
						openfl._internal.renderer.canvas.CanvasGraphics.context.bezierCurveTo(x3,ym - oy,xm - ox,y3,xm,y3);
						openfl._internal.renderer.canvas.CanvasGraphics.context.bezierCurveTo(xm + ox,y3,xe,ym - oy,xe,ym);
						openfl._internal.renderer.canvas.CanvasGraphics.context.bezierCurveTo(xe,ym + oy,xm + ox,ye,xm,ye);
						openfl._internal.renderer.canvas.CanvasGraphics.context.bezierCurveTo(xm - ox,ye,x3,ym + oy,x3,ym);
						break;
					case 6:
						var height1 = command[5];
						var width1 = command[4];
						var y4 = command[3];
						var x4 = command[2];
						var optimizationUsed = false;
						if(bitmapFill != null) {
							var st = 0;
							var sr = 0;
							var sb = 0;
							var sl = 0;
							var canOptimizeMatrix = true;
							if(openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix != null) {
								if(openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.b != 0 || openfl._internal.renderer.canvas.CanvasGraphics.pendingMatrix.c != 0) canOptimizeMatrix = false; else {
									var stl = openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.transformPoint(new openfl.geom.Point(x4,y4));
									var sbr = openfl._internal.renderer.canvas.CanvasGraphics.inversePendingMatrix.transformPoint(new openfl.geom.Point(x4 + width1,y4 + height1));
									st = stl.y;
									sl = stl.x;
									sb = sbr.y;
									sr = sbr.x;
								}
							} else {
								st = y4;
								sl = x4;
								sb = y4 + height1;
								sr = x4 + width1;
							}
							if(canOptimizeMatrix && st >= 0 && sl >= 0 && sr <= bitmapFill.width && sb <= bitmapFill.height) {
								optimizationUsed = true;
								openfl._internal.renderer.canvas.CanvasGraphics.context.drawImage(bitmapFill.__image.get_src(),sl,st,sr - sl,sb - st,x4 - offsetX,y4 - offsetY,width1,height1);
							}
						}
						if(!optimizationUsed) {
							openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
							openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
							openfl._internal.renderer.canvas.CanvasGraphics.context.rect(x4 - offsetX,y4 - offsetY,width1,height1);
						}
						break;
					case 7:
						var ry = command[7];
						var rx = command[6];
						var height2 = command[5];
						var width2 = command[4];
						var y5 = command[3];
						var x5 = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.drawRoundRect(x5 - offsetX,y5 - offsetY,width2,height2,rx,ry);
						break;
					case 8:
						var count = command[6];
						var flags = command[5];
						var smooth1 = command[4];
						var tileData = command[3];
						var sheet = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.closePath(false);
						var useScale = (flags & 1) > 0;
						var useRotation = (flags & 2) > 0;
						var useTransform = (flags & 16) > 0;
						var useRGB = (flags & 4) > 0;
						var useAlpha = (flags & 8) > 0;
						var useRect = (flags & 32) > 0;
						var useOrigin = (flags & 64) > 0;
						var useBlendAdd = (flags & 65536) > 0;
						if(useTransform) {
							useScale = false;
							useRotation = false;
						}
						var scaleIndex = 0;
						var rotationIndex = 0;
						var rgbIndex = 0;
						var alphaIndex = 0;
						var transformIndex = 0;
						var numValues = 3;
						if(useRect) if(useOrigin) numValues = 8; else numValues = 6;
						if(useScale) {
							scaleIndex = numValues;
							numValues++;
						}
						if(useRotation) {
							rotationIndex = numValues;
							numValues++;
						}
						if(useTransform) {
							transformIndex = numValues;
							numValues += 4;
						}
						if(useRGB) {
							rgbIndex = numValues;
							numValues += 3;
						}
						if(useAlpha) {
							alphaIndex = numValues;
							numValues++;
						}
						var totalCount = tileData.length;
						if(count >= 0 && totalCount > count) totalCount = count;
						var itemCount = totalCount / numValues | 0;
						var index = 0;
						var rect = null;
						var center = null;
						var previousTileID = -1;
						var surface;
						sheet.__bitmap.__sync();
						surface = sheet.__bitmap.__image.get_src();
						if(useBlendAdd) openfl._internal.renderer.canvas.CanvasGraphics.context.globalCompositeOperation = "lighter";
						while(index < totalCount) {
							var tileID;
							if(!useRect) tileID = tileData[index + 2] | 0; else tileID = -1;
							if(!useRect && tileID != previousTileID) {
								rect = sheet.__tileRects[tileID];
								center = sheet.__centerPoints[tileID];
								previousTileID = tileID;
							} else if(useRect) {
								rect = sheet.__rectTile;
								rect.setTo(tileData[index + 2],tileData[index + 3],tileData[index + 4],tileData[index + 5]);
								center = sheet.__point;
								if(useOrigin) {
									center.x = tileData[index + 6];
									center.y = tileData[index + 7];
								} else {
									center.x = 0;
									center.y = 0;
								}
							}
							if(rect != null && rect.width > 0 && rect.height > 0 && center != null) {
								openfl._internal.renderer.canvas.CanvasGraphics.context.save();
								openfl._internal.renderer.canvas.CanvasGraphics.context.translate(tileData[index],tileData[index + 1]);
								if(useRotation) openfl._internal.renderer.canvas.CanvasGraphics.context.rotate(tileData[index + rotationIndex]);
								var scale = 1.0;
								if(useScale) scale = tileData[index + scaleIndex];
								if(useTransform) openfl._internal.renderer.canvas.CanvasGraphics.context.transform(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
								if(useAlpha) openfl._internal.renderer.canvas.CanvasGraphics.context.globalAlpha = tileData[index + alphaIndex];
								openfl._internal.renderer.canvas.CanvasGraphics.context.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
								openfl._internal.renderer.canvas.CanvasGraphics.context.restore();
							}
							index += numValues;
						}
						if(useBlendAdd) openfl._internal.renderer.canvas.CanvasGraphics.context.globalCompositeOperation = "source-over";
						break;
					case 10:
						openfl._internal.renderer.canvas.CanvasGraphics.closePath(true);
						break;
					case 11:
						var miterLimit = command[9];
						var joints = command[8];
						var caps = command[7];
						var scaleMode = command[6];
						var pixelHinting = command[5];
						var alpha1 = command[4];
						var color = command[3];
						var thickness = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.closePath(false);
						if(thickness == null) openfl._internal.renderer.canvas.CanvasGraphics.hasStroke = false; else {
							openfl._internal.renderer.canvas.CanvasGraphics.context.lineWidth = thickness;
							if(joints == null) openfl._internal.renderer.canvas.CanvasGraphics.context.lineJoin = "round"; else openfl._internal.renderer.canvas.CanvasGraphics.context.lineJoin = Std.string(joints).toLowerCase();
							if(caps == null) openfl._internal.renderer.canvas.CanvasGraphics.context.lineCap = "round"; else switch(caps[1]) {
							case 0:
								openfl._internal.renderer.canvas.CanvasGraphics.context.lineCap = "butt";
								break;
							default:
								openfl._internal.renderer.canvas.CanvasGraphics.context.lineCap = Std.string(caps).toLowerCase();
							}
							if(miterLimit == null) openfl._internal.renderer.canvas.CanvasGraphics.context.miterLimit = 3; else openfl._internal.renderer.canvas.CanvasGraphics.context.miterLimit = miterLimit;
							if(alpha1 == 1) if(color == null) openfl._internal.renderer.canvas.CanvasGraphics.context.strokeStyle = "#000000"; else openfl._internal.renderer.canvas.CanvasGraphics.context.strokeStyle = "#" + StringTools.hex(color & 16777215,6); else {
								var r1 = (color & 16711680) >>> 16;
								var g1 = (color & 65280) >>> 8;
								var b1 = color & 255;
								if(color == null) openfl._internal.renderer.canvas.CanvasGraphics.context.strokeStyle = "#000000"; else openfl._internal.renderer.canvas.CanvasGraphics.context.strokeStyle = "rgba(" + r1 + ", " + g1 + ", " + b1 + ", " + alpha1 + ")";
							}
							openfl._internal.renderer.canvas.CanvasGraphics.hasStroke = true;
						}
						break;
					case 12:
						var y6 = command[3];
						var x6 = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.beginPatternFill(bitmapFill,bitmapRepeat);
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x6 - offsetX,y6 - offsetY);
						openfl._internal.renderer.canvas.CanvasGraphics.positionX = x6;
						openfl._internal.renderer.canvas.CanvasGraphics.positionY = y6;
						break;
					case 13:
						var y7 = command[3];
						var x7 = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.beginPath();
						openfl._internal.renderer.canvas.CanvasGraphics.context.moveTo(x7 - offsetX,y7 - offsetY);
						openfl._internal.renderer.canvas.CanvasGraphics.positionX = x7;
						openfl._internal.renderer.canvas.CanvasGraphics.positionY = y7;
						break;
					case 9:
						var culling = command[5];
						var uvtData = command[4];
						var indices = command[3];
						var vertices = command[2];
						openfl._internal.renderer.canvas.CanvasGraphics.closePath(false);
						var v = vertices;
						var ind = indices;
						var uvt = uvtData;
						var pattern = null;
						var colorFill = bitmapFill == null;
						if(colorFill && uvt != null) throw "__break__";
						if(!colorFill) {
							if(uvtData == null) {
								var this1;
								this1 = new openfl.VectorData();
								var this2;
								this2 = new Array(0);
								this1.data = this2;
								this1.length = 0;
								this1.fixed = false;
								uvtData = this1;
								var _g3 = 0;
								var _g2 = v.length / 2 | 0;
								while(_g3 < _g2) {
									var i = _g3++;
									if(!uvtData.fixed) {
										uvtData.length++;
										if(uvtData.data.length < uvtData.length) {
											var data;
											var this3;
											this3 = new Array(uvtData.data.length + 10);
											data = this3;
											haxe.ds._Vector.Vector_Impl_.blit(uvtData.data,0,data,0,uvtData.data.length);
											uvtData.data = data;
										}
										uvtData.data[uvtData.length - 1] = v.data[i * 2] / bitmapFill.width;
									}
									uvtData.length;
									if(!uvtData.fixed) {
										uvtData.length++;
										if(uvtData.data.length < uvtData.length) {
											var data1;
											var this4;
											this4 = new Array(uvtData.data.length + 10);
											data1 = this4;
											haxe.ds._Vector.Vector_Impl_.blit(uvtData.data,0,data1,0,uvtData.data.length);
											uvtData.data = data1;
										}
										uvtData.data[uvtData.length - 1] = v.data[i * 2 + 1] / bitmapFill.height;
									}
									uvtData.length;
								}
							}
							var skipT = uvtData.length != v.length;
							var normalizedUvt = openfl._internal.renderer.canvas.CanvasGraphics.normalizeUvt(uvtData,skipT);
							var maxUvt = normalizedUvt.max;
							uvt = normalizedUvt.uvt;
							if(maxUvt > 1) pattern = openfl._internal.renderer.canvas.CanvasGraphics.createTempPatternCanvas(bitmapFill,bitmapRepeat,openfl._internal.renderer.canvas.CanvasGraphics.bounds.width,openfl._internal.renderer.canvas.CanvasGraphics.bounds.height); else pattern = openfl._internal.renderer.canvas.CanvasGraphics.createTempPatternCanvas(bitmapFill,bitmapRepeat,bitmapFill.width,bitmapFill.height);
						}
						var i1 = 0;
						var l = ind.length;
						var a;
						var b2;
						var c;
						var iax;
						var iay;
						var ibx;
						var iby;
						var icx;
						var icy;
						var x11;
						var y11;
						var x21;
						var y21;
						var x31;
						var y31;
						var uvx1;
						var uvy1;
						var uvx2;
						var uvy2;
						var uvx3;
						var uvy3;
						var denom;
						var t1;
						var t2;
						var t3;
						var t4;
						var dx;
						var dy;
						while(i1 < l) {
							a = i1;
							b2 = i1 + 1;
							c = i1 + 2;
							iax = ind.data[a] * 2;
							iay = ind.data[a] * 2 + 1;
							ibx = ind.data[b2] * 2;
							iby = ind.data[b2] * 2 + 1;
							icx = ind.data[c] * 2;
							icy = ind.data[c] * 2 + 1;
							x11 = v.data[iax];
							y11 = v.data[iay];
							x21 = v.data[ibx];
							y21 = v.data[iby];
							x31 = v.data[icx];
							y31 = v.data[icy];
							switch(culling[1]) {
							case 2:
								if(!((x21 - x11) * (y31 - y11) - (y21 - y11) * (x31 - x11) < 0)) {
									i1 += 3;
									continue;
								}
								break;
							case 0:
								if((x21 - x11) * (y31 - y11) - (y21 - y11) * (x31 - x11) < 0) {
									i1 += 3;
									continue;
								}
								break;
							default:
							}
							if(colorFill) {
								openfl._internal.renderer.canvas.CanvasGraphics.context.beginPath();
								openfl._internal.renderer.canvas.CanvasGraphics.context.moveTo(x11,y11);
								openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x21,y21);
								openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x31,y31);
								openfl._internal.renderer.canvas.CanvasGraphics.context.closePath();
								openfl._internal.renderer.canvas.CanvasGraphics.context.fill();
								i1 += 3;
								continue;
							}
							openfl._internal.renderer.canvas.CanvasGraphics.context.save();
							openfl._internal.renderer.canvas.CanvasGraphics.context.beginPath();
							openfl._internal.renderer.canvas.CanvasGraphics.context.moveTo(x11,y11);
							openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x21,y21);
							openfl._internal.renderer.canvas.CanvasGraphics.context.lineTo(x31,y31);
							openfl._internal.renderer.canvas.CanvasGraphics.context.closePath();
							openfl._internal.renderer.canvas.CanvasGraphics.context.clip();
							uvx1 = uvt.data[iax] * pattern.width;
							uvx2 = uvt.data[ibx] * pattern.width;
							uvx3 = uvt.data[icx] * pattern.width;
							uvy1 = uvt.data[iay] * pattern.height;
							uvy2 = uvt.data[iby] * pattern.height;
							uvy3 = uvt.data[icy] * pattern.height;
							denom = uvx1 * (uvy3 - uvy2) - uvx2 * uvy3 + uvx3 * uvy2 + (uvx2 - uvx3) * uvy1;
							if(denom == 0) {
								i1 += 3;
								continue;
							}
							t1 = -(uvy1 * (x31 - x21) - uvy2 * x31 + uvy3 * x21 + (uvy2 - uvy3) * x11) / denom;
							t2 = (uvy2 * y31 + uvy1 * (y21 - y31) - uvy3 * y21 + (uvy3 - uvy2) * y11) / denom;
							t3 = (uvx1 * (x31 - x21) - uvx2 * x31 + uvx3 * x21 + (uvx2 - uvx3) * x11) / denom;
							t4 = -(uvx2 * y31 + uvx1 * (y21 - y31) - uvx3 * y21 + (uvx3 - uvx2) * y11) / denom;
							dx = (uvx1 * (uvy3 * x21 - uvy2 * x31) + uvy1 * (uvx2 * x31 - uvx3 * x21) + (uvx3 * uvy2 - uvx2 * uvy3) * x11) / denom;
							dy = (uvx1 * (uvy3 * y21 - uvy2 * y31) + uvy1 * (uvx2 * y31 - uvx3 * y21) + (uvx3 * uvy2 - uvx2 * uvy3) * y11) / denom;
							openfl._internal.renderer.canvas.CanvasGraphics.context.transform(t1,t2,t3,t4,dx,dy);
							openfl._internal.renderer.canvas.CanvasGraphics.context.drawImage(pattern,0,0);
							openfl._internal.renderer.canvas.CanvasGraphics.context.restore();
							i1 += 3;
						}
						break;
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
		}
		graphics.__dirty = false;
		openfl._internal.renderer.canvas.CanvasGraphics.closePath(false);
	}
};
openfl._internal.renderer.canvas.CanvasGraphics.createTempPatternCanvas = function(bitmap,repeat,width,height) {
	var canvas = window.document.createElement("canvas");
	var context = canvas.getContext("2d");
	canvas.width = Math.ceil(width);
	canvas.height = Math.ceil(height);
	context.fillStyle = context.createPattern(bitmap.__image.get_src(),repeat?"repeat":"no-repeat");
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(0,height);
	context.lineTo(width,height);
	context.lineTo(width,0);
	context.lineTo(0,0);
	context.closePath();
	context.fill();
	return canvas;
};
openfl._internal.renderer.canvas.CanvasGraphics.normalizeUvt = function(uvt,skipT) {
	if(skipT == null) skipT = false;
	var max = Math.NEGATIVE_INFINITY;
	var tmp = Math.NEGATIVE_INFINITY;
	var len = uvt.length;
	var _g1 = 1;
	var _g = len + 1;
	while(_g1 < _g) {
		var t = _g1++;
		if(skipT && t % 3 == 0) continue;
		tmp = uvt.data[t - 1];
		if(max < tmp) max = tmp;
	}
	var result;
	var this1;
	this1 = new openfl.VectorData();
	var this2;
	this2 = new Array(0);
	this1.data = this2;
	this1.length = 0;
	this1.fixed = false;
	result = this1;
	var _g11 = 1;
	var _g2 = len + 1;
	while(_g11 < _g2) {
		var t1 = _g11++;
		if(skipT && t1 % 3 == 0) continue;
		if(!result.fixed) {
			result.length++;
			if(result.data.length < result.length) {
				var data;
				var this3;
				this3 = new Array(result.data.length + 10);
				data = this3;
				haxe.ds._Vector.Vector_Impl_.blit(result.data,0,data,0,result.data.length);
				result.data = data;
			}
			result.data[result.length - 1] = uvt.data[t1 - 1] / max;
		}
		result.length;
	}
	return { max : max, uvt : result};
};
openfl._internal.renderer.canvas.CanvasRenderer = function(width,height,context) {
	openfl._internal.renderer.AbstractRenderer.call(this,width,height);
	this.context = context;
	this.renderSession = new openfl._internal.renderer.RenderSession();
	this.renderSession.context = context;
	this.renderSession.roundPixels = true;
	this.renderSession.renderer = this;
	this.renderSession.maskManager = new openfl._internal.renderer.canvas.MaskManager(this.renderSession);
};
$hxClasses["openfl._internal.renderer.canvas.CanvasRenderer"] = openfl._internal.renderer.canvas.CanvasRenderer;
openfl._internal.renderer.canvas.CanvasRenderer.__name__ = ["openfl","_internal","renderer","canvas","CanvasRenderer"];
openfl._internal.renderer.canvas.CanvasRenderer.__super__ = openfl._internal.renderer.AbstractRenderer;
openfl._internal.renderer.canvas.CanvasRenderer.prototype = $extend(openfl._internal.renderer.AbstractRenderer.prototype,{
	context: null
	,render: function(stage) {
		this.context.setTransform(1,0,0,1,0,0);
		this.context.globalAlpha = 1;
		if(!stage.__transparent && stage.__clearBeforeRender) {
			this.context.fillStyle = stage.__colorString;
			this.context.fillRect(0,0,stage.stageWidth,stage.stageHeight);
		} else if(stage.__transparent && stage.__clearBeforeRender) this.context.clearRect(0,0,stage.stageWidth,stage.stageHeight);
		stage.__renderCanvas(this.renderSession);
	}
	,__class__: openfl._internal.renderer.canvas.CanvasRenderer
});
openfl._internal.renderer.canvas.CanvasShape = function() { };
$hxClasses["openfl._internal.renderer.canvas.CanvasShape"] = openfl._internal.renderer.canvas.CanvasShape;
openfl._internal.renderer.canvas.CanvasShape.__name__ = ["openfl","_internal","renderer","canvas","CanvasShape"];
openfl._internal.renderer.canvas.CanvasShape.render = function(shape,renderSession) {
	if(!shape.__renderable || shape.__worldAlpha <= 0) return;
	var graphics = shape.__graphics;
	if(graphics != null) {
		openfl._internal.renderer.canvas.CanvasGraphics.render(graphics,renderSession);
		if(graphics.__canvas != null) {
			var context = renderSession.context;
			var scrollRect = shape.get_scrollRect();
			context.globalAlpha = shape.__worldAlpha;
			var transform = shape.__worldTransform;
			if(renderSession.roundPixels) context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx | 0,transform.ty | 0); else context.setTransform(transform.a,transform.b,transform.c,transform.d,transform.tx,transform.ty);
			if(scrollRect == null) context.drawImage(graphics.__canvas,graphics.__bounds.x,graphics.__bounds.y); else context.drawImage(graphics.__canvas,scrollRect.x - graphics.__bounds.x,scrollRect.y - graphics.__bounds.y,scrollRect.width,scrollRect.height,graphics.__bounds.x + scrollRect.x,graphics.__bounds.y + scrollRect.y,scrollRect.width,scrollRect.height);
		}
	}
};
openfl._internal.renderer.canvas.MaskManager = function(renderSession) {
	this.renderSession = renderSession;
};
$hxClasses["openfl._internal.renderer.canvas.MaskManager"] = openfl._internal.renderer.canvas.MaskManager;
openfl._internal.renderer.canvas.MaskManager.__name__ = ["openfl","_internal","renderer","canvas","MaskManager"];
openfl._internal.renderer.canvas.MaskManager.prototype = {
	renderSession: null
	,__class__: openfl._internal.renderer.canvas.MaskManager
};
openfl._internal.renderer.dom = {};
openfl._internal.renderer.dom.DOMRenderer = function(width,height,element) {
	openfl._internal.renderer.AbstractRenderer.call(this,width,height);
	this.element = element;
	this.renderSession = new openfl._internal.renderer.RenderSession();
	this.renderSession.element = element;
	this.renderSession.roundPixels = true;
	var prefix = (function () {
		  var styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice
			  .call(styles)
			  .join('') 
			  .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			)[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		  return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		  };
		})();
	this.renderSession.vendorPrefix = prefix.lowercase;
	if(prefix.lowercase == "webkit") this.renderSession.transformProperty = "-webkit-transform"; else this.renderSession.transformProperty = "transform";
	if(prefix.lowercase == "webkit") this.renderSession.transformOriginProperty = "-webkit-transform-origin"; else this.renderSession.transformOriginProperty = "transform-origin";
	this.renderSession.renderer = this;
};
$hxClasses["openfl._internal.renderer.dom.DOMRenderer"] = openfl._internal.renderer.dom.DOMRenderer;
openfl._internal.renderer.dom.DOMRenderer.__name__ = ["openfl","_internal","renderer","dom","DOMRenderer"];
openfl._internal.renderer.dom.DOMRenderer.applyStyle = function(displayObject,renderSession,setTransform,setAlpha,setClip) {
	var style = displayObject.__style;
	if(setTransform && displayObject.__worldTransformChanged) style.setProperty(renderSession.transformProperty,displayObject.__worldTransform.to3DString(renderSession.roundPixels),null);
	if(displayObject.__worldZ != ++renderSession.z) {
		displayObject.__worldZ = renderSession.z;
		style.setProperty("z-index",displayObject.__worldZ == null?"null":"" + displayObject.__worldZ,null);
	}
	if(setAlpha && displayObject.__worldAlphaChanged) {
		if(displayObject.__worldAlpha < 1) style.setProperty("opacity",displayObject.__worldAlpha == null?"null":"" + displayObject.__worldAlpha,null); else style.removeProperty("opacity");
	}
	if(setClip && displayObject.__worldClipChanged) {
		if(displayObject.__worldClip == null) style.removeProperty("clip"); else {
			var clip = displayObject.__worldClip.transform(displayObject.__worldTransform.clone().invert());
			style.setProperty("clip","rect(" + clip.y + "px, " + clip.get_right() + "px, " + clip.get_bottom() + "px, " + clip.x + "px)",null);
		}
	}
};
openfl._internal.renderer.dom.DOMRenderer.initializeElement = function(displayObject,element,renderSession) {
	var style = displayObject.__style = element.style;
	style.setProperty("position","absolute",null);
	style.setProperty("top","0",null);
	style.setProperty("left","0",null);
	style.setProperty(renderSession.transformOriginProperty,"0 0 0",null);
	renderSession.element.appendChild(element);
	displayObject.__worldAlphaChanged = true;
	displayObject.__worldClipChanged = true;
	displayObject.__worldTransformChanged = true;
	displayObject.__worldVisibleChanged = true;
	displayObject.__worldZ = -1;
};
openfl._internal.renderer.dom.DOMRenderer.__super__ = openfl._internal.renderer.AbstractRenderer;
openfl._internal.renderer.dom.DOMRenderer.prototype = $extend(openfl._internal.renderer.AbstractRenderer.prototype,{
	element: null
	,render: function(stage) {
		this.element.style.background = stage.__colorString;
		this.renderSession.z = 1;
		stage.__renderDOM(this.renderSession);
	}
	,__class__: openfl._internal.renderer.dom.DOMRenderer
});
openfl._internal.renderer.dom.DOMShape = function() { };
$hxClasses["openfl._internal.renderer.dom.DOMShape"] = openfl._internal.renderer.dom.DOMShape;
openfl._internal.renderer.dom.DOMShape.__name__ = ["openfl","_internal","renderer","dom","DOMShape"];
openfl._internal.renderer.dom.DOMShape.render = function(shape,renderSession) {
	var graphics = shape.__graphics;
	if(shape.stage != null && shape.__worldVisible && shape.__renderable && graphics != null) {
		if(graphics.__dirty || shape.__worldAlphaChanged || shape.__canvas == null && graphics.__canvas != null) {
			openfl._internal.renderer.canvas.CanvasGraphics.render(graphics,renderSession);
			if(graphics.__canvas != null) {
				if(shape.__canvas == null) {
					shape.__canvas = window.document.createElement("canvas");
					shape.__context = shape.__canvas.getContext("2d");
					openfl._internal.renderer.dom.DOMRenderer.initializeElement(shape,shape.__canvas,renderSession);
				}
				shape.__canvas.width = graphics.__canvas.width;
				shape.__canvas.height = graphics.__canvas.height;
				shape.__context.globalAlpha = shape.__worldAlpha;
				shape.__context.drawImage(graphics.__canvas,0,0);
			} else if(shape.__canvas != null) {
				renderSession.element.removeChild(shape.__canvas);
				shape.__canvas = null;
				shape.__style = null;
			}
		}
		if(shape.__canvas != null) {
			if(shape.__worldTransformChanged || graphics.__transformDirty) {
				graphics.__transformDirty = false;
				var transform = new openfl.geom.Matrix();
				transform.translate(graphics.__bounds.x,graphics.__bounds.y);
				transform = transform.mult(shape.__worldTransform);
				shape.__style.setProperty(renderSession.transformProperty,renderSession.roundPixels?"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + (transform.tx | 0) + ", " + (transform.ty | 0) + ", 0, 1)":"matrix3d(" + transform.a + ", " + transform.b + ", " + "0, 0, " + transform.c + ", " + transform.d + ", " + "0, 0, 0, 0, 1, 0, " + transform.tx + ", " + transform.ty + ", 0, 1)",null);
			}
			openfl._internal.renderer.dom.DOMRenderer.applyStyle(shape,renderSession,false,false,true);
		}
	} else if(shape.__canvas != null) {
		renderSession.element.removeChild(shape.__canvas);
		shape.__canvas = null;
		shape.__style = null;
	}
};
openfl._internal.renderer.opengl = {};
openfl._internal.renderer.opengl.GLRenderer = function(width,height,gl,transparent,antialias,preserveDrawingBuffer) {
	if(preserveDrawingBuffer == null) preserveDrawingBuffer = false;
	if(antialias == null) antialias = false;
	if(transparent == null) transparent = false;
	if(height == null) height = 600;
	if(width == null) width = 800;
	openfl._internal.renderer.AbstractRenderer.call(this,width,height);
	this.transparent = transparent;
	this.preserveDrawingBuffer = preserveDrawingBuffer;
	this.width = width;
	this.height = height;
	this.options = { alpha : transparent, antialias : antialias, premultipliedAlpha : transparent, stencil : true, preserveDrawingBuffer : preserveDrawingBuffer};
	this._glContextId = openfl._internal.renderer.opengl.GLRenderer.glContextId++;
	this.gl = gl;
	openfl._internal.renderer.opengl.GLRenderer.glContexts[this._glContextId] = gl;
	if(openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL == null) {
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL = new haxe.ds.EnumValueMap();
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.NORMAL,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.ADD,[gl.SRC_ALPHA,gl.DST_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.MULTIPLY,[gl.DST_COLOR,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.SCREEN,[gl.SRC_ALPHA,gl.ONE]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.ALPHA,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.DARKEN,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.DIFFERENCE,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.ERASE,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.HARDLIGHT,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.INVERT,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.LAYER,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.LIGHTEN,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.OVERLAY,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
		openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.set(openfl.display.BlendMode.SUBTRACT,[gl.ONE,gl.ONE_MINUS_SRC_ALPHA]);
	}
	this.projection = new openfl.geom.Point();
	this.projection.x = this.width / 2;
	this.projection.y = -this.height / 2;
	this.offset = new openfl.geom.Point(0,0);
	this.resize(this.width,this.height);
	this.contextLost = false;
	this.shaderManager = new openfl._internal.renderer.opengl.utils.ShaderManager(gl);
	this.spriteBatch = new openfl._internal.renderer.opengl.utils.SpriteBatch(gl);
	this.maskManager = new openfl._internal.renderer.opengl.utils.MaskManager(gl);
	this.filterManager = new openfl._internal.renderer.opengl.utils.FilterManager(gl,this.transparent);
	this.stencilManager = new openfl._internal.renderer.opengl.utils.StencilManager(gl);
	this.blendModeManager = new openfl._internal.renderer.opengl.utils.BlendModeManager(gl);
	this.renderSession = new openfl._internal.renderer.RenderSession();
	this.renderSession.gl = this.gl;
	this.renderSession.drawCount = 0;
	this.renderSession.shaderManager = this.shaderManager;
	this.renderSession.maskManager = this.maskManager;
	this.renderSession.filterManager = this.filterManager;
	this.renderSession.blendModeManager = this.blendModeManager;
	this.renderSession.spriteBatch = this.spriteBatch;
	this.renderSession.stencilManager = this.stencilManager;
	this.renderSession.renderer = this;
	gl.useProgram(this.shaderManager.defaultShader.program);
	gl.disable(gl.DEPTH_TEST);
	gl.disable(gl.CULL_FACE);
	gl.enable(gl.BLEND);
	gl.colorMask(true,true,true,this.transparent);
};
$hxClasses["openfl._internal.renderer.opengl.GLRenderer"] = openfl._internal.renderer.opengl.GLRenderer;
openfl._internal.renderer.opengl.GLRenderer.__name__ = ["openfl","_internal","renderer","opengl","GLRenderer"];
openfl._internal.renderer.opengl.GLRenderer.__super__ = openfl._internal.renderer.AbstractRenderer;
openfl._internal.renderer.opengl.GLRenderer.prototype = $extend(openfl._internal.renderer.AbstractRenderer.prototype,{
	blendModeManager: null
	,contextLost: null
	,filterManager: null
	,gl: null
	,_glContextId: null
	,maskManager: null
	,offset: null
	,options: null
	,preserveDrawingBuffer: null
	,projection: null
	,shaderManager: null
	,spriteBatch: null
	,stencilManager: null
	,transparent: null
	,render: function(stage) {
		if(this.contextLost) return;
		var gl = this.gl;
		gl.viewport(0,0,this.width,this.height);
		gl.bindFramebuffer(gl.FRAMEBUFFER,null);
		if(this.transparent) gl.clearColor(0,0,0,0); else gl.clearColor(stage.__colorSplit[0] | 0,stage.__colorSplit[1] | 0,stage.__colorSplit[2] | 0,1);
		gl.clear(gl.COLOR_BUFFER_BIT);
		this.renderDisplayObject(stage,this.projection);
	}
	,renderDisplayObject: function(displayObject,projection,buffer) {
		this.renderSession.blendModeManager.setBlendMode(openfl.display.BlendMode.NORMAL);
		this.renderSession.drawCount = 0;
		this.renderSession.currentBlendMode = null;
		this.renderSession.projection = projection;
		this.renderSession.offset = this.offset;
		this.spriteBatch.begin(this.renderSession);
		this.filterManager.begin(this.renderSession,buffer);
		displayObject.__renderGL(this.renderSession);
		this.spriteBatch.end();
	}
	,resize: function(width,height) {
		openfl._internal.renderer.AbstractRenderer.prototype.resize.call(this,width,height);
		this.gl.viewport(0,0,width,height);
		this.projection.x = width / 2;
		this.projection.y = -height / 2;
	}
	,__class__: openfl._internal.renderer.opengl.GLRenderer
});
openfl._internal.renderer.opengl.shaders = {};
openfl._internal.renderer.opengl.shaders.AbstractShader = function(gl) {
	this._UID = openfl._internal.renderer.opengl.shaders.AbstractShader.__UID++;
	this.gl = gl;
	this.program = null;
	this.attributes = [];
};
$hxClasses["openfl._internal.renderer.opengl.shaders.AbstractShader"] = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.AbstractShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","AbstractShader"];
openfl._internal.renderer.opengl.shaders.AbstractShader.compileProgram = function(gl,vertexSrc,fragmentSrc) {
	var fragmentShader = openfl._internal.renderer.opengl.shaders.AbstractShader.CompileFragmentShader(gl,fragmentSrc);
	var vertexShader = openfl._internal.renderer.opengl.shaders.AbstractShader.CompileVertexShader(gl,vertexSrc);
	var shaderProgram = gl.createProgram();
	if(fragmentShader != null && vertexShader != null) {
		gl.attachShader(shaderProgram,vertexShader);
		gl.attachShader(shaderProgram,fragmentShader);
		gl.linkProgram(shaderProgram);
		if(gl.getProgramParameter(shaderProgram,gl.LINK_STATUS) == 0) haxe.Log.trace("Could not initialize shaders",{ fileName : "AbstractShader.hx", lineNumber : 80, className : "openfl._internal.renderer.opengl.shaders.AbstractShader", methodName : "compileProgram"});
	}
	return shaderProgram;
};
openfl._internal.renderer.opengl.shaders.AbstractShader.CompileVertexShader = function(gl,shaderSrc) {
	return openfl._internal.renderer.opengl.shaders.AbstractShader._CompileShader(gl,shaderSrc,gl.VERTEX_SHADER);
};
openfl._internal.renderer.opengl.shaders.AbstractShader.CompileFragmentShader = function(gl,shaderSrc) {
	return openfl._internal.renderer.opengl.shaders.AbstractShader._CompileShader(gl,shaderSrc,gl.FRAGMENT_SHADER);
};
openfl._internal.renderer.opengl.shaders.AbstractShader._CompileShader = function(gl,shaderSrc,shaderType) {
	var src = shaderSrc.join("\n");
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader,src);
	gl.compileShader(shader);
	if(gl.getShaderParameter(shader,gl.COMPILE_STATUS) == 0) {
		haxe.Log.trace(gl.getShaderInfoLog(shader),{ fileName : "AbstractShader.hx", lineNumber : 115, className : "openfl._internal.renderer.opengl.shaders.AbstractShader", methodName : "_CompileShader"});
		return null;
	}
	return shader;
};
openfl._internal.renderer.opengl.shaders.AbstractShader.prototype = {
	attributes: null
	,aTextureCoord: null
	,aVertexPosition: null
	,colorAttribute: null
	,fragmentSrc: null
	,gl: null
	,program: null
	,projectionVector: null
	,uniforms: null
	,vertexSrc: null
	,_UID: null
	,init: function() {
		var gl = this.gl;
		var program = openfl._internal.renderer.opengl.shaders.AbstractShader.compileProgram(gl,this.vertexSrc,this.fragmentSrc);
		gl.useProgram(program);
		this.program = program;
	}
	,__class__: openfl._internal.renderer.opengl.shaders.AbstractShader
};
openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"];
	this.vertexSrc = ["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform vec3 tint;","uniform float alpha;","uniform vec3 color;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vColor = vec4(color * alpha * tint, alpha);","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader"] = openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader;
openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","ComplexPrimitiveShader"];
openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	alpha: null
	,color: null
	,offsetVector: null
	,tintColor: null
	,translationMatrix: null
	,init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		var gl = this.gl;
		this.projectionVector = gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = gl.getUniformLocation(this.program,"offsetVector");
		this.tintColor = gl.getUniformLocation(this.program,"tint");
		this.color = gl.getUniformLocation(this.program,"color");
		this.aVertexPosition = gl.getAttribLocation(this.program,"aVertexPosition");
		this.attributes = [this.aVertexPosition];
		this.translationMatrix = gl.getUniformLocation(this.program,"translationMatrix");
		this.alpha = gl.getUniformLocation(this.program,"alpha");
	}
	,__class__: openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader
});
openfl._internal.renderer.opengl.shaders.DefaultShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"];
	this.textureCount = 0;
	this.attributes = [];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.DefaultShader"] = openfl._internal.renderer.opengl.shaders.DefaultShader;
openfl._internal.renderer.opengl.shaders.DefaultShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","DefaultShader"];
openfl._internal.renderer.opengl.shaders.DefaultShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.DefaultShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	dimensions: null
	,offsetVector: null
	,textureCount: null
	,uSampler: null
	,init: function() {
		if(this.vertexSrc == null) this.vertexSrc = openfl._internal.renderer.opengl.shaders.DefaultShader.defaultVertexSrc;
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		var gl = this.gl;
		this.uSampler = gl.getUniformLocation(this.program,"uSampler");
		this.projectionVector = gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = gl.getUniformLocation(this.program,"offsetVector");
		this.dimensions = gl.getUniformLocation(this.program,"dimensions");
		this.aVertexPosition = gl.getAttribLocation(this.program,"aVertexPosition");
		this.aTextureCoord = gl.getAttribLocation(this.program,"aTextureCoord");
		this.colorAttribute = gl.getAttribLocation(this.program,"aColor");
		if(this.colorAttribute == -1) this.colorAttribute = 2;
		this.attributes = [this.aVertexPosition,this.aTextureCoord,this.colorAttribute];
		if(this.uniforms != null) {
			var $it0 = this.uniforms.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				this.uniforms.get(key).uniformLocation = gl.getUniformLocation(this.program,key);
			}
		}
		this.initUniforms();
	}
	,initSampler2D: function(uniform) {
		if(uniform.value == null || uniform.value.baseTexture == null || uniform.value.baseTexture.hasLoaded == null) return;
		var gl = this.gl;
		gl.activeTexture(Reflect.field(gl,"TEXTURE" + this.textureCount));
		gl.bindTexture(gl.TEXTURE_2D,uniform.value.baseTexture._glTextures[openfl._internal.renderer.opengl.GLRenderer.glContextId]);
		if(uniform.textureData != null) {
			var data = uniform.textureData;
			var magFilter;
			if(data.magFilter != 0) magFilter = data.magFilter; else magFilter = gl.LINEAR;
			var minFilter;
			if(data.minFilter != 0) minFilter = data.minFilter; else minFilter = gl.LINEAR;
			var wrapS;
			if(data.wrapS != 0) wrapS = data.wrapS; else wrapS = gl.CLAMP_TO_EDGE;
			var wrapT;
			if(data.wrapT != 0) wrapT = data.wrapT; else wrapT = gl.CLAMP_TO_EDGE;
			var format;
			if(data.luminance != 0) format = gl.LUMINANCE; else format = gl.RGBA;
			if(data.repeat) {
				wrapS = gl.REPEAT;
				wrapT = gl.REPEAT;
			}
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,data.flip);
			if(data.width != 0) {
				var width;
				if(data.width != 0) width = data.width; else width = 512;
				var height;
				if(data.height != 0) height = data.height; else height = 2;
				var border;
				if(data.border != 0) border = data.border; else border = 0;
				gl.texImage2D(gl.TEXTURE_2D,0,format,width,height,border,format,gl.UNSIGNED_BYTE,null);
			} else gl.texImage2D(gl.TEXTURE_2D,0,format,gl.RGBA,gl.UNSIGNED_BYTE,uniform.value.baseTexture.source);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,magFilter);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,minFilter);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,wrapS);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,wrapT);
		}
		gl.uniform1i(uniform.uniformLocation,this.textureCount);
		uniform._init = true;
		this.textureCount++;
	}
	,initUniforms: function() {
		this.textureCount = 1;
		var gl = this.gl;
		var uniform;
		if(this.uniforms == null) return;
		var $it0 = this.uniforms.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			uniform = this.uniforms.get(key);
			var type = uniform.type;
			if(type == "sampler2D") {
				uniform._init = false;
				if(uniform.value != null) this.initSampler2D(uniform);
			} else if(type == "mat2" || type == "mat3" || type == "mat4") {
				uniform.glMatrix = true;
				uniform.glValueLength = 1;
				if(type == "mat2") uniform.glFunc = $bind(gl,gl.uniformMatrix2fv); else if(type == "mat3") uniform.glFunc = $bind(gl,gl.uniformMatrix3fv); else if(type == "mat4") uniform.glFunc = $bind(gl,gl.uniformMatrix4fv);
			} else {
				uniform.glFunc = Reflect.field(gl,"uniform" + type);
				if(type == "2f" || type == "2i") uniform.glValueLength = 2; else if(type == "3f" || type == "3i") uniform.glValueLength = 3; else if(type == "4f" || type == "4i") uniform.glValueLength = 4; else uniform.glValueLength = 1;
			}
		}
	}
	,__class__: openfl._internal.renderer.opengl.shaders.DefaultShader
});
openfl._internal.renderer.opengl.shaders.DrawTrianglesShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.vertexSrc = ["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vPos;","varying vec4 vColor;","void main(void) {","   vec3 v = vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vPos = aTextureCoord;","   vColor = aColor;","}"];
	this.fragmentSrc = ["precision mediump float;","uniform sampler2D sampler;","uniform vec3 color;","uniform bool useTexture;","uniform float alpha;","varying vec2 vPos;","varying vec4 vColor;","vec4 tmp;","void main(void) {","   if(useTexture) {","       tmp = texture2D(sampler, vPos);","   } else {","       tmp = vec4(color, 1.);","   }","   float a = tmp.a * vColor.a * alpha;","   gl_FragColor = vec4(vec3((tmp.rgb * vColor.rgb) * a), a);","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.DrawTrianglesShader"] = openfl._internal.renderer.opengl.shaders.DrawTrianglesShader;
openfl._internal.renderer.opengl.shaders.DrawTrianglesShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","DrawTrianglesShader"];
openfl._internal.renderer.opengl.shaders.DrawTrianglesShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.DrawTrianglesShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	offsetVector: null
	,translationMatrix: null
	,sampler: null
	,color: null
	,useTexture: null
	,alpha: null
	,init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		this.translationMatrix = this.gl.getUniformLocation(this.program,"translationMatrix");
		this.projectionVector = this.gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = this.gl.getUniformLocation(this.program,"offsetVector");
		this.sampler = this.gl.getUniformLocation(this.program,"sampler");
		this.alpha = this.gl.getUniformLocation(this.program,"alpha");
		this.color = this.gl.getUniformLocation(this.program,"color");
		this.useTexture = this.gl.getUniformLocation(this.program,"useTexture");
		this.aVertexPosition = this.gl.getAttribLocation(this.program,"aVertexPosition");
		this.aTextureCoord = this.gl.getAttribLocation(this.program,"aTextureCoord");
		this.colorAttribute = this.gl.getAttribLocation(this.program,"aColor");
		this.attributes = [this.aVertexPosition,this.aTextureCoord,this.colorAttribute];
	}
	,__class__: openfl._internal.renderer.opengl.shaders.DrawTrianglesShader
});
openfl._internal.renderer.opengl.shaders.FastShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision lowp float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"];
	this.vertexSrc = ["attribute vec2 aVertexPosition;","attribute vec2 aPositionCoord;","attribute vec2 aScale;","attribute float aRotation;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform mat3 uMatrix;","varying vec2 vTextureCoord;","varying float vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   vec2 v;","   vec2 sv = aVertexPosition * aScale;","   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);","   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);","   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;","   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"];
	this.textureCount = 0;
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.FastShader"] = openfl._internal.renderer.opengl.shaders.FastShader;
openfl._internal.renderer.opengl.shaders.FastShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","FastShader"];
openfl._internal.renderer.opengl.shaders.FastShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.FastShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	aPositionCoord: null
	,aRotation: null
	,aScale: null
	,dimensions: null
	,offsetVector: null
	,textureCount: null
	,uMatrix: null
	,uSampler: null
	,init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		var gl = this.gl;
		this.uSampler = gl.getUniformLocation(this.program,"uSampler");
		this.projectionVector = gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = gl.getUniformLocation(this.program,"offsetVector");
		this.dimensions = gl.getUniformLocation(this.program,"dimensions");
		this.uMatrix = gl.getUniformLocation(this.program,"uMatrix");
		this.aVertexPosition = gl.getAttribLocation(this.program,"aVertexPosition");
		this.aPositionCoord = gl.getAttribLocation(this.program,"aPositionCoord");
		this.aScale = gl.getAttribLocation(this.program,"aScale");
		this.aRotation = gl.getAttribLocation(this.program,"aRotation");
		this.aTextureCoord = gl.getAttribLocation(this.program,"aTextureCoord");
		this.colorAttribute = gl.getAttribLocation(this.program,"aColor");
		if(this.colorAttribute == -1) this.colorAttribute = 2;
		this.attributes = [this.aVertexPosition,this.aPositionCoord,this.aScale,this.aRotation,this.aTextureCoord,this.colorAttribute];
	}
	,__class__: openfl._internal.renderer.opengl.shaders.FastShader
});
openfl._internal.renderer.opengl.shaders.FillShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.vertexSrc = ["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","}"];
	this.fragmentSrc = ["precision mediump float;","uniform vec3 color;","uniform float alpha;","void main(void) {","   gl_FragColor = vec4((color * alpha), alpha);","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.FillShader"] = openfl._internal.renderer.opengl.shaders.FillShader;
openfl._internal.renderer.opengl.shaders.FillShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","FillShader"];
openfl._internal.renderer.opengl.shaders.FillShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.FillShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	offsetVector: null
	,translationMatrix: null
	,alpha: null
	,color: null
	,init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		this.translationMatrix = this.gl.getUniformLocation(this.program,"translationMatrix");
		this.projectionVector = this.gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = this.gl.getUniformLocation(this.program,"offsetVector");
		this.color = this.gl.getUniformLocation(this.program,"color");
		this.alpha = this.gl.getUniformLocation(this.program,"alpha");
		this.aVertexPosition = this.gl.getAttribLocation(this.program,"aVertexPosition");
		this.attributes = [this.aVertexPosition];
	}
	,__class__: openfl._internal.renderer.opengl.shaders.FillShader
});
openfl._internal.renderer.opengl.shaders.PatternFillShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.vertexSrc = ["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform mat3 patternMatrix;","varying vec2 vPos;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vPos = (patternMatrix * vec3(aVertexPosition, 1)).xy;","}"];
	this.fragmentSrc = ["precision mediump float;","uniform float alpha;","uniform vec2 patternTL;","uniform vec2 patternBR;","uniform sampler2D sampler;","varying vec2 vPos;","void main(void) {","   vec2 pos = mix(patternTL, patternBR, vPos);","   vec4 tcol = texture2D(sampler, pos);","   gl_FragColor = vec4(tcol.rgb * alpha, tcol.a * alpha);","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.PatternFillShader"] = openfl._internal.renderer.opengl.shaders.PatternFillShader;
openfl._internal.renderer.opengl.shaders.PatternFillShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","PatternFillShader"];
openfl._internal.renderer.opengl.shaders.PatternFillShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.PatternFillShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	offsetVector: null
	,translationMatrix: null
	,patternMatrix: null
	,patternTL: null
	,patternBR: null
	,sampler: null
	,alpha: null
	,init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		this.translationMatrix = this.gl.getUniformLocation(this.program,"translationMatrix");
		this.projectionVector = this.gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = this.gl.getUniformLocation(this.program,"offsetVector");
		this.patternMatrix = this.gl.getUniformLocation(this.program,"patternMatrix");
		this.patternTL = this.gl.getUniformLocation(this.program,"patternTL");
		this.patternBR = this.gl.getUniformLocation(this.program,"patternBR");
		this.sampler = this.gl.getUniformLocation(this.program,"sampler");
		this.alpha = this.gl.getUniformLocation(this.program,"alpha");
		this.aVertexPosition = this.gl.getAttribLocation(this.program,"aVertexPosition");
		this.attributes = [this.aVertexPosition];
	}
	,__class__: openfl._internal.renderer.opengl.shaders.PatternFillShader
});
openfl._internal.renderer.opengl.shaders.PrimitiveShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"];
	this.vertexSrc = ["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform float alpha;","uniform vec3 tint;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vColor = aColor;","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.PrimitiveShader"] = openfl._internal.renderer.opengl.shaders.PrimitiveShader;
openfl._internal.renderer.opengl.shaders.PrimitiveShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","PrimitiveShader"];
openfl._internal.renderer.opengl.shaders.PrimitiveShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.PrimitiveShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	alpha: null
	,offsetVector: null
	,tintColor: null
	,translationMatrix: null
	,init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		var gl = this.gl;
		this.projectionVector = gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = gl.getUniformLocation(this.program,"offsetVector");
		this.tintColor = gl.getUniformLocation(this.program,"tint");
		this.aVertexPosition = gl.getAttribLocation(this.program,"aVertexPosition");
		this.colorAttribute = gl.getAttribLocation(this.program,"aColor");
		this.attributes = [this.aVertexPosition,this.colorAttribute];
		this.translationMatrix = gl.getUniformLocation(this.program,"translationMatrix");
		this.alpha = gl.getUniformLocation(this.program,"alpha");
	}
	,__class__: openfl._internal.renderer.opengl.shaders.PrimitiveShader
});
openfl._internal.renderer.opengl.shaders.StripShader = function(gl) {
	openfl._internal.renderer.opengl.shaders.AbstractShader.call(this,gl);
	this.fragmentSrc = ["precision mediump float;","varying vec2 vTextureCoord;","uniform float alpha;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));","}"];
	this.vertexSrc = ["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","}"];
	this.init();
};
$hxClasses["openfl._internal.renderer.opengl.shaders.StripShader"] = openfl._internal.renderer.opengl.shaders.StripShader;
openfl._internal.renderer.opengl.shaders.StripShader.__name__ = ["openfl","_internal","renderer","opengl","shaders","StripShader"];
openfl._internal.renderer.opengl.shaders.StripShader.__super__ = openfl._internal.renderer.opengl.shaders.AbstractShader;
openfl._internal.renderer.opengl.shaders.StripShader.prototype = $extend(openfl._internal.renderer.opengl.shaders.AbstractShader.prototype,{
	alpha: null
	,offsetVector: null
	,translationMatrix: null
	,uSampler: null
	,init: function() {
		openfl._internal.renderer.opengl.shaders.AbstractShader.prototype.init.call(this);
		var gl = this.gl;
		this.uSampler = gl.getUniformLocation(this.program,"uSampler");
		this.projectionVector = gl.getUniformLocation(this.program,"projectionVector");
		this.offsetVector = gl.getUniformLocation(this.program,"offsetVector");
		this.colorAttribute = gl.getAttribLocation(this.program,"aColor");
		this.aVertexPosition = gl.getAttribLocation(this.program,"aVertexPosition");
		this.aTextureCoord = gl.getAttribLocation(this.program,"aTextureCoord");
		this.attributes = [this.aVertexPosition,this.aTextureCoord];
		this.translationMatrix = gl.getUniformLocation(this.program,"translationMatrix");
		this.alpha = gl.getUniformLocation(this.program,"alpha");
	}
	,__class__: openfl._internal.renderer.opengl.shaders.StripShader
});
openfl._internal.renderer.opengl.utils = {};
openfl._internal.renderer.opengl.utils.BlendModeManager = function(gl) {
	this.gl = gl;
	this.currentBlendMode = null;
};
$hxClasses["openfl._internal.renderer.opengl.utils.BlendModeManager"] = openfl._internal.renderer.opengl.utils.BlendModeManager;
openfl._internal.renderer.opengl.utils.BlendModeManager.__name__ = ["openfl","_internal","renderer","opengl","utils","BlendModeManager"];
openfl._internal.renderer.opengl.utils.BlendModeManager.prototype = {
	currentBlendMode: null
	,gl: null
	,setBlendMode: function(blendMode) {
		if(blendMode == null) blendMode = openfl.display.BlendMode.NORMAL;
		if(this.currentBlendMode == blendMode) return false;
		this.currentBlendMode = blendMode;
		var blendModeWebGL = openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL.get(this.currentBlendMode);
		this.gl.blendFunc(blendModeWebGL[0],blendModeWebGL[1]);
		return true;
	}
	,__class__: openfl._internal.renderer.opengl.utils.BlendModeManager
};
openfl._internal.renderer.opengl.utils.DrawPath = function() {
	this.type = openfl._internal.renderer.opengl.utils.GraphicType.Polygon;
	this.points = [];
	this.isRemovable = true;
	this.fillIndex = 0;
	this.line = new openfl._internal.renderer.opengl.utils.LineStyle();
	this.fill = openfl._internal.renderer.opengl.utils.FillType.None;
};
$hxClasses["openfl._internal.renderer.opengl.utils.DrawPath"] = openfl._internal.renderer.opengl.utils.DrawPath;
openfl._internal.renderer.opengl.utils.DrawPath.__name__ = ["openfl","_internal","renderer","opengl","utils","DrawPath"];
openfl._internal.renderer.opengl.utils.DrawPath.getStack = function(graphics,gl) {
	return openfl._internal.renderer.opengl.utils.PathBuiler.build(graphics,gl);
};
openfl._internal.renderer.opengl.utils.DrawPath.prototype = {
	line: null
	,fill: null
	,fillIndex: null
	,isRemovable: null
	,points: null
	,type: null
	,update: function(line,fill,fillIndex) {
		this.updateLine(line);
		this.fill = fill;
		this.fillIndex = fillIndex;
	}
	,updateLine: function(line) {
		this.line.width = line.width;
		this.line.color = line.color & 16777215;
		if(line.alpha == null) this.line.alpha = 1; else this.line.alpha = line.alpha;
		if(line.scaleMode == null) this.line.scaleMode = openfl.display.LineScaleMode.NORMAL; else this.line.scaleMode = line.scaleMode;
		if(line.caps == null) this.line.caps = openfl.display.CapsStyle.ROUND; else this.line.caps = line.caps;
		if(line.joints == null) this.line.joints = openfl.display.JointStyle.ROUND; else this.line.joints = line.joints;
		this.line.miterLimit = line.miterLimit;
	}
	,__class__: openfl._internal.renderer.opengl.utils.DrawPath
};
openfl._internal.renderer.opengl.utils.PathBuiler = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.PathBuiler"] = openfl._internal.renderer.opengl.utils.PathBuiler;
openfl._internal.renderer.opengl.utils.PathBuiler.__name__ = ["openfl","_internal","renderer","opengl","utils","PathBuiler"];
openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = null;
openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths = null;
openfl._internal.renderer.opengl.utils.PathBuiler.__line = null;
openfl._internal.renderer.opengl.utils.PathBuiler.__fill = null;
openfl._internal.renderer.opengl.utils.PathBuiler.closePath = function() {
	var l = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length;
	if(l <= 0) return;
	if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type == openfl._internal.renderer.opengl.utils.GraphicType.Polygon && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.fill != openfl._internal.renderer.opengl.utils.FillType.None) {
		var sx = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points[0];
		var sy = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points[1];
		var ex = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points[l - 2];
		var ey = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points[l - 1];
		if(!(sx == ex && sy == ey)) {
			openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.push(sx);
			openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.push(sy);
		}
	}
};
openfl._internal.renderer.opengl.utils.PathBuiler.endFill = function() {
	openfl._internal.renderer.opengl.utils.PathBuiler.__fill = openfl._internal.renderer.opengl.utils.FillType.None;
	openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex++;
};
openfl._internal.renderer.opengl.utils.PathBuiler.moveTo = function(x,y) {
	if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
	openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
	openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
	openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Polygon;
	openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.push(x);
	openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.push(y);
	openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
};
openfl._internal.renderer.opengl.utils.PathBuiler.build = function(graphics,gl) {
	var glStack = null;
	var bounds = graphics.__bounds;
	openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths = new Array();
	openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
	openfl._internal.renderer.opengl.utils.PathBuiler.__line = new openfl._internal.renderer.opengl.utils.LineStyle();
	openfl._internal.renderer.opengl.utils.PathBuiler.__fill = openfl._internal.renderer.opengl.utils.FillType.None;
	openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex = 0;
	glStack = graphics.__glStack[openfl._internal.renderer.opengl.GLRenderer.glContextId];
	if(glStack == null) glStack = graphics.__glStack[openfl._internal.renderer.opengl.GLRenderer.glContextId] = new openfl._internal.renderer.opengl.utils.GLStack(gl);
	if(!graphics.__visible || graphics.__commands.length == 0 || bounds == null || bounds.width == 0 || bounds.height == 0) {
	} else {
		var _g = 0;
		var _g1 = graphics.__commands;
		while(_g < _g1.length) {
			var command = _g1[_g];
			++_g;
			switch(command[1]) {
			case 0:
				var smooth = command[5];
				var repeat = command[4];
				var matrix = command[3];
				var bitmap = command[2];
				openfl._internal.renderer.opengl.utils.PathBuiler.endFill();
				if(bitmap != null) openfl._internal.renderer.opengl.utils.PathBuiler.__fill = openfl._internal.renderer.opengl.utils.FillType.Texture(bitmap,matrix,repeat,smooth); else openfl._internal.renderer.opengl.utils.PathBuiler.__fill = openfl._internal.renderer.opengl.utils.FillType.None;
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) {
					if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [];
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Polygon;
					openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				}
				break;
			case 1:
				var alpha = command[3];
				var rgb = command[2];
				openfl._internal.renderer.opengl.utils.PathBuiler.endFill();
				if(alpha > 0) openfl._internal.renderer.opengl.utils.PathBuiler.__fill = openfl._internal.renderer.opengl.utils.FillType.Color(rgb & 16777215,alpha); else openfl._internal.renderer.opengl.utils.PathBuiler.__fill = openfl._internal.renderer.opengl.utils.FillType.None;
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) {
					if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [];
					openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Polygon;
					openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				}
				break;
			case 2:
				var y = command[7];
				var x = command[6];
				var cy2 = command[5];
				var cx2 = command[4];
				var cy = command[3];
				var cx = command[2];
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.moveTo(0,0);
				var n = 20;
				var dt = 0;
				var dt2 = 0;
				var dt3 = 0;
				var t2 = 0;
				var t3 = 0;
				var points = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points;
				var fromX = points[points.length - 2];
				var fromY = points[points.length - 1];
				var px = 0;
				var py = 0;
				var tmp = 0;
				var _g3 = 1;
				var _g2 = n + 1;
				while(_g3 < _g2) {
					var i = _g3++;
					tmp = i / n;
					dt = 1 - tmp;
					dt2 = dt * dt;
					dt3 = dt2 * dt;
					t2 = tmp * tmp;
					t3 = t2 * tmp;
					px = dt3 * fromX + 3 * dt2 * tmp * cx + 3 * dt * t2 * cx2 + t3 * x;
					py = dt3 * fromY + 3 * dt2 * tmp * cy + 3 * dt * t2 * cy2 + t3 * y;
					points.push(px);
					points.push(py);
				}
				break;
			case 3:
				var y1 = command[5];
				var x1 = command[4];
				var cy1 = command[3];
				var cx1 = command[2];
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.moveTo(0,0);
				var xa = 0;
				var ya = 0;
				var n1 = 20;
				var points1 = openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points;
				var fromX1 = points1[points1.length - 2];
				var fromY1 = points1[points1.length - 1];
				var px1 = 0;
				var py1 = 0;
				var tmp1 = 0;
				var _g31 = 1;
				var _g21 = n1 + 1;
				while(_g31 < _g21) {
					var i1 = _g31++;
					tmp1 = i1 / n1;
					xa = fromX1 + (cx1 - fromX1) * tmp1;
					ya = fromY1 + (cy1 - fromY1) * tmp1;
					px1 = xa + (cx1 + (x1 - cx1) * tmp1 - xa) * tmp1;
					py1 = ya + (cy1 + (y1 - cy1) * tmp1 - ya) * tmp1;
					points1.push(px1);
					points1.push(py1);
				}
				break;
			case 4:
				var radius = command[4];
				var y2 = command[3];
				var x2 = command[2];
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Circle;
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [x2,y2,radius];
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			case 5:
				var height = command[5];
				var width = command[4];
				var y3 = command[3];
				var x3 = command[2];
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Ellipse;
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [x3,y3,width,height];
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			case 6:
				var height1 = command[5];
				var width1 = command[4];
				var y4 = command[3];
				var x4 = command[2];
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Rectangle(false);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [x4,y4,width1,height1];
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			case 7:
				var ry = command[7];
				var rx = command[6];
				var height2 = command[5];
				var width2 = command[4];
				var y5 = command[3];
				var x5 = command[2];
				if(ry == -1) ry = rx;
				rx *= 0.5;
				ry *= 0.5;
				if(rx > width2 / 2) rx = width2 / 2;
				if(ry > height2 / 2) ry = height2 / 2;
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Rectangle(true);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [x5,y5,width2,height2,rx,ry];
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			case 10:
				openfl._internal.renderer.opengl.utils.PathBuiler.endFill();
				break;
			case 11:
				var miterLimit = command[9];
				var joints = command[8];
				var caps = command[7];
				var scaleMode = command[6];
				var pixelHinting = command[5];
				var alpha1 = command[4];
				var color = command[3];
				var thickness = command[2];
				openfl._internal.renderer.opengl.utils.PathBuiler.__line = new openfl._internal.renderer.opengl.utils.LineStyle();
				if(thickness == null || thickness == Math.NaN || thickness < 0) openfl._internal.renderer.opengl.utils.PathBuiler.__line.width = 0; else if(thickness == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__line.width = 1; else openfl._internal.renderer.opengl.utils.PathBuiler.__line.width = thickness;
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__line.color = color;
				openfl._internal.renderer.opengl.utils.PathBuiler.__line.alpha = alpha1;
				openfl._internal.renderer.opengl.utils.PathBuiler.__line.scaleMode = scaleMode;
				openfl._internal.renderer.opengl.utils.PathBuiler.__line.caps = caps;
				openfl._internal.renderer.opengl.utils.PathBuiler.__line.joints = joints;
				openfl._internal.renderer.opengl.utils.PathBuiler.__line.miterLimit = miterLimit;
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points = [];
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.Polygon;
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			case 12:
				var y6 = command[3];
				var x6 = command[2];
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.push(x6);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.push(y6);
				break;
			case 13:
				var y7 = command[3];
				var x7 = command[2];
				openfl._internal.renderer.opengl.utils.PathBuiler.moveTo(x7,y7);
				break;
			case 9:
				var blendMode = command[7];
				var colors = command[6];
				var culling = command[5];
				var uvtData = command[4];
				var indices = command[3];
				var vertices = command[2];
				var isColor;
				{
					var _g22 = openfl._internal.renderer.opengl.utils.PathBuiler.__fill;
					switch(_g22[1]) {
					case 1:
						isColor = true;
						break;
					default:
						isColor = false;
					}
				}
				if(isColor && uvtData != null) continue;
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				if(uvtData == null) {
					var this1;
					this1 = new openfl.VectorData();
					var this2;
					this2 = new Array(0);
					this1.data = this2;
					this1.length = 0;
					this1.fixed = false;
					uvtData = this1;
					{
						var _g23 = openfl._internal.renderer.opengl.utils.PathBuiler.__fill;
						switch(_g23[1]) {
						case 2:
							var b = _g23[2];
							var _g4 = 0;
							var _g32 = vertices.length / 2 | 0;
							while(_g4 < _g32) {
								var i2 = _g4++;
								if(!uvtData.fixed) {
									uvtData.length++;
									if(uvtData.data.length < uvtData.length) {
										var data;
										var this3;
										this3 = new Array(uvtData.data.length + 10);
										data = this3;
										haxe.ds._Vector.Vector_Impl_.blit(uvtData.data,0,data,0,uvtData.data.length);
										uvtData.data = data;
									}
									uvtData.data[uvtData.length - 1] = vertices.data[i2 * 2] / b.width;
								}
								uvtData.length;
								if(!uvtData.fixed) {
									uvtData.length++;
									if(uvtData.data.length < uvtData.length) {
										var data1;
										var this4;
										this4 = new Array(uvtData.data.length + 10);
										data1 = this4;
										haxe.ds._Vector.Vector_Impl_.blit(uvtData.data,0,data1,0,uvtData.data.length);
										uvtData.data = data1;
									}
									uvtData.data[uvtData.length - 1] = vertices.data[i2 * 2 + 1] / b.height;
								}
								uvtData.length;
							}
							break;
						default:
						}
					}
				}
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.DrawTriangles(vertices,indices,uvtData,culling,colors,blendMode);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable = false;
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			case 8:
				var count = command[6];
				var flags = command[5];
				var smooth1 = command[4];
				var tileData = command[3];
				var sheet = command[2];
				if(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable && openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.points.length == 0) openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.pop(); else openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex++;
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath = new openfl._internal.renderer.opengl.utils.DrawPath();
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.update(openfl._internal.renderer.opengl.utils.PathBuiler.__line,openfl._internal.renderer.opengl.utils.PathBuiler.__fill,openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.type = openfl._internal.renderer.opengl.utils.GraphicType.DrawTiles(sheet,tileData,smooth1,flags,count);
				openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath.isRemovable = false;
				openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths.push(openfl._internal.renderer.opengl.utils.PathBuiler.__currentPath);
				break;
			}
		}
		openfl._internal.renderer.opengl.utils.PathBuiler.closePath();
	}
	graphics.__drawPaths = openfl._internal.renderer.opengl.utils.PathBuiler.__drawPaths;
	return glStack;
};
openfl._internal.renderer.opengl.utils.LineStyle = function() {
	this.width = 0;
	this.color = 0;
	this.alpha = 1;
	this.scaleMode = openfl.display.LineScaleMode.NORMAL;
	this.caps = openfl.display.CapsStyle.ROUND;
	this.joints = openfl.display.JointStyle.ROUND;
	this.miterLimit = 3;
};
$hxClasses["openfl._internal.renderer.opengl.utils.LineStyle"] = openfl._internal.renderer.opengl.utils.LineStyle;
openfl._internal.renderer.opengl.utils.LineStyle.__name__ = ["openfl","_internal","renderer","opengl","utils","LineStyle"];
openfl._internal.renderer.opengl.utils.LineStyle.prototype = {
	width: null
	,color: null
	,alpha: null
	,scaleMode: null
	,caps: null
	,joints: null
	,miterLimit: null
	,__class__: openfl._internal.renderer.opengl.utils.LineStyle
};
openfl._internal.renderer.opengl.utils.FillType = $hxClasses["openfl._internal.renderer.opengl.utils.FillType"] = { __ename__ : true, __constructs__ : ["None","Color","Texture","Gradient"] };
openfl._internal.renderer.opengl.utils.FillType.None = ["None",0];
openfl._internal.renderer.opengl.utils.FillType.None.toString = $estr;
openfl._internal.renderer.opengl.utils.FillType.None.__enum__ = openfl._internal.renderer.opengl.utils.FillType;
openfl._internal.renderer.opengl.utils.FillType.Color = function(color,alpha) { var $x = ["Color",1,color,alpha]; $x.__enum__ = openfl._internal.renderer.opengl.utils.FillType; $x.toString = $estr; return $x; };
openfl._internal.renderer.opengl.utils.FillType.Texture = function(bitmap,matrix,repeat,smooth) { var $x = ["Texture",2,bitmap,matrix,repeat,smooth]; $x.__enum__ = openfl._internal.renderer.opengl.utils.FillType; $x.toString = $estr; return $x; };
openfl._internal.renderer.opengl.utils.FillType.Gradient = ["Gradient",3];
openfl._internal.renderer.opengl.utils.FillType.Gradient.toString = $estr;
openfl._internal.renderer.opengl.utils.FillType.Gradient.__enum__ = openfl._internal.renderer.opengl.utils.FillType;
openfl._internal.renderer.opengl.utils.FilterManager = function(gl,transparent) {
	this.transparent = transparent;
	this.filterStack = [];
	this.offsetX = 0;
	this.offsetY = 0;
	this.setContext(gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.FilterManager"] = openfl._internal.renderer.opengl.utils.FilterManager;
openfl._internal.renderer.opengl.utils.FilterManager.__name__ = ["openfl","_internal","renderer","opengl","utils","FilterManager"];
openfl._internal.renderer.opengl.utils.FilterManager.prototype = {
	buffer: null
	,colorArray: null
	,colorBuffer: null
	,defaultShader: null
	,filterStack: null
	,gl: null
	,height: null
	,indexBuffer: null
	,offsetX: null
	,offsetY: null
	,renderSession: null
	,texturePool: null
	,transparent: null
	,uvArray: null
	,uvBuffer: null
	,vertexArray: null
	,vertexBuffer: null
	,width: null
	,begin: function(renderSession,buffer) {
		this.renderSession = renderSession;
		this.defaultShader = renderSession.shaderManager.defaultShader;
		var projection = renderSession.projection;
		this.width = projection.x * 2 | 0;
		this.height = -projection.y * 2 | 0;
		this.buffer = buffer;
	}
	,initShaderBuffers: function() {
		var gl = this.gl;
		this.vertexBuffer = gl.createBuffer();
		this.uvBuffer = gl.createBuffer();
		this.colorBuffer = gl.createBuffer();
		this.indexBuffer = gl.createBuffer();
		this.vertexArray = new Float32Array([0.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0]);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.vertexArray,gl.STATIC_DRAW);
		this.uvArray = new Float32Array([0.0,0.0,1.0,0.0,0.0,1.0,1.0,1.0]);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.uvBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.uvArray,gl.STATIC_DRAW);
		this.colorArray = new Float32Array([1.0,16777215,1.0,16777215,1.0,16777215,1.0,16777215]);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.colorArray,gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,1,3,2]),gl.STATIC_DRAW);
	}
	,setContext: function(gl) {
		this.gl = gl;
		this.texturePool = [];
		this.initShaderBuffers();
	}
	,__class__: openfl._internal.renderer.opengl.utils.FilterManager
};
openfl._internal.renderer.opengl.utils.FilterTexture = function(gl,width,height,smoothing) {
	if(smoothing == null) smoothing = true;
	this.gl = gl;
	this.frameBuffer = gl.createFramebuffer();
	this.texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D,this.texture);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,smoothing?gl.LINEAR:gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,smoothing?gl.LINEAR:gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
	gl.bindFramebuffer(gl.FRAMEBUFFER,this.frameBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.texture,0);
	this.renderBuffer = gl.createRenderbuffer();
	gl.bindRenderbuffer(gl.RENDERBUFFER,this.renderBuffer);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_STENCIL_ATTACHMENT,gl.RENDERBUFFER,this.renderBuffer);
	this.resize(width,height);
};
$hxClasses["openfl._internal.renderer.opengl.utils.FilterTexture"] = openfl._internal.renderer.opengl.utils.FilterTexture;
openfl._internal.renderer.opengl.utils.FilterTexture.__name__ = ["openfl","_internal","renderer","opengl","utils","FilterTexture"];
openfl._internal.renderer.opengl.utils.FilterTexture.prototype = {
	frameBuffer: null
	,gl: null
	,renderBuffer: null
	,texture: null
	,width: null
	,height: null
	,clear: function() {
		var gl = this.gl;
		gl.clearColor(0,0,0,0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}
	,resize: function(width,height) {
		if(this.width == width && this.height == height) return;
		this.width = width;
		this.height = height;
		var gl = this.gl;
		gl.bindTexture(gl.TEXTURE_2D,this.texture);
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,width,height,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
		gl.bindRenderbuffer(gl.RENDERBUFFER,this.renderBuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_STENCIL,width,height);
	}
	,__class__: openfl._internal.renderer.opengl.utils.FilterTexture
};
openfl.geom.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["openfl.geom.Rectangle"] = openfl.geom.Rectangle;
openfl.geom.Rectangle.__name__ = ["openfl","geom","Rectangle"];
openfl.geom.Rectangle.prototype = {
	height: null
	,width: null
	,x: null
	,y: null
	,clone: function() {
		return new openfl.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,copyFrom: function(sourceRect) {
		this.x = sourceRect.x;
		this.y = sourceRect.y;
		this.width = sourceRect.width;
		this.height = sourceRect.height;
	}
	,equals: function(toCompare) {
		return toCompare != null && this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,setTo: function(xa,ya,widtha,heighta) {
		this.x = xa;
		this.y = ya;
		this.width = widtha;
		this.height = heighta;
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new openfl.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,__contract: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) return;
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x < x) this.x = x;
		if(this.y < y) this.y = y;
		if(this.get_right() > x + width) this.width = x + width - this.x;
		if(this.get_bottom() > y + height) this.height = y + height - this.y;
	}
	,__expand: function(x,y,width,height) {
		if(this.width == 0 && this.height == 0) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return;
		}
		var cacheRight = this.get_right();
		var cacheBottom = this.get_bottom();
		if(this.x > x) {
			this.x = x;
			this.width = cacheRight - x;
		}
		if(this.y > y) {
			this.y = y;
			this.height = cacheBottom - y;
		}
		if(cacheRight < x + width) this.width = x + width - this.x;
		if(cacheBottom < y + height) this.height = y + height - this.y;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,get_left: function() {
		return this.x;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,get_top: function() {
		return this.y;
	}
	,__class__: openfl.geom.Rectangle
	,__properties__: {get_top:"get_top",get_right:"get_right",get_left:"get_left",get_bottom:"get_bottom"}
};
openfl.geom.Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["openfl.geom.Point"] = openfl.geom.Point;
openfl.geom.Point.__name__ = ["openfl","geom","Point"];
openfl.geom.Point.prototype = {
	x: null
	,y: null
	,setTo: function(xa,ya) {
		this.x = xa;
		this.y = ya;
	}
	,__class__: openfl.geom.Point
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.GraphicsRenderer"] = openfl._internal.renderer.opengl.utils.GraphicsRenderer;
openfl._internal.renderer.opengl.utils.GraphicsRenderer.__name__ = ["openfl","_internal","renderer","opengl","utils","GraphicsRenderer"];
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildCircle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var rectData = path.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height;
	if(rectData.length == 3) height = width; else height = rectData[3];
	if(path.type == openfl._internal.renderer.opengl.utils.GraphicType.Ellipse) {
		width /= 2;
		height /= 2;
		x += width;
		y += height;
	}
	if(localCoords) {
		x -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
		y -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
	}
	var totalSegs = 40;
	var seg = Math.PI * 2 / totalSegs;
	var bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
	if(bucket != null) {
		var verts = bucket.verts;
		var indices = bucket.indices;
		var vertPos = verts.length / 2 | 0;
		indices.push(vertPos);
		var _g1 = 0;
		var _g = totalSegs + 1;
		while(_g1 < _g) {
			var i = _g1++;
			verts.push(x);
			verts.push(y);
			verts.push(x + Math.sin(seg * i) * width);
			verts.push(y + Math.cos(seg * i) * height);
			indices.push(vertPos++);
			indices.push(vertPos++);
		}
		indices.push(vertPos - 1);
	}
	if(path.line.width > 0) {
		var tempPoints = path.points;
		path.points = [];
		var _g11 = 0;
		var _g2 = totalSegs + 1;
		while(_g11 < _g2) {
			var i1 = _g11++;
			path.points.push(x + Math.sin(seg * i1) * width);
			path.points.push(y + Math.cos(seg * i1) * height);
		}
		openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildLine(path,bucket.line);
		path.points = tempPoints;
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildComplexPoly = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	if(path.points.length < 6) return;
	var points = path.points.slice();
	if(localCoords) {
		var _g1 = 0;
		var _g = points.length / 2 | 0;
		while(_g1 < _g) {
			var i = _g1++;
			points[i * 2] -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
			points[i * 2 + 1] -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
		}
	}
	var bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
	bucket.drawMode = glStack.gl.TRIANGLE_FAN;
	bucket.verts = points;
	var indices = bucket.indices;
	var length = points.length / 2 | 0;
	var _g2 = 0;
	while(_g2 < length) {
		var i1 = _g2++;
		indices.push(i1);
	}
	if(path.line.width > 0) openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildLine(path,bucket.line,localCoords);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildLine = function(path,bucket,localCoords) {
	if(localCoords == null) localCoords = false;
	var points = path.points;
	if(points.length == 0) return;
	if(localCoords) {
		var _g1 = 0;
		var _g = points.length / 2 | 0;
		while(_g1 < _g) {
			var i = _g1++;
			points[i * 2] -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
			points[i * 2 + 1] -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
		}
	}
	if(path.line.width % 2 > 0) {
		var _g11 = 0;
		var _g2 = points.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			points[i1] += 0.5;
		}
	}
	var firstPoint = new openfl.geom.Point(points[0],points[1]);
	var lastPoint = new openfl.geom.Point(points[points.length - 2 | 0],points[points.length - 1 | 0]);
	if(firstPoint.x == lastPoint.x && firstPoint.y == lastPoint.y) {
		points = points.slice();
		points.pop();
		points.pop();
		lastPoint = new openfl.geom.Point(points[points.length - 2 | 0],points[points.length - 1 | 0]);
		var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) * 0.5;
		var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) * 0.5;
		points.unshift(midPointY);
		points.unshift(midPointX);
		points.push(midPointX);
		points.push(midPointY);
	}
	var verts = bucket.verts;
	var indices = bucket.indices;
	var length = points.length / 2 | 0;
	var indexCount = points.length;
	var indexStart = verts.length / 6 | 0;
	var width = path.line.width / 2;
	var color = openfl._internal.renderer.opengl.utils.GraphicsRenderer.hex2rgb(path.line.color);
	var alpha = path.line.alpha;
	var r = color[0] * alpha;
	var g = color[1] * alpha;
	var b = color[2] * alpha;
	var px;
	var py;
	var p1x;
	var p1y;
	var p2x;
	var p2y;
	var p3x;
	var p3y;
	var perpx;
	var perpy;
	var perp2x;
	var perp2y;
	var perp3x;
	var perp3y;
	var a1;
	var b1;
	var c1;
	var a2;
	var b2;
	var c2;
	var denom;
	var pdist;
	var dist;
	p1x = points[0];
	p1y = points[1];
	p2x = points[2];
	p2y = points[3];
	perpx = -(p1y - p2y);
	perpy = p1x - p2x;
	dist = Math.sqrt(Math.abs(perpx * perpx + perpy * perpy));
	perpx = perpx / dist;
	perpy = perpy / dist;
	perpx = perpx * width;
	perpy = perpy * width;
	verts.push(p1x - perpx);
	verts.push(p1y - perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	verts.push(p1x + perpx);
	verts.push(p1y + perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	var _g12 = 1;
	var _g3 = length - 1;
	while(_g12 < _g3) {
		var i2 = _g12++;
		p1x = points[(i2 - 1) * 2];
		p1y = points[(i2 - 1) * 2 + 1];
		p2x = points[i2 * 2];
		p2y = points[i2 * 2 + 1];
		p3x = points[(i2 + 1) * 2];
		p3y = points[(i2 + 1) * 2 + 1];
		perpx = -(p1y - p2y);
		perpy = p1x - p2x;
		dist = Math.sqrt(Math.abs(perpx * perpx + perpy * perpy));
		perpx = perpx / dist;
		perpy = perpy / dist;
		perpx = perpx * width;
		perpy = perpy * width;
		perp2x = -(p2y - p3y);
		perp2y = p2x - p3x;
		dist = Math.sqrt(Math.abs(perp2x * perp2x + perp2y * perp2y));
		perp2x = perp2x / dist;
		perp2y = perp2y / dist;
		perp2x = perp2x * width;
		perp2y = perp2y * width;
		a1 = -perpy + p1y - (-perpy + p2y);
		b1 = -perpx + p2x - (-perpx + p1x);
		c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
		a2 = -perp2y + p3y - (-perp2y + p2y);
		b2 = -perp2x + p2x - (-perp2x + p3x);
		c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
		denom = a1 * b2 - a2 * b1;
		if(Math.abs(denom) < 0.1) {
			denom += 10.1;
			verts.push(p2x - perpx);
			verts.push(p2y - perpy);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x + perpx);
			verts.push(p2y + perpy);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			continue;
		}
		px = (b1 * c2 - b2 * c1) / denom;
		py = (a2 * c1 - a1 * c2) / denom;
		pdist = (px - p2x) * (px - p2x) + (py - p2y) + (py - p2y);
		if(pdist > 19600) {
			perp3x = perpx - perp2x;
			perp3y = perpy - perp2y;
			dist = Math.sqrt(Math.abs(perp3x * perp3x + perp3y * perp3y));
			perp3x = perp3x / dist;
			perp3y = perp3y / dist;
			perp3x = perp3x * width;
			perp3y = perp3y * width;
			verts.push(p2x - perp3x);
			verts.push(p2y - perp3y);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x + perp3x);
			verts.push(p2y + perp3y);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x - perp3x);
			verts.push(p2y - perp3y);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			indexCount++;
		} else {
			verts.push(px);
			verts.push(py);
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
			verts.push(p2x - (px - p2x));
			verts.push(p2y - (py - p2y));
			verts.push(r);
			verts.push(g);
			verts.push(b);
			verts.push(alpha);
		}
	}
	p1x = points[(length - 2) * 2];
	p1y = points[(length - 2) * 2 + 1];
	p2x = points[(length - 1) * 2];
	p2y = points[(length - 1) * 2 + 1];
	perpx = -(p1y - p2y);
	perpy = p1x - p2x;
	dist = Math.sqrt(Math.abs(perpx * perpx + perpy * perpy));
	if(!Math.isFinite(dist)) haxe.Log.trace(perpx * perpx + perpy * perpy,{ fileName : "GraphicsRenderer.hx", lineNumber : 372, className : "openfl._internal.renderer.opengl.utils.GraphicsRenderer", methodName : "buildLine"});
	perpx = perpx / dist;
	perpy = perpy / dist;
	perpx = perpx * width;
	perpy = perpy * width;
	verts.push(p2x - perpx);
	verts.push(p2y - perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	verts.push(p2x + perpx);
	verts.push(p2y + perpy);
	verts.push(r);
	verts.push(g);
	verts.push(b);
	verts.push(alpha);
	indices.push(indexStart);
	var _g4 = 0;
	while(_g4 < indexCount) {
		var i3 = _g4++;
		indices.push(indexStart++);
	}
	indices.push(indexStart - 1);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildRectangle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var rectData = path.points;
	var x = rectData[0];
	var y = rectData[1];
	var width = rectData[2];
	var height = rectData[3];
	if(localCoords) {
		x -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
		y -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
	}
	var bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
	if(bucket != null) {
		var verts = bucket.verts;
		var indices = bucket.indices;
		var vertPos = verts.length / 2 | 0;
		verts.push(x);
		verts.push(y);
		verts.push(x + width);
		verts.push(y);
		verts.push(x);
		verts.push(y + height);
		verts.push(x + width);
		verts.push(y + height);
		indices.push(vertPos);
		indices.push(vertPos);
		indices.push(vertPos + 1);
		indices.push(vertPos + 2);
		indices.push(vertPos + 3);
		indices.push(vertPos + 3);
	}
	if(path.line.width > 0) {
		var tempPoints = path.points;
		path.points = [x,y,x + width,y,x + width,y + height,x,y + height,x,y];
		openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildLine(path,bucket.line);
		path.points = tempPoints;
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildRoundedRectangle = function(path,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var points = path.points.slice();
	var x = points[0];
	var y = points[1];
	var width = points[2];
	var height = points[3];
	var radius = points[4];
	if(localCoords) {
		x -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
		y -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
	}
	var recPoints = [];
	recPoints.push(x);
	recPoints.push(y + radius);
	recPoints = recPoints.concat(openfl._internal.renderer.opengl.utils.GraphicsRenderer.quadraticBezierCurve(x,y + height - radius,x,y + height,x + radius,y + height));
	recPoints = recPoints.concat(openfl._internal.renderer.opengl.utils.GraphicsRenderer.quadraticBezierCurve(x + width - radius,y + height,x + width,y + height,x + width,y + height - radius));
	recPoints = recPoints.concat(openfl._internal.renderer.opengl.utils.GraphicsRenderer.quadraticBezierCurve(x + width,y + radius,x + width,y,x + width - radius,y));
	recPoints = recPoints.concat(openfl._internal.renderer.opengl.utils.GraphicsRenderer.quadraticBezierCurve(x + radius,y,x,y,x,y + radius));
	var bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
	if(bucket != null) {
		var verts = bucket.verts;
		var indices = bucket.indices;
		var vecPos = verts.length / 2;
		var triangles = openfl._internal.renderer.opengl.utils.PolyK.triangulate(recPoints);
		var i = 0;
		while(i < triangles.length) {
			indices.push(triangles[i] + vecPos | 0);
			indices.push(triangles[i] + vecPos | 0);
			indices.push(triangles[i + 1] + vecPos | 0);
			indices.push(triangles[i + 2] + vecPos | 0);
			indices.push(triangles[i + 2] + vecPos | 0);
			i += 3;
		}
		i = 0;
		while(i < recPoints.length) {
			verts.push(recPoints[i]);
			verts.push(recPoints[++i]);
			i++;
		}
	}
	if(path.line.width > 0) {
		var tempPoints = path.points;
		path.points = recPoints;
		openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildLine(path,bucket.line);
		path.points = tempPoints;
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildDrawTriangles = function(path,object,glStack,localCoords) {
	if(localCoords == null) localCoords = false;
	var args = path.type.slice(2);
	var vertices = args[0];
	var indices = args[1];
	var uvtData = args[2];
	var culling = args[3];
	var colors = args[4];
	var blendMode = args[5];
	var a;
	var b;
	var c;
	var d;
	var tx;
	var ty;
	if(localCoords) {
		a = 1.0;
		b = 0.0;
		c = 0.0;
		d = 1.0;
		tx = 0.0;
		ty = 0.0;
	} else {
		a = object.__worldTransform.a;
		b = object.__worldTransform.b;
		c = object.__worldTransform.c;
		d = object.__worldTransform.d;
		tx = object.__worldTransform.tx;
		ty = object.__worldTransform.ty;
	}
	var hasColors = colors != null && colors.length > 0;
	var bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
	bucket.rawVerts = true;
	bucket.glLength = indices.length;
	bucket.stride = 8;
	var vertsLength = bucket.glLength * bucket.stride;
	var verts;
	if(bucket.glVerts == null || bucket.glVerts.length < vertsLength) {
		verts = new Float32Array(vertsLength);
		bucket.glVerts = verts;
	} else verts = bucket.glVerts;
	var v0 = 0;
	var v1 = 0;
	var v2 = 0;
	var i0 = 0;
	var i1 = 0;
	var i2 = 0;
	var x0 = 0.0;
	var y0 = 0.0;
	var x1 = 0.0;
	var y1 = 0.0;
	var x2 = 0.0;
	var y2 = 0.0;
	var idx = 0;
	var color = [1.,1.,1.,1.];
	var ctmp = color;
	var _g1 = 0;
	var _g = indices.length / 3 | 0;
	while(_g1 < _g) {
		var i = _g1++;
		i0 = indices.data[i * 3];
		i1 = indices.data[i * 3 + 1];
		i2 = indices.data[i * 3 + 2];
		v0 = i0 * 2;
		v1 = i1 * 2;
		v2 = i2 * 2;
		x0 = vertices.data[v0];
		y0 = vertices.data[v0 + 1];
		x1 = vertices.data[v1];
		y1 = vertices.data[v1 + 1];
		x2 = vertices.data[v2];
		y2 = vertices.data[v2 + 1];
		if(localCoords) {
			x0 -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
			y0 -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
			x1 -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
			y1 -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
			x2 -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.x;
			y2 -= openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.y;
		}
		switch(culling[1]) {
		case 2:
			if(!((x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0) < 0)) continue;
			break;
		case 0:
			if((x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0) < 0) continue;
			break;
		default:
		}
		verts[idx++] = a * x0 + c * y0 + tx;
		verts[idx++] = b * x0 + d * y0 + ty;
		verts[idx++] = uvtData.data[v0];
		verts[idx++] = uvtData.data[v0 + 1];
		if(hasColors) {
			ctmp = openfl._internal.renderer.opengl.utils.GraphicsRenderer.hex2rgba(colors.data[i0]);
			verts[idx++] = ctmp[0];
			verts[idx++] = ctmp[1];
			verts[idx++] = ctmp[2];
			verts[idx++] = ctmp[3];
		} else {
			verts[idx++] = color[0];
			verts[idx++] = color[1];
			verts[idx++] = color[2];
			verts[idx++] = color[3];
		}
		verts[idx++] = a * x1 + c * y1 + tx;
		verts[idx++] = b * x1 + d * y1 + ty;
		verts[idx++] = uvtData.data[v1];
		verts[idx++] = uvtData.data[v1 + 1];
		if(hasColors) {
			ctmp = openfl._internal.renderer.opengl.utils.GraphicsRenderer.hex2rgba(colors.data[i1]);
			verts[idx++] = ctmp[0];
			verts[idx++] = ctmp[1];
			verts[idx++] = ctmp[2];
			verts[idx++] = ctmp[3];
		} else {
			verts[idx++] = color[0];
			verts[idx++] = color[1];
			verts[idx++] = color[2];
			verts[idx++] = color[3];
		}
		verts[idx++] = a * x2 + c * y2 + tx;
		verts[idx++] = b * x2 + d * y2 + ty;
		verts[idx++] = uvtData.data[v2];
		verts[idx++] = uvtData.data[v2 + 1];
		if(hasColors) {
			ctmp = openfl._internal.renderer.opengl.utils.GraphicsRenderer.hex2rgba(colors.data[i2]);
			verts[idx++] = ctmp[0];
			verts[idx++] = ctmp[1];
			verts[idx++] = ctmp[2];
			verts[idx++] = ctmp[3];
		} else {
			verts[idx++] = color[0];
			verts[idx++] = color[1];
			verts[idx++] = color[2];
			verts[idx++] = color[3];
		}
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.quadraticBezierCurve = function(fromX,fromY,cpX,cpY,toX,toY) {
	var xa;
	var ya;
	var xb;
	var yb;
	var x;
	var y;
	var n = 20;
	var points = [];
	var getPt = function(n1,n2,perc) {
		var diff = n2 - n1;
		return n1 + diff * perc;
	};
	var j = 0.0;
	var _g1 = 0;
	var _g = n + 1;
	while(_g1 < _g) {
		var i = _g1++;
		j = i / n;
		xa = getPt(fromX,cpX,j);
		ya = getPt(fromY,cpY,j);
		xb = getPt(cpX,toX,j);
		yb = getPt(cpY,toY,j);
		x = getPt(xa,xb,j);
		y = getPt(ya,yb,j);
		points.push(x);
		points.push(y);
	}
	return points;
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.render = function(object,renderSession) {
	var graphics = object.__graphics;
	var spritebatch = renderSession.spriteBatch;
	var dirty = graphics.__dirty;
	if(graphics.__commands.length <= 0) return;
	if(dirty) openfl._internal.renderer.opengl.utils.GraphicsRenderer.updateGraphics(object,renderSession.gl,object.cacheAsBitmap);
	if(object.cacheAsBitmap) {
		if(dirty) {
			var gl = renderSession.gl;
			var bounds = graphics.__bounds;
			var texture = graphics.__cachedTexture;
			var w = Math.floor(bounds.width + 0.5);
			var h = Math.floor(bounds.height + 0.5);
			if(texture == null) {
				texture = new openfl._internal.renderer.opengl.utils.FilterTexture(gl,w,h,false);
				graphics.__cachedTexture = texture;
			}
			texture.resize(w,h);
			gl.bindFramebuffer(gl.FRAMEBUFFER,texture.frameBuffer);
			gl.viewport(0,0,w,h);
			texture.clear();
			openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderGraphics(object,renderSession,new openfl.geom.Point(w / 2,-h / 2),true);
			gl.bindFramebuffer(gl.FRAMEBUFFER,null);
			gl.viewport(0,0,renderSession.renderer.width,renderSession.renderer.height);
		}
		if(!spritebatch.drawing) spritebatch.begin(renderSession);
		spritebatch.renderCachedGraphics(object);
	} else openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderGraphics(object,renderSession,renderSession.projection,false);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderGraphics = function(object,renderSession,projection,localCoords) {
	if(localCoords == null) localCoords = false;
	var graphics = object.__graphics;
	var gl = renderSession.gl;
	var offset = renderSession.offset;
	var glStack = graphics.__glStack[openfl._internal.renderer.opengl.GLRenderer.glContextId];
	var bucket;
	var translationMatrix;
	if(localCoords) translationMatrix = openfl.geom.Matrix.__identity; else translationMatrix = object.__worldTransform;
	var batchDrawing = renderSession.spriteBatch.drawing;
	var _g1 = 0;
	var _g = glStack.buckets.length;
	while(_g1 < _g) {
		var i = _g1++;
		batchDrawing = renderSession.spriteBatch.drawing;
		bucket = glStack.buckets[i];
		var _g2 = bucket.mode;
		switch(_g2[1]) {
		case 1:case 2:
			if(batchDrawing && !localCoords) renderSession.spriteBatch.end();
			renderSession.stencilManager.pushBucket(bucket,renderSession,projection,translationMatrix.toArray(true));
			var shader = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareShader(bucket,renderSession,object,projection,translationMatrix.toArray(false));
			openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderFill(bucket,shader,renderSession);
			renderSession.stencilManager.popBucket(object,bucket,renderSession);
			break;
		case 5:
			if(batchDrawing && !localCoords) renderSession.spriteBatch.end();
			var shader1 = openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareShader(bucket,renderSession,object,projection,null);
			openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderDrawTriangles(bucket,shader1,renderSession);
			break;
		case 6:
			if(!batchDrawing) renderSession.spriteBatch.begin(renderSession);
			openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderDrawTiles(object,bucket,renderSession);
			break;
		default:
		}
		var _g21 = 0;
		var _g3 = bucket.data;
		while(_g21 < _g3.length) {
			var data = _g3[_g21];
			++_g21;
			if(data.line != null && data.line.verts.length > 0) {
				batchDrawing = renderSession.spriteBatch.drawing;
				if(batchDrawing && !localCoords) renderSession.spriteBatch.end();
				var shader2 = renderSession.shaderManager.primitiveShader;
				renderSession.shaderManager.setShader(shader2);
				gl.uniformMatrix3fv(shader2.translationMatrix,false,translationMatrix.toArray(true));
				gl.uniform2f(shader2.projectionVector,projection.x,-projection.y);
				gl.uniform2f(shader2.offsetVector,-offset.x,-offset.y);
				gl.uniform1f(shader2.alpha,object.__worldAlpha);
				gl.bindBuffer(gl.ARRAY_BUFFER,data.line.vertsBuffer);
				gl.vertexAttribPointer(shader2.aVertexPosition,2,gl.FLOAT,false,24,0);
				gl.vertexAttribPointer(shader2.colorAttribute,4,gl.FLOAT,false,24,8);
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,data.line.indexBuffer);
				gl.drawElements(gl.TRIANGLE_STRIP,data.line.indices.length,gl.UNSIGNED_SHORT,0);
			}
		}
		batchDrawing = renderSession.spriteBatch.drawing;
		if(!batchDrawing && !localCoords) renderSession.spriteBatch.begin(renderSession);
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.updateGraphics = function(object,gl,localCoords) {
	if(localCoords == null) localCoords = false;
	var graphics = object.__graphics;
	openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectPosition.setTo(object.get_x(),object.get_y());
	openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds.copyFrom(graphics.__bounds);
	var glStack = null;
	if(graphics.__dirty) glStack = openfl._internal.renderer.opengl.utils.DrawPath.getStack(graphics,gl);
	graphics.__dirty = false;
	var _g = 0;
	var _g1 = glStack.buckets;
	while(_g < _g1.length) {
		var data = _g1[_g];
		++_g;
		data.reset();
		openfl._internal.renderer.opengl.utils.GraphicsRenderer.bucketPool.push(data);
	}
	glStack.reset();
	var _g11 = glStack.lastIndex;
	var _g2 = graphics.__drawPaths.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var path = graphics.__drawPaths[i];
		{
			var _g21 = path.type;
			switch(_g21[1]) {
			case 0:
				openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildComplexPoly(path,glStack,localCoords);
				break;
			case 1:
				var rounded = _g21[2];
				if(rounded) openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildRoundedRectangle(path,glStack,localCoords); else openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildRectangle(path,glStack,localCoords);
				break;
			case 2:case 3:
				openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildCircle(path,glStack,localCoords);
				break;
			case 4:
				openfl._internal.renderer.opengl.utils.GraphicsRenderer.buildDrawTriangles(path,object,glStack,localCoords);
				break;
			case 5:
				openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket(path,glStack);
				break;
			}
		}
		glStack.lastIndex++;
	}
	glStack.upload();
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareBucket = function(path,glStack) {
	var bucket = null;
	{
		var _g = path.fill;
		switch(_g[1]) {
		case 1:
			var a = _g[3];
			var c = _g[2];
			bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl._internal.renderer.opengl.utils.BucketMode.Fill);
			if(c == null) bucket.color = [0,0,0]; else bucket.color = [(c >> 16 & 255) / 255,(c >> 8 & 255) / 255,(c & 255) / 255];
			bucket.alpha = a;
			bucket.uploadTileBuffer = true;
			break;
		case 2:
			var s = _g[5];
			var r = _g[4];
			var m = _g[3];
			var b = _g[2];
			bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl._internal.renderer.opengl.utils.BucketMode.PatternFill);
			bucket.bitmap = b;
			bucket.textureRepeat = r;
			bucket.textureSmooth = s;
			bucket.texture = b.getTexture(glStack.gl);
			bucket.uploadTileBuffer = true;
			var tMatrix = bucket.textureMatrix;
			tMatrix.identity();
			var pMatrix;
			if(m == null) pMatrix = new openfl.geom.Matrix(); else pMatrix = new openfl.geom.Matrix(m.a,m.b,m.c,m.d,m.tx,m.ty);
			pMatrix = pMatrix.invert();
			pMatrix.__translateTransformed(new openfl.geom.Point(-openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectPosition.x,-openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectPosition.y));
			var tx = pMatrix.tx / b.width;
			var ty = pMatrix.ty / b.height;
			tMatrix.concat(pMatrix);
			bucket.textureTL.x = tx;
			bucket.textureTL.y = ty;
			bucket.textureBR.x = tx + 1;
			bucket.textureBR.y = ty + 1;
			tMatrix.scale(1 / b.width,1 / b.height);
			bucket.textureMatrix = tMatrix;
			break;
		default:
			bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.switchBucket(path.fillIndex,glStack,openfl._internal.renderer.opengl.utils.BucketMode.Line);
			bucket.uploadTileBuffer = false;
		}
	}
	{
		var _g1 = path.type;
		switch(_g1[1]) {
		case 4:
			bucket.mode = openfl._internal.renderer.opengl.utils.BucketMode.DrawTriangles;
			bucket.uploadTileBuffer = false;
			break;
		case 5:
			bucket.mode = openfl._internal.renderer.opengl.utils.BucketMode.DrawTiles;
			bucket.uploadTileBuffer = false;
			break;
		default:
		}
	}
	bucket.graphicType = path.type;
	var bucketData = bucket.getData();
	return bucketData;
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.getBucket = function(glStack,mode) {
	var b = openfl._internal.renderer.opengl.utils.GraphicsRenderer.bucketPool.pop();
	if(b == null) b = new openfl._internal.renderer.opengl.utils.GLBucket(glStack.gl);
	b.mode = mode;
	glStack.buckets.push(b);
	return b;
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.switchBucket = function(fillIndex,glStack,mode) {
	var bucket;
	if(glStack.buckets.length == 0) bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.getBucket(glStack,mode); else {
		bucket = glStack.buckets[glStack.buckets.length - 1];
		if(bucket.fillIndex != fillIndex) bucket = openfl._internal.renderer.opengl.utils.GraphicsRenderer.getBucket(glStack,mode);
	}
	bucket.dirty = true;
	bucket.fillIndex = fillIndex;
	return bucket;
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.prepareShader = function(bucket,renderSession,object,projection,translationMatrix) {
	var gl = renderSession.gl;
	var offset = renderSession.offset;
	var shader = null;
	var _g = bucket.mode;
	switch(_g[1]) {
	case 1:
		shader = renderSession.shaderManager.fillShader;
		break;
	case 2:
		shader = renderSession.shaderManager.patternFillShader;
		break;
	case 5:
		shader = renderSession.shaderManager.drawTrianglesShader;
		break;
	default:
		shader = null;
	}
	if(shader == null) return null;
	var newShader = renderSession.shaderManager.setShader(shader);
	gl.uniform2f(shader.projectionVector,projection.x,-projection.y);
	gl.uniform2f(shader.offsetVector,-offset.x,-offset.y);
	gl.uniform1f(shader.alpha,object.__worldAlpha * bucket.alpha);
	var _g1 = bucket.mode;
	switch(_g1[1]) {
	case 1:
		gl.uniformMatrix3fv(shader.translationMatrix,false,translationMatrix);
		gl.uniform3fv(shader.color,new Float32Array(bucket.color));
		break;
	case 2:
		gl.uniformMatrix3fv(shader.translationMatrix,false,translationMatrix);
		gl.uniform1i(shader.sampler,0);
		gl.uniform2f(shader.patternTL,bucket.textureTL.x,bucket.textureTL.y);
		gl.uniform2f(shader.patternBR,bucket.textureBR.x,bucket.textureBR.y);
		gl.uniformMatrix3fv(shader.patternMatrix,false,bucket.textureMatrix.toArray(false));
		break;
	case 5:
		if(bucket.texture != null) {
			gl.uniform1i(shader.useTexture,1);
			gl.uniform1i(shader.sampler,0);
		} else {
			gl.uniform1i(shader.useTexture,0);
			gl.uniform3fv(shader.color,new Float32Array(bucket.color));
		}
		break;
	default:
	}
	return shader;
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderFill = function(bucket,shader,renderSession) {
	var gl = renderSession.gl;
	if(bucket.mode == openfl._internal.renderer.opengl.utils.BucketMode.PatternFill && bucket.texture != null) openfl._internal.renderer.opengl.utils.GraphicsRenderer.bindTexture(gl,bucket);
	gl.bindBuffer(gl.ARRAY_BUFFER,bucket.tileBuffer);
	gl.vertexAttribPointer(shader.aVertexPosition,4,gl.SHORT,false,0,0);
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderDrawTriangles = function(bucket,shader,renderSession) {
	var gl = renderSession.gl;
	var _g = 0;
	var _g1 = bucket.data;
	while(_g < _g1.length) {
		var data = _g1[_g];
		++_g;
		if(data.destroyed) continue;
		if(bucket.texture == null) {
		} else openfl._internal.renderer.opengl.utils.GraphicsRenderer.bindTexture(gl,bucket);
		openfl._internal.renderer.opengl.utils.GraphicsRenderer.bindDrawTrianglesBuffer(gl,shader,data);
		gl.drawArrays(gl.TRIANGLES,data.glStart,data.glLength);
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.renderDrawTiles = function(object,bucket,renderSession) {
	var args = bucket.graphicType.slice(2);
	renderSession.spriteBatch.renderTiles(object,args[0],args[1],args[2],args[3],args[4]);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.bindDrawTrianglesBuffer = function(gl,shader,data) {
	gl.bindBuffer(gl.ARRAY_BUFFER,data.vertsBuffer);
	var stride = data.stride * 4;
	gl.vertexAttribPointer(shader.aVertexPosition,2,gl.FLOAT,false,stride,0);
	gl.vertexAttribPointer(shader.aTextureCoord,2,gl.FLOAT,false,stride,8);
	gl.vertexAttribPointer(shader.colorAttribute,4,gl.FLOAT,false,stride,16);
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.bindTexture = function(gl,bucket) {
	gl.bindTexture(gl.TEXTURE_2D,bucket.texture);
	if(bucket.textureRepeat && bucket.bitmap.__image.get_powerOfTwo()) {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
	} else {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
	}
	if(bucket.textureSmooth) {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
	} else {
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
	}
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.hex2rgb = function(hex) {
	if(hex == null) return [0,0,0]; else return [(hex >> 16 & 255) / 255,(hex >> 8 & 255) / 255,(hex & 255) / 255];
};
openfl._internal.renderer.opengl.utils.GraphicsRenderer.hex2rgba = function(hex) {
	if(hex == null) return [1,1,1,1]; else return [(hex >> 16 & 255) / 255,(hex >> 8 & 255) / 255,(hex & 255) / 255,(hex >> 24 & 255) / 255];
};
openfl._internal.renderer.opengl.utils.GLStack = function(gl) {
	this.lastIndex = 0;
	this.gl = gl;
	this.buckets = [];
	this.lastIndex = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLStack"] = openfl._internal.renderer.opengl.utils.GLStack;
openfl._internal.renderer.opengl.utils.GLStack.__name__ = ["openfl","_internal","renderer","opengl","utils","GLStack"];
openfl._internal.renderer.opengl.utils.GLStack.prototype = {
	lastIndex: null
	,buckets: null
	,gl: null
	,reset: function() {
		this.buckets = [];
		this.lastIndex = 0;
	}
	,upload: function() {
		var _g = 0;
		var _g1 = this.buckets;
		while(_g < _g1.length) {
			var bucket = _g1[_g];
			++_g;
			if(bucket.dirty) bucket.upload();
		}
	}
	,__class__: openfl._internal.renderer.opengl.utils.GLStack
};
openfl._internal.renderer.opengl.utils.GLBucket = function(gl) {
	this.uploadTileBuffer = true;
	this.textureSmooth = true;
	this.textureRepeat = false;
	this.data = [];
	this.fillIndex = 0;
	this.gl = gl;
	this.color = [0,0,0];
	this.lastIndex = 0;
	this.alpha = 1;
	this.dirty = true;
	this.mode = openfl._internal.renderer.opengl.utils.BucketMode.Fill;
	this.textureMatrix = new openfl.geom.Matrix();
	this.textureTL = new openfl.geom.Point();
	this.textureBR = new openfl.geom.Point(1,1);
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLBucket"] = openfl._internal.renderer.opengl.utils.GLBucket;
openfl._internal.renderer.opengl.utils.GLBucket.__name__ = ["openfl","_internal","renderer","opengl","utils","GLBucket"];
openfl._internal.renderer.opengl.utils.GLBucket.prototype = {
	gl: null
	,color: null
	,alpha: null
	,dirty: null
	,graphicType: null
	,lastIndex: null
	,fillIndex: null
	,mode: null
	,data: null
	,bitmap: null
	,texture: null
	,textureMatrix: null
	,textureRepeat: null
	,textureSmooth: null
	,textureTL: null
	,textureBR: null
	,tileBuffer: null
	,glTile: null
	,tile: null
	,uploadTileBuffer: null
	,getData: function() {
		var result = null;
		var remove = false;
		var _g = 0;
		var _g1 = this.data;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d.destroyed) {
				result = d;
				remove = true;
				break;
			}
		}
		if(result == null) result = new openfl._internal.renderer.opengl.utils.GLBucketData(this.gl);
		result.destroyed = false;
		result.parent = this;
		if(remove) HxOverrides.remove(this.data,result);
		this.data.push(result);
		return result;
	}
	,reset: function() {
		var _g = 0;
		var _g1 = this.data;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			d.destroy();
		}
		this.fillIndex = 0;
		this.uploadTileBuffer = true;
		this.graphicType = openfl._internal.renderer.opengl.utils.GraphicType.Polygon;
	}
	,upload: function() {
		if(this.uploadTileBuffer) {
			if(this.tileBuffer == null) {
				this.tileBuffer = this.gl.createBuffer();
				this.tile = [0,0,0,0,4096,0,1,0,0,4096,0,1,4096,4096,1,1];
				this.glTile = new Int16Array(this.tile);
			}
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.tileBuffer);
			this.gl.bufferData(this.gl.ARRAY_BUFFER,this.glTile,this.gl.STATIC_DRAW);
			this.uploadTileBuffer = false;
		}
		var _g = 0;
		var _g1 = this.data;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(!d.destroyed) d.upload();
		}
		this.dirty = false;
	}
	,__class__: openfl._internal.renderer.opengl.utils.GLBucket
};
openfl._internal.renderer.opengl.utils.GLBucketData = function(gl,initLine) {
	if(initLine == null) initLine = true;
	this.destroyed = false;
	this.rawIndices = false;
	this.stride = 0;
	this.rawVerts = false;
	this.lastVertsSize = 0;
	this.glStart = 0;
	this.glLength = 0;
	this.gl = gl;
	this.drawMode = gl.TRIANGLE_STRIP;
	this.verts = [];
	this.vertsBuffer = gl.createBuffer();
	this.indices = [];
	this.indexBuffer = gl.createBuffer();
	if(initLine) this.line = new openfl._internal.renderer.opengl.utils.GLBucketData(gl,false);
};
$hxClasses["openfl._internal.renderer.opengl.utils.GLBucketData"] = openfl._internal.renderer.opengl.utils.GLBucketData;
openfl._internal.renderer.opengl.utils.GLBucketData.__name__ = ["openfl","_internal","renderer","opengl","utils","GLBucketData"];
openfl._internal.renderer.opengl.utils.GLBucketData.prototype = {
	gl: null
	,drawMode: null
	,glLength: null
	,glStart: null
	,vertsBuffer: null
	,lastVertsSize: null
	,glVerts: null
	,verts: null
	,rawVerts: null
	,stride: null
	,indexBuffer: null
	,glIndices: null
	,indices: null
	,rawIndices: null
	,line: null
	,destroyed: null
	,parent: null
	,destroy: function() {
		this.destroyed = true;
		this.verts = [];
		this.indices = [];
		this.glLength = 0;
		this.glStart = 0;
		this.stride = 0;
		this.rawVerts = false;
		this.rawIndices = false;
		if(this.line != null) this.line.destroy();
	}
	,upload: function() {
		if(this.rawVerts && this.glVerts != null && this.glVerts.length > 0 || this.verts.length > 0) {
			if(!this.rawVerts) this.glVerts = new Float32Array(this.verts);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vertsBuffer);
			if(this.glVerts.length <= this.lastVertsSize) {
				var end = this.glLength * 4 * this.stride;
				if(this.glLength > 0 && this.lastVertsSize > end) {
					var view = this.glVerts.subarray(0,end);
					this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,view);
					view = null;
				} else this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,this.glVerts);
			} else {
				this.gl.bufferData(this.gl.ARRAY_BUFFER,this.glVerts,this.gl.STREAM_DRAW);
				this.lastVertsSize = this.glVerts.length;
			}
		}
		if(this.glLength == 0 && (this.rawIndices && this.glIndices != null && this.glIndices.length > 0 || this.indices.length > 0)) {
			if(!this.rawIndices) this.glIndices = new Uint16Array(this.indices);
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
			this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,this.glIndices,this.gl.STREAM_DRAW);
		}
		if(this.line != null) this.line.upload();
	}
	,__class__: openfl._internal.renderer.opengl.utils.GLBucketData
};
openfl._internal.renderer.opengl.utils.BucketMode = $hxClasses["openfl._internal.renderer.opengl.utils.BucketMode"] = { __ename__ : true, __constructs__ : ["None","Fill","PatternFill","Line","PatternLine","DrawTriangles","DrawTiles"] };
openfl._internal.renderer.opengl.utils.BucketMode.None = ["None",0];
openfl._internal.renderer.opengl.utils.BucketMode.None.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.None.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.BucketMode.Fill = ["Fill",1];
openfl._internal.renderer.opengl.utils.BucketMode.Fill.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.Fill.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.BucketMode.PatternFill = ["PatternFill",2];
openfl._internal.renderer.opengl.utils.BucketMode.PatternFill.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.PatternFill.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.BucketMode.Line = ["Line",3];
openfl._internal.renderer.opengl.utils.BucketMode.Line.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.Line.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.BucketMode.PatternLine = ["PatternLine",4];
openfl._internal.renderer.opengl.utils.BucketMode.PatternLine.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.PatternLine.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.BucketMode.DrawTriangles = ["DrawTriangles",5];
openfl._internal.renderer.opengl.utils.BucketMode.DrawTriangles.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.DrawTriangles.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.BucketMode.DrawTiles = ["DrawTiles",6];
openfl._internal.renderer.opengl.utils.BucketMode.DrawTiles.toString = $estr;
openfl._internal.renderer.opengl.utils.BucketMode.DrawTiles.__enum__ = openfl._internal.renderer.opengl.utils.BucketMode;
openfl._internal.renderer.opengl.utils.GLGraphicsData = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.GLGraphicsData"] = openfl._internal.renderer.opengl.utils.GLGraphicsData;
openfl._internal.renderer.opengl.utils.GLGraphicsData.__name__ = ["openfl","_internal","renderer","opengl","utils","GLGraphicsData"];
openfl._internal.renderer.opengl.utils.PolyK = function() { };
$hxClasses["openfl._internal.renderer.opengl.utils.PolyK"] = openfl._internal.renderer.opengl.utils.PolyK;
openfl._internal.renderer.opengl.utils.PolyK.__name__ = ["openfl","_internal","renderer","opengl","utils","PolyK"];
openfl._internal.renderer.opengl.utils.PolyK.triangulate = function(p) {
	var sign = true;
	var n = p.length >> 1;
	if(n < 3) return [];
	var tgs = [];
	var avl;
	var _g = [];
	var _g1 = 0;
	while(_g1 < n) {
		var i = _g1++;
		_g.push(i);
	}
	avl = _g;
	var i1 = 0;
	var al = n;
	var earFound = false;
	while(al > 3) {
		var i0 = avl[i1 % al];
		var i11 = avl[(i1 + 1) % al];
		var i2 = avl[(i1 + 2) % al];
		var ax = p[2 * i0];
		var ay = p[2 * i0 + 1];
		var bx = p[2 * i11];
		var by = p[2 * i11 + 1];
		var cx = p[2 * i2];
		var cy = p[2 * i2 + 1];
		earFound = false;
		if(openfl._internal.renderer.opengl.utils.PolyK._convex(ax,ay,bx,by,cx,cy,sign)) {
			earFound = true;
			var _g11 = 0;
			while(_g11 < al) {
				var j = _g11++;
				var vi = avl[j];
				if(vi == i0 || vi == i11 || vi == i2) continue;
				if(openfl._internal.renderer.opengl.utils.PolyK._PointInTriangle(p[2 * vi],p[2 * vi + 1],ax,ay,bx,by,cx,cy)) {
					earFound = false;
					break;
				}
			}
		}
		if(earFound) {
			tgs.push(i0);
			tgs.push(i11);
			tgs.push(i2);
			avl.splice((i1 + 1) % al,1);
			al--;
			i1 = 0;
		} else if(i1++ > 3 * al) {
			if(sign) {
				tgs = [];
				var _g12 = [];
				var _g2 = 0;
				while(_g2 < n) {
					var k = _g2++;
					_g12.push(k);
				}
				avl = _g12;
				i1 = 0;
				al = n;
				sign = false;
			} else {
				haxe.Log.trace("Warning: shape too complex to fill",{ fileName : "GraphicsRenderer.hx", lineNumber : 1506, className : "openfl._internal.renderer.opengl.utils.PolyK", methodName : "triangulate"});
				return [];
			}
		}
	}
	tgs.push(avl[0]);
	tgs.push(avl[1]);
	tgs.push(avl[2]);
	return tgs;
};
openfl._internal.renderer.opengl.utils.PolyK._PointInTriangle = function(px,py,ax,ay,bx,by,cx,cy) {
	var v0x = cx - ax | 0;
	var v0y = cy - ay | 0;
	var v1x = bx - ax | 0;
	var v1y = by - ay | 0;
	var v2x = px - ax | 0;
	var v2y = py - ay | 0;
	var dot00 = v0x * v0x + v0y * v0y;
	var dot01 = v0x * v1x + v0y * v1y;
	var dot02 = v0x * v2x + v0y * v2y;
	var dot11 = v1x * v1x + v1y * v1y;
	var dot12 = v1x * v2x + v1y * v2y;
	var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
	var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
	var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
	return u >= 0 && v >= 0 && u + v < 1;
};
openfl._internal.renderer.opengl.utils.PolyK._convex = function(ax,ay,bx,by,cx,cy,sign) {
	return (ay - by) * (cx - bx) + (bx - ax) * (cy - by) >= 0 == sign;
};
openfl._internal.renderer.opengl.utils.GraphicType = $hxClasses["openfl._internal.renderer.opengl.utils.GraphicType"] = { __ename__ : true, __constructs__ : ["Polygon","Rectangle","Circle","Ellipse","DrawTriangles","DrawTiles"] };
openfl._internal.renderer.opengl.utils.GraphicType.Polygon = ["Polygon",0];
openfl._internal.renderer.opengl.utils.GraphicType.Polygon.toString = $estr;
openfl._internal.renderer.opengl.utils.GraphicType.Polygon.__enum__ = openfl._internal.renderer.opengl.utils.GraphicType;
openfl._internal.renderer.opengl.utils.GraphicType.Rectangle = function(rounded) { var $x = ["Rectangle",1,rounded]; $x.__enum__ = openfl._internal.renderer.opengl.utils.GraphicType; $x.toString = $estr; return $x; };
openfl._internal.renderer.opengl.utils.GraphicType.Circle = ["Circle",2];
openfl._internal.renderer.opengl.utils.GraphicType.Circle.toString = $estr;
openfl._internal.renderer.opengl.utils.GraphicType.Circle.__enum__ = openfl._internal.renderer.opengl.utils.GraphicType;
openfl._internal.renderer.opengl.utils.GraphicType.Ellipse = ["Ellipse",3];
openfl._internal.renderer.opengl.utils.GraphicType.Ellipse.toString = $estr;
openfl._internal.renderer.opengl.utils.GraphicType.Ellipse.__enum__ = openfl._internal.renderer.opengl.utils.GraphicType;
openfl._internal.renderer.opengl.utils.GraphicType.DrawTriangles = function(vertices,indices,uvtData,culling,colors,blendMode) { var $x = ["DrawTriangles",4,vertices,indices,uvtData,culling,colors,blendMode]; $x.__enum__ = openfl._internal.renderer.opengl.utils.GraphicType; $x.toString = $estr; return $x; };
openfl._internal.renderer.opengl.utils.GraphicType.DrawTiles = function(sheet,tileData,smooth,flags,count) { var $x = ["DrawTiles",5,sheet,tileData,smooth,flags,count]; $x.__enum__ = openfl._internal.renderer.opengl.utils.GraphicType; $x.toString = $estr; return $x; };
openfl._internal.renderer.opengl.utils.MaskManager = function(gl) {
	this.maskStack = [];
	this.maskPosition = 0;
	this.setContext(gl);
	this.reverse = false;
	this.count = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.MaskManager"] = openfl._internal.renderer.opengl.utils.MaskManager;
openfl._internal.renderer.opengl.utils.MaskManager.__name__ = ["openfl","_internal","renderer","opengl","utils","MaskManager"];
openfl._internal.renderer.opengl.utils.MaskManager.prototype = {
	count: null
	,gl: null
	,maskPosition: null
	,maskStack: null
	,reverse: null
	,setContext: function(gl) {
		this.gl = gl;
	}
	,__class__: openfl._internal.renderer.opengl.utils.MaskManager
};
openfl._internal.renderer.opengl.utils.ShaderManager = function(gl) {
	this.maxAttibs = 10;
	this.attribState = [];
	this.tempAttribState = [];
	this.shaderMap = [];
	var _g1 = 0;
	var _g = this.maxAttibs;
	while(_g1 < _g) {
		var i = _g1++;
		this.attribState[i] = false;
	}
	this.setContext(gl);
};
$hxClasses["openfl._internal.renderer.opengl.utils.ShaderManager"] = openfl._internal.renderer.opengl.utils.ShaderManager;
openfl._internal.renderer.opengl.utils.ShaderManager.__name__ = ["openfl","_internal","renderer","opengl","utils","ShaderManager"];
openfl._internal.renderer.opengl.utils.ShaderManager.prototype = {
	attribState: null
	,complexPrimitiveShader: null
	,currentShader: null
	,defaultShader: null
	,fastShader: null
	,gl: null
	,maxAttibs: null
	,primitiveShader: null
	,fillShader: null
	,patternFillShader: null
	,drawTrianglesShader: null
	,shaderMap: null
	,stripShader: null
	,tempAttribState: null
	,_currentId: null
	,setAttribs: function(attribs) {
		var _g1 = 0;
		var _g = this.tempAttribState.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.tempAttribState[i] = false;
		}
		var _g11 = 0;
		var _g2 = attribs.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			var attribId = attribs[i1];
			this.tempAttribState[attribId] = true;
		}
		var gl = this.gl;
		var _g12 = 0;
		var _g3 = this.attribState.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			if(this.attribState[i2] != this.tempAttribState[i2]) {
				this.attribState[i2] = this.tempAttribState[i2];
				if(this.tempAttribState[i2]) gl.enableVertexAttribArray(i2); else gl.disableVertexAttribArray(i2);
			}
		}
	}
	,setContext: function(gl) {
		this.gl = gl;
		this.primitiveShader = new openfl._internal.renderer.opengl.shaders.PrimitiveShader(gl);
		this.complexPrimitiveShader = new openfl._internal.renderer.opengl.shaders.ComplexPrimitiveShader(gl);
		this.defaultShader = new openfl._internal.renderer.opengl.shaders.DefaultShader(gl);
		this.fastShader = new openfl._internal.renderer.opengl.shaders.FastShader(gl);
		this.stripShader = new openfl._internal.renderer.opengl.shaders.StripShader(gl);
		this.fillShader = new openfl._internal.renderer.opengl.shaders.FillShader(gl);
		this.patternFillShader = new openfl._internal.renderer.opengl.shaders.PatternFillShader(gl);
		this.drawTrianglesShader = new openfl._internal.renderer.opengl.shaders.DrawTrianglesShader(gl);
		this.setShader(this.defaultShader);
	}
	,setShader: function(shader) {
		if(this._currentId == shader._UID) return false;
		this._currentId = shader._UID;
		this.currentShader = shader;
		this.gl.useProgram(shader.program);
		this.setAttribs(shader.attributes);
		return true;
	}
	,__class__: openfl._internal.renderer.opengl.utils.ShaderManager
};
openfl._internal.renderer.opengl.utils.SpriteBatch = function(gl) {
	this.states = [];
	this.vertSize = 6;
	this.size = Math.floor(Math.pow(2,16) / this.vertSize);
	var numVerts = this.size * 4 * this.vertSize;
	var numIndices = this.size * 6;
	this.vertices = new Float32Array(numVerts);
	this.indices = new Uint16Array(numIndices);
	this.lastIndexCount = 0;
	var i = 0;
	var j = 0;
	while(i < numIndices) {
		this.indices[i] = j;
		this.indices[i + 1] = j + 1;
		this.indices[i + 2] = j + 2;
		this.indices[i + 3] = j;
		this.indices[i + 4] = j + 2;
		this.indices[i + 5] = j + 3;
		i += 6;
		j += 4;
	}
	this.drawing = false;
	this.currentBatchSize = 0;
	this.currentBaseTexture = null;
	this.setContext(gl);
	this.dirty = true;
	this.currentState = new openfl._internal.renderer.opengl.utils._SpriteBatch.State();
};
$hxClasses["openfl._internal.renderer.opengl.utils.SpriteBatch"] = openfl._internal.renderer.opengl.utils.SpriteBatch;
openfl._internal.renderer.opengl.utils.SpriteBatch.__name__ = ["openfl","_internal","renderer","opengl","utils","SpriteBatch"];
openfl._internal.renderer.opengl.utils.SpriteBatch.prototype = {
	states: null
	,currentState: null
	,currentBaseTexture: null
	,currentBatchSize: null
	,currentBlendMode: null
	,dirty: null
	,drawing: null
	,gl: null
	,indexBuffer: null
	,indices: null
	,lastIndexCount: null
	,renderSession: null
	,shader: null
	,size: null
	,vertexBuffer: null
	,vertices: null
	,vertSize: null
	,begin: function(renderSession) {
		this.renderSession = renderSession;
		this.shader = renderSession.shaderManager.defaultShader;
		this.drawing = true;
		this.start();
	}
	,end: function() {
		this.flush();
		this.drawing = false;
	}
	,flush: function() {
		if(this.currentBatchSize == 0) return;
		var gl = this.gl;
		this.renderSession.shaderManager.setShader(this.renderSession.shaderManager.defaultShader);
		if(this.dirty) {
			this.dirty = false;
			gl.activeTexture(gl.TEXTURE0);
			gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
			var projection = this.renderSession.projection;
			gl.uniform2f(this.shader.projectionVector,projection.x,projection.y);
			var stride = this.vertSize * 4;
			gl.vertexAttribPointer(this.shader.aVertexPosition,2,gl.FLOAT,false,stride,0);
			gl.vertexAttribPointer(this.shader.aTextureCoord,2,gl.FLOAT,false,stride,8);
			gl.vertexAttribPointer(this.shader.colorAttribute,2,gl.FLOAT,false,stride,16);
		}
		if(this.currentBatchSize > this.size * 0.5) gl.bufferSubData(gl.ARRAY_BUFFER,0,this.vertices); else {
			var view = this.vertices.subarray(0,this.currentBatchSize * 4 * this.vertSize);
			gl.bufferSubData(gl.ARRAY_BUFFER,0,view);
		}
		var nextState;
		var batchSize = 0;
		var start = 0;
		this.currentState.texture = null;
		this.currentState.textureSmooth = true;
		this.currentState.blendMode = this.renderSession.blendModeManager.currentBlendMode;
		var j = this.currentBatchSize;
		var _g = 0;
		while(_g < j) {
			var i = _g++;
			nextState = this.states[i];
			if(this.currentState.texture != nextState.texture || this.currentState.blendMode != nextState.blendMode) {
				this.renderBatch(this.currentState,batchSize,start);
				start = i;
				batchSize = 0;
				this.currentState.texture = nextState.texture;
				this.currentState.textureSmooth = nextState.textureSmooth;
				this.currentState.blendMode = nextState.blendMode;
				this.renderSession.blendModeManager.setBlendMode(this.currentState.blendMode);
			}
			batchSize++;
		}
		this.renderBatch(this.currentState,batchSize,start);
		this.currentBatchSize = 0;
	}
	,renderCachedGraphics: function(object) {
		var cachedTexture = object.__graphics.__cachedTexture;
		if(cachedTexture == null) return;
		if(this.currentBatchSize >= this.size) {
			this.flush();
			this.currentBaseTexture = cachedTexture.texture;
		}
		var alpha = object.__worldAlpha;
		var tint = 16777215;
		var aX = 0;
		var aY = 0;
		var uvs = new openfl.display.TextureUvs();
		uvs.x0 = 0;
		uvs.y0 = 1;
		uvs.x1 = 1;
		uvs.y1 = 1;
		uvs.x2 = 1;
		uvs.y2 = 0;
		uvs.x3 = 0;
		uvs.y3 = 0;
		var index = this.currentBatchSize * 4 * this.vertSize;
		var worldTransform = object.__worldTransform.clone();
		worldTransform.__translateTransformed(new openfl.geom.Point(object.__graphics.__bounds.x,object.__graphics.__bounds.y));
		this.fillVertices(index,aX,aY,cachedTexture.width,cachedTexture.height,tint,alpha,uvs,worldTransform);
		this.setState(this.currentBatchSize,cachedTexture.texture,null,object.blendMode);
		this.currentBatchSize++;
	}
	,renderTiles: function(object,sheet,tileData,smooth,flags,count) {
		if(count == null) count = -1;
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		var texture = sheet.__bitmap.getTexture(this.gl);
		if(texture == null) return;
		var useScale = (flags & 1) > 0;
		var useRotation = (flags & 2) > 0;
		var useTransform = (flags & 16) > 0;
		var useRGB = (flags & 4) > 0;
		var useAlpha = (flags & 8) > 0;
		var useRect = (flags & 32) > 0;
		var useOrigin = (flags & 64) > 0;
		var blendMode;
		var _g = flags & 983040;
		switch(_g) {
		case 65536:
			blendMode = openfl.display.BlendMode.ADD;
			break;
		case 131072:
			blendMode = openfl.display.BlendMode.MULTIPLY;
			break;
		case 262144:
			blendMode = openfl.display.BlendMode.SCREEN;
			break;
		default:
			blendMode = openfl.display.BlendMode.NORMAL;
		}
		if(useTransform) {
			useScale = false;
			useRotation = false;
		}
		var scaleIndex = 0;
		var rotationIndex = 0;
		var rgbIndex = 0;
		var alphaIndex = 0;
		var transformIndex = 0;
		var numValues = 3;
		if(useRect) if(useOrigin) numValues = 8; else numValues = 6;
		if(useScale) {
			scaleIndex = numValues;
			numValues++;
		}
		if(useRotation) {
			rotationIndex = numValues;
			numValues++;
		}
		if(useTransform) {
			transformIndex = numValues;
			numValues += 4;
		}
		if(useRGB) {
			rgbIndex = numValues;
			numValues += 3;
		}
		if(useAlpha) {
			alphaIndex = numValues;
			numValues++;
		}
		var totalCount = tileData.length;
		if(count >= 0 && totalCount > count) totalCount = count;
		var itemCount = totalCount / numValues | 0;
		var iIndex = 0;
		var tileID = -1;
		var rect = sheet.__rectTile;
		var tileUV = sheet.__rectUV;
		var center = sheet.__point;
		var x = 0.0;
		var y = 0.0;
		var alpha = 1.0;
		var tint = 16777215;
		var scale = 1.0;
		var rotation = 0.0;
		var cosTheta = 1.0;
		var sinTheta = 0.0;
		var a = 0.0;
		var b = 0.0;
		var c = 0.0;
		var d = 0.0;
		var tx = 0.0;
		var ty = 0.0;
		var ox = 0.0;
		var oy = 0.0;
		var matrix = new openfl.geom.Matrix();
		var oMatrix = object.__worldTransform;
		var uvs = new openfl.display.TextureUvs();
		var bIndex = 0;
		while(iIndex < totalCount) {
			if(this.currentBatchSize >= this.size) {
				this.flush();
				this.currentBaseTexture = texture;
			}
			x = tileData[iIndex];
			y = tileData[iIndex + 1];
			if(useRect) {
				tileID = -1;
				rect.x = tileData[iIndex + 2];
				rect.y = tileData[iIndex + 3];
				rect.width = tileData[iIndex + 4];
				rect.height = tileData[iIndex + 5];
				if(useOrigin) {
					center.x = tileData[iIndex + 6];
					center.y = tileData[iIndex + 7];
				} else {
					center.x = 0;
					center.y = 0;
				}
				tileUV.setTo(rect.get_left() / sheet.__bitmap.width,rect.get_top() / sheet.__bitmap.height,rect.get_right() / sheet.__bitmap.width,rect.get_bottom() / sheet.__bitmap.height);
			} else {
				tileID = (tileData[iIndex + 2] == null?0:tileData[iIndex + 2]) | 0;
				rect = sheet.__tileRects[tileID];
				center = sheet.__centerPoints[tileID];
				tileUV = sheet.__tileUVs[tileID];
			}
			if(rect != null && rect.width > 0 && rect.height > 0 && center != null) {
				alpha = 1;
				tint = 16777215;
				a = 1;
				b = 0;
				c = 0;
				d = 1;
				tx = 0;
				ty = 0;
				scale = 1.0;
				rotation = 0.0;
				cosTheta = 1.0;
				sinTheta = 0.0;
				matrix.identity();
				if(useAlpha) alpha = tileData[iIndex + alphaIndex];
				if(useRGB) tint = (tileData[iIndex + rgbIndex] * 255 | 0) << 16 | (tileData[iIndex + rgbIndex + 1] * 255 | 0) << 8 | (tileData[iIndex + rgbIndex + 2] * 255 | 0);
				if(useScale) scale = tileData[iIndex + scaleIndex];
				if(useRotation) {
					rotation = tileData[iIndex + rotationIndex];
					cosTheta = Math.cos(rotation);
					sinTheta = Math.sin(rotation);
				}
				if(useTransform) {
					a = tileData[iIndex + transformIndex];
					b = tileData[iIndex + transformIndex + 1];
					c = tileData[iIndex + transformIndex + 2];
					d = tileData[iIndex + transformIndex + 3];
				} else {
					a = scale * cosTheta;
					b = scale * sinTheta;
					c = -b;
					d = a;
				}
				ox = center.x * a + center.y * c;
				oy = center.x * b + center.y * d;
				tx = x - ox;
				ty = y - oy;
				matrix.a = a * oMatrix.a + b * oMatrix.c;
				matrix.b = a * oMatrix.b + b * oMatrix.d;
				matrix.c = c * oMatrix.a + d * oMatrix.c;
				matrix.d = c * oMatrix.b + d * oMatrix.d;
				matrix.tx = tx * oMatrix.a + ty * oMatrix.c;
				matrix.ty = tx * oMatrix.b + ty * oMatrix.d;
				uvs.x0 = tileUV.x;
				uvs.y0 = tileUV.y;
				uvs.x1 = tileUV.width;
				uvs.y1 = tileUV.y;
				uvs.x2 = tileUV.width;
				uvs.y2 = tileUV.height;
				uvs.x3 = tileUV.x;
				uvs.y3 = tileUV.height;
				bIndex = this.currentBatchSize * 4 * this.vertSize;
				this.fillVertices(bIndex,0,0,rect.width,rect.height,tint,alpha,uvs,matrix);
				this.setState(this.currentBatchSize,texture,smooth,blendMode);
				this.currentBatchSize++;
			}
			iIndex += numValues;
		}
	}
	,fillVertices: function(index,aX,aY,width,height,tint,alpha,uvs,matrix) {
		var w0;
		var w1;
		var h0;
		var h1;
		w0 = width * (1 - aX);
		w1 = width * -aX;
		h0 = height * (1 - aY);
		h1 = height * -aY;
		var a = matrix.a;
		var b = matrix.b;
		var c = matrix.c;
		var d = matrix.d;
		var tx = matrix.tx;
		var ty = matrix.ty;
		this.vertices[index++] = a * w1 + c * h1 + tx;
		this.vertices[index++] = d * h1 + b * w1 + ty;
		this.vertices[index++] = uvs.x0;
		this.vertices[index++] = uvs.y0;
		this.vertices[index++] = alpha;
		this.vertices[index++] = tint;
		this.vertices[index++] = a * w0 + c * h1 + tx;
		this.vertices[index++] = d * h1 + b * w0 + ty;
		this.vertices[index++] = uvs.x1;
		this.vertices[index++] = uvs.y1;
		this.vertices[index++] = alpha;
		this.vertices[index++] = tint;
		this.vertices[index++] = a * w0 + c * h0 + tx;
		this.vertices[index++] = d * h0 + b * w0 + ty;
		this.vertices[index++] = uvs.x2;
		this.vertices[index++] = uvs.y2;
		this.vertices[index++] = alpha;
		this.vertices[index++] = tint;
		this.vertices[index++] = a * w1 + c * h0 + tx;
		this.vertices[index++] = d * h0 + b * w1 + ty;
		this.vertices[index++] = uvs.x3;
		this.vertices[index++] = uvs.y3;
		this.vertices[index++] = alpha;
		this.vertices[index++] = tint;
	}
	,setState: function(index,texture,smooth,blendMode) {
		if(smooth == null) smooth = true;
		var state = this.states[this.currentBatchSize];
		if(state == null) state = this.states[this.currentBatchSize] = new openfl._internal.renderer.opengl.utils._SpriteBatch.State();
		state.texture = texture;
		state.textureSmooth = smooth;
		state.blendMode = blendMode;
	}
	,renderBatch: function(state,size,startIndex) {
		if(size == 0) return;
		this.gl.bindTexture(this.gl.TEXTURE_2D,state.texture);
		if(state.textureSmooth) {
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR);
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR);
		} else {
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST);
			this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST);
		}
		this.gl.drawElements(this.gl.TRIANGLES,size * 6,this.gl.UNSIGNED_SHORT,startIndex * 6 * 2);
		this.renderSession.drawCount++;
	}
	,setContext: function(gl) {
		this.gl = gl;
		this.vertexBuffer = gl.createBuffer();
		this.indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.indices,gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,this.vertices,gl.DYNAMIC_DRAW);
		this.currentBlendMode = null;
	}
	,start: function() {
		this.dirty = true;
	}
	,__class__: openfl._internal.renderer.opengl.utils.SpriteBatch
};
openfl._internal.renderer.opengl.utils._SpriteBatch = {};
openfl._internal.renderer.opengl.utils._SpriteBatch.State = function() {
	this.textureSmooth = true;
};
$hxClasses["openfl._internal.renderer.opengl.utils._SpriteBatch.State"] = openfl._internal.renderer.opengl.utils._SpriteBatch.State;
openfl._internal.renderer.opengl.utils._SpriteBatch.State.__name__ = ["openfl","_internal","renderer","opengl","utils","_SpriteBatch","State"];
openfl._internal.renderer.opengl.utils._SpriteBatch.State.prototype = {
	texture: null
	,textureSmooth: null
	,blendMode: null
	,__class__: openfl._internal.renderer.opengl.utils._SpriteBatch.State
};
openfl._internal.renderer.opengl.utils.StencilManager = function(gl) {
	this.stencilStack = [];
	this.bucketStack = [];
	this.setContext(gl);
	this.reverse = true;
	this.count = 0;
};
$hxClasses["openfl._internal.renderer.opengl.utils.StencilManager"] = openfl._internal.renderer.opengl.utils.StencilManager;
openfl._internal.renderer.opengl.utils.StencilManager.__name__ = ["openfl","_internal","renderer","opengl","utils","StencilManager"];
openfl._internal.renderer.opengl.utils.StencilManager.prototype = {
	count: null
	,gl: null
	,reverse: null
	,stencilStack: null
	,bucketStack: null
	,prepareGraphics: function(bucketData,renderSession,projection,translationMatrix) {
		var offset = renderSession.offset;
		var shader = renderSession.shaderManager.fillShader;
		renderSession.shaderManager.setShader(shader);
		this.gl.uniformMatrix3fv(shader.translationMatrix,false,translationMatrix);
		this.gl.uniform2f(shader.projectionVector,projection.x,-projection.y);
		this.gl.uniform2f(shader.offsetVector,-offset.x,-offset.y);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,bucketData.vertsBuffer);
		this.gl.vertexAttribPointer(shader.aVertexPosition,2,this.gl.FLOAT,false,8,0);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,bucketData.indexBuffer);
	}
	,pushBucket: function(bucket,renderSession,projection,translationMatrix) {
		if(this.bucketStack.length == 0) {
			this.gl.enable(this.gl.STENCIL_TEST);
			this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
			this.gl.stencilMask(255);
		}
		this.bucketStack.push(bucket);
		this.gl.colorMask(false,false,false,false);
		this.gl.stencilFunc(this.gl.NEVER,1,255);
		this.gl.stencilOp(this.gl.INVERT,this.gl.KEEP,this.gl.KEEP);
		this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
		var _g = 0;
		var _g1 = bucket.data;
		while(_g < _g1.length) {
			var bucketData = _g1[_g];
			++_g;
			if(bucketData.destroyed) continue;
			this.prepareGraphics(bucketData,renderSession,projection,translationMatrix);
			this.gl.drawElements(bucketData.drawMode,bucketData.glIndices.length,this.gl.UNSIGNED_SHORT,0);
		}
		this.gl.colorMask(true,true,true,true);
		this.gl.stencilOp(this.gl.KEEP,this.gl.KEEP,this.gl.KEEP);
		this.gl.stencilFunc(this.gl.EQUAL,255,255);
	}
	,popBucket: function(object,bucket,renderSession) {
		this.bucketStack.pop();
		if(this.bucketStack.length == 0) this.gl.disable(this.gl.STENCIL_TEST);
	}
	,setContext: function(gl) {
		this.gl = gl;
	}
	,__class__: openfl._internal.renderer.opengl.utils.StencilManager
};
openfl.display.Application = function() {
	lime.app.Application.call(this);
	openfl.Lib.application = this;
};
$hxClasses["openfl.display.Application"] = openfl.display.Application;
openfl.display.Application.__name__ = ["openfl","display","Application"];
openfl.display.Application.__super__ = lime.app.Application;
openfl.display.Application.prototype = $extend(lime.app.Application.prototype,{
	stage: null
	,__lastClickTime: null
	,convertKeyCode: function(keyCode) {
		switch(keyCode) {
		case 8:
			return 8;
		case 9:
			return 9;
		case 13:
			return 13;
		case 27:
			return 27;
		case 32:
			return 32;
		case 39:
			return 222;
		case 44:
			return 188;
		case 45:
			return 189;
		case 46:
			return 190;
		case 47:
			return 191;
		case 48:
			return 48;
		case 49:
			return 49;
		case 50:
			return 50;
		case 51:
			return 51;
		case 52:
			return 52;
		case 53:
			return 53;
		case 54:
			return 54;
		case 55:
			return 55;
		case 56:
			return 56;
		case 57:
			return 57;
		case 59:
			return 186;
		case 61:
			return 187;
		case 91:
			return 219;
		case 92:
			return 220;
		case 93:
			return 221;
		case 96:
			return 192;
		case 97:
			return 65;
		case 98:
			return 66;
		case 99:
			return 67;
		case 100:
			return 68;
		case 101:
			return 69;
		case 102:
			return 70;
		case 103:
			return 71;
		case 104:
			return 72;
		case 105:
			return 73;
		case 106:
			return 74;
		case 107:
			return 75;
		case 108:
			return 76;
		case 109:
			return 77;
		case 110:
			return 78;
		case 111:
			return 79;
		case 112:
			return 80;
		case 113:
			return 81;
		case 114:
			return 82;
		case 115:
			return 83;
		case 116:
			return 84;
		case 117:
			return 85;
		case 118:
			return 86;
		case 119:
			return 87;
		case 120:
			return 88;
		case 121:
			return 89;
		case 122:
			return 90;
		case 127:
			return 46;
		case 1073741881:
			return 20;
		case 1073741882:
			return 112;
		case 1073741883:
			return 113;
		case 1073741884:
			return 114;
		case 1073741885:
			return 115;
		case 1073741886:
			return 116;
		case 1073741887:
			return 117;
		case 1073741888:
			return 118;
		case 1073741889:
			return 119;
		case 1073741890:
			return 120;
		case 1073741891:
			return 121;
		case 1073741892:
			return 122;
		case 1073741893:
			return 123;
		case 1073741897:
			return 45;
		case 1073741898:
			return 36;
		case 1073741899:
			return 33;
		case 1073741901:
			return 35;
		case 1073741902:
			return 34;
		case 1073741903:
			return 39;
		case 1073741904:
			return 37;
		case 1073741905:
			return 40;
		case 1073741906:
			return 38;
		case 1073741908:
			return 111;
		case 1073741909:
			return 106;
		case 1073741910:
			return 109;
		case 1073741911:
			return 107;
		case 1073741912:
			return 108;
		case 1073741913:
			return 97;
		case 1073741914:
			return 98;
		case 1073741915:
			return 99;
		case 1073741916:
			return 100;
		case 1073741917:
			return 101;
		case 1073741918:
			return 102;
		case 1073741919:
			return 103;
		case 1073741920:
			return 104;
		case 1073741921:
			return 105;
		case 1073741922:
			return 96;
		case 1073741923:
			return 110;
		case 1073741928:
			return 124;
		case 1073741929:
			return 125;
		case 1073741930:
			return 126;
		case 1073742048:
			return 17;
		case 1073742049:
			return 16;
		case 1073742050:
			return 18;
		case 1073742052:
			return 17;
		case 1073742053:
			return 16;
		case 1073742054:
			return 18;
		default:
			return keyCode;
		}
	}
	,create: function(config) {
		lime.app.Application.prototype.create.call(this,config);
		this.stage = new openfl.display.Stage(this.windows[0].width,this.windows[0].height,config.background);
		this.stage.addChild(openfl.Lib.current);
	}
	,onKey: function(event) {
		var stack = new Array();
		if(this.stage.__focus == null) this.stage.__getInteractive(stack); else this.stage.__focus.__getInteractive(stack);
		if(stack.length > 0) {
			stack.reverse();
			this.stage.__fireEvent(event,stack);
		}
	}
	,onKeyDown: function(keyCode,modifier) {
		var keyCode1 = this.convertKeyCode(keyCode);
		var charCode = keyCode1;
		this.onKey(new openfl.events.KeyboardEvent(openfl.events.KeyboardEvent.KEY_DOWN,true,false,charCode,keyCode1));
	}
	,onKeyUp: function(keyCode,modifier) {
		var keyCode1 = this.convertKeyCode(keyCode);
		var charCode = keyCode1;
		this.onKey(new openfl.events.KeyboardEvent(openfl.events.KeyboardEvent.KEY_UP,true,false,charCode,keyCode1));
	}
	,onMouse: function(type,x,y,button) {
		if(button > 2) return;
		this.stage.__mouseX = x;
		this.stage.__mouseY = y;
		var stack = [];
		var target = null;
		var targetPoint = new openfl.geom.Point(x,y);
		if(this.stage.__hitTest(x,y,false,stack,true)) target = stack[stack.length - 1]; else {
			target = this.stage;
			stack = [this.stage];
		}
		this.stage.__fireEvent(openfl.events.MouseEvent.__create(type,button,target == this.stage?targetPoint:target.globalToLocal(targetPoint),target),stack);
		var clickType;
		switch(type) {
		case openfl.events.MouseEvent.MOUSE_UP:
			clickType = openfl.events.MouseEvent.CLICK;
			break;
		case openfl.events.MouseEvent.MIDDLE_MOUSE_UP:
			clickType = openfl.events.MouseEvent.MIDDLE_CLICK;
			break;
		case openfl.events.MouseEvent.RIGHT_MOUSE_UP:
			clickType = openfl.events.MouseEvent.RIGHT_CLICK;
			break;
		default:
			clickType = null;
		}
		if(clickType != null) {
			this.stage.__fireEvent(openfl.events.MouseEvent.__create(clickType,button,target == this.stage?targetPoint:target.globalToLocal(targetPoint),target),stack);
			if(type == openfl.events.MouseEvent.MOUSE_UP && (js.Boot.__cast(target , openfl.display.InteractiveObject)).doubleClickEnabled) {
				var currentTime = openfl.Lib.getTimer();
				if(currentTime - this.__lastClickTime < 500) {
					this.stage.__fireEvent(openfl.events.MouseEvent.__create(openfl.events.MouseEvent.DOUBLE_CLICK,button,target == this.stage?targetPoint:target.globalToLocal(targetPoint),target),stack);
					this.__lastClickTime = 0;
				} else this.__lastClickTime = currentTime;
			}
		}
		if(js.Boot.__instanceof(target,openfl.display.Sprite)) {
			var targetSprite = target;
			if(targetSprite.buttonMode && targetSprite.useHandCursor) lime.ui.Mouse.set_cursor(lime.ui.MouseCursor.POINTER); else lime.ui.Mouse.set_cursor(lime.ui.MouseCursor.ARROW);
		} else lime.ui.Mouse.set_cursor(lime.ui.MouseCursor.ARROW);
		if(this.stage.__dragObject != null) this.stage.__drag(targetPoint);
	}
	,onMouseDown: function(x,y,button) {
		var type;
		switch(button) {
		case 1:
			type = openfl.events.MouseEvent.MIDDLE_MOUSE_DOWN;
			break;
		case 2:
			type = openfl.events.MouseEvent.RIGHT_MOUSE_DOWN;
			break;
		default:
			type = openfl.events.MouseEvent.MOUSE_DOWN;
		}
		this.onMouse(type,x,y,button);
	}
	,onMouseMove: function(x,y,button) {
		this.onMouse(openfl.events.MouseEvent.MOUSE_MOVE,x,y,0);
	}
	,onMouseUp: function(x,y,button) {
		var type;
		switch(button) {
		case 1:
			type = openfl.events.MouseEvent.MIDDLE_MOUSE_UP;
			break;
		case 2:
			type = openfl.events.MouseEvent.RIGHT_MOUSE_UP;
			break;
		default:
			type = openfl.events.MouseEvent.MOUSE_UP;
		}
		this.onMouse(type,x,y,button);
	}
	,onTouch: function(type,x,y,id) {
		var point = new openfl.geom.Point(x,y);
		this.stage.__mouseX = point.x;
		this.stage.__mouseY = point.y;
		var __stack = [];
		var mouseType;
		switch(type) {
		case "touchBegin":
			mouseType = openfl.events.MouseEvent.MOUSE_DOWN;
			break;
		case "touchMove":
			mouseType = openfl.events.MouseEvent.MOUSE_MOVE;
			break;
		case "touchEnd":
			mouseType = openfl.events.MouseEvent.MOUSE_UP;
			break;
		default:
			mouseType = null;
		}
		if(this.stage.__hitTest(x,y,false,__stack,true)) {
			var target = __stack[__stack.length - 1];
			var localPoint = target.globalToLocal(point);
			var touchEvent = openfl.events.TouchEvent.__create(type,null,localPoint,target);
			touchEvent.touchPointID = id;
			touchEvent.isPrimaryTouchPoint = true;
			var mouseEvent = openfl.events.MouseEvent.__create(mouseType,0,localPoint,target);
			mouseEvent.buttonDown = type != "touchEnd";
			this.stage.__fireEvent(touchEvent,__stack);
			this.stage.__fireEvent(mouseEvent,__stack);
		} else {
			var touchEvent1 = openfl.events.TouchEvent.__create(type,null,point,this.stage);
			touchEvent1.touchPointID = id;
			touchEvent1.isPrimaryTouchPoint = true;
			var mouseEvent1 = openfl.events.MouseEvent.__create(mouseType,0,point,this.stage);
			mouseEvent1.buttonDown = type != "touchEnd";
			this.stage.__fireEvent(touchEvent1,[this.stage]);
			this.stage.__fireEvent(mouseEvent1,[this.stage]);
		}
		if(type == "touchMove" && this.stage.__dragObject != null) this.stage.__drag(point);
	}
	,onTouchMove: function(x,y,id) {
		this.onTouch("touchMove",x,y,id);
	}
	,onTouchEnd: function(x,y,id) {
		this.onTouch("touchEnd",x,y,id);
	}
	,onTouchStart: function(x,y,id) {
		this.onTouch("touchBegin",x,y,id);
	}
	,onWindowActivate: function() {
		var event = new openfl.events.Event(openfl.events.Event.ACTIVATE);
		this.stage.__broadcast(event,true);
	}
	,onWindowDeactivate: function() {
		var event = new openfl.events.Event(openfl.events.Event.DEACTIVATE);
		this.stage.__broadcast(event,true);
	}
	,onWindowResize: function(width,height) {
		this.stage.stageWidth = width;
		this.stage.stageHeight = height;
		var event = new openfl.events.Event(openfl.events.Event.RESIZE);
		this.stage.__broadcast(event,false);
	}
	,render: function(context) {
		this.stage.__render(context);
	}
	,__class__: openfl.display.Application
});
openfl.display.BitmapData = function() { };
$hxClasses["openfl.display.BitmapData"] = openfl.display.BitmapData;
openfl.display.BitmapData.__name__ = ["openfl","display","BitmapData"];
openfl.display.BitmapData.__interfaces__ = [openfl.display.IBitmapDrawable];
openfl.display.BitmapData.prototype = {
	height: null
	,width: null
	,__image: null
	,__texture: null
	,getTexture: function(gl) {
		if(this.__texture == null) {
			this.__texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D,this.__texture);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
			this.__image.dirty = true;
		}
		if(this.__image.dirty) {
			gl.bindTexture(gl.TEXTURE_2D,this.__texture);
			var textureImage = this.__image.clone();
			textureImage.set_premultiplied(true);
			gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,this.width,this.height,0,gl.RGBA,gl.UNSIGNED_BYTE,textureImage.get_data());
			gl.bindTexture(gl.TEXTURE_2D,null);
			this.__image.dirty = false;
		}
		return this.__texture;
	}
	,__sync: function() {
		lime.graphics.utils.ImageCanvasUtil.sync(this.__image);
	}
	,__class__: openfl.display.BitmapData
};
openfl.display.TextureUvs = function() {
	this.y3 = 0;
	this.y2 = 0;
	this.y1 = 0;
	this.y0 = 0;
	this.x3 = 0;
	this.x2 = 0;
	this.x1 = 0;
	this.x0 = 0;
};
$hxClasses["openfl.display.TextureUvs"] = openfl.display.TextureUvs;
openfl.display.TextureUvs.__name__ = ["openfl","display","TextureUvs"];
openfl.display.TextureUvs.prototype = {
	x0: null
	,x1: null
	,x2: null
	,x3: null
	,y0: null
	,y1: null
	,y2: null
	,y3: null
	,__class__: openfl.display.TextureUvs
};
openfl.display.BlendMode = $hxClasses["openfl.display.BlendMode"] = { __ename__ : true, __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] };
openfl.display.BlendMode.ADD = ["ADD",0];
openfl.display.BlendMode.ADD.toString = $estr;
openfl.display.BlendMode.ADD.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.ALPHA = ["ALPHA",1];
openfl.display.BlendMode.ALPHA.toString = $estr;
openfl.display.BlendMode.ALPHA.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.DARKEN = ["DARKEN",2];
openfl.display.BlendMode.DARKEN.toString = $estr;
openfl.display.BlendMode.DARKEN.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.DIFFERENCE = ["DIFFERENCE",3];
openfl.display.BlendMode.DIFFERENCE.toString = $estr;
openfl.display.BlendMode.DIFFERENCE.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.ERASE = ["ERASE",4];
openfl.display.BlendMode.ERASE.toString = $estr;
openfl.display.BlendMode.ERASE.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.HARDLIGHT = ["HARDLIGHT",5];
openfl.display.BlendMode.HARDLIGHT.toString = $estr;
openfl.display.BlendMode.HARDLIGHT.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.INVERT = ["INVERT",6];
openfl.display.BlendMode.INVERT.toString = $estr;
openfl.display.BlendMode.INVERT.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.LAYER = ["LAYER",7];
openfl.display.BlendMode.LAYER.toString = $estr;
openfl.display.BlendMode.LAYER.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.LIGHTEN = ["LIGHTEN",8];
openfl.display.BlendMode.LIGHTEN.toString = $estr;
openfl.display.BlendMode.LIGHTEN.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.MULTIPLY = ["MULTIPLY",9];
openfl.display.BlendMode.MULTIPLY.toString = $estr;
openfl.display.BlendMode.MULTIPLY.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.NORMAL = ["NORMAL",10];
openfl.display.BlendMode.NORMAL.toString = $estr;
openfl.display.BlendMode.NORMAL.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.OVERLAY = ["OVERLAY",11];
openfl.display.BlendMode.OVERLAY.toString = $estr;
openfl.display.BlendMode.OVERLAY.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.SCREEN = ["SCREEN",12];
openfl.display.BlendMode.SCREEN.toString = $estr;
openfl.display.BlendMode.SCREEN.__enum__ = openfl.display.BlendMode;
openfl.display.BlendMode.SUBTRACT = ["SUBTRACT",13];
openfl.display.BlendMode.SUBTRACT.toString = $estr;
openfl.display.BlendMode.SUBTRACT.__enum__ = openfl.display.BlendMode;
openfl.display.CapsStyle = $hxClasses["openfl.display.CapsStyle"] = { __ename__ : true, __constructs__ : ["NONE","ROUND","SQUARE"] };
openfl.display.CapsStyle.NONE = ["NONE",0];
openfl.display.CapsStyle.NONE.toString = $estr;
openfl.display.CapsStyle.NONE.__enum__ = openfl.display.CapsStyle;
openfl.display.CapsStyle.ROUND = ["ROUND",1];
openfl.display.CapsStyle.ROUND.toString = $estr;
openfl.display.CapsStyle.ROUND.__enum__ = openfl.display.CapsStyle;
openfl.display.CapsStyle.SQUARE = ["SQUARE",2];
openfl.display.CapsStyle.SQUARE.toString = $estr;
openfl.display.CapsStyle.SQUARE.__enum__ = openfl.display.CapsStyle;
openfl.display.DirectRenderer = function(type) {
	if(type == null) type = "DirectRenderer";
	openfl.display.DisplayObject.call(this);
};
$hxClasses["openfl.display.DirectRenderer"] = openfl.display.DirectRenderer;
openfl.display.DirectRenderer.__name__ = ["openfl","display","DirectRenderer"];
openfl.display.DirectRenderer.__super__ = openfl.display.DisplayObject;
openfl.display.DirectRenderer.prototype = $extend(openfl.display.DisplayObject.prototype,{
	__render: null
	,__class__: openfl.display.DirectRenderer
});
openfl.display.FrameLabel = function() { };
$hxClasses["openfl.display.FrameLabel"] = openfl.display.FrameLabel;
openfl.display.FrameLabel.__name__ = ["openfl","display","FrameLabel"];
openfl.display.FrameLabel.__super__ = openfl.events.EventDispatcher;
openfl.display.FrameLabel.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	__class__: openfl.display.FrameLabel
});
openfl.display.Graphics = function() {
	this.__visible = true;
	this.__glStack = [];
	this.__dirty = true;
	this.__commands = [];
	this.__commands = new Array();
	this.__halfStrokeWidth = 0;
	this.__positionX = 0;
	this.__positionY = 0;
};
$hxClasses["openfl.display.Graphics"] = openfl.display.Graphics;
openfl.display.Graphics.__name__ = ["openfl","display","Graphics"];
openfl.display.Graphics.prototype = {
	__bounds: null
	,__commands: null
	,__dirty: null
	,__glStack: null
	,__drawPaths: null
	,__halfStrokeWidth: null
	,__positionX: null
	,__positionY: null
	,__transformDirty: null
	,__visible: null
	,__cachedTexture: null
	,__canvas: null
	,__context: null
	,beginFill: function(color,alpha) {
		if(alpha == null) alpha = 1;
		if(color == null) color = 0;
		this.__commands.push(openfl.display.DrawCommand.BeginFill(color & 16777215,alpha));
		if(alpha > 0) this.__visible = true;
	}
	,drawRect: function(x,y,width,height) {
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.DrawRect(x,y,width,height));
		this.__dirty = true;
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		if(ry == null) ry = -1;
		if(width <= 0 || height <= 0) return;
		this.__inflateBounds(x - this.__halfStrokeWidth,y - this.__halfStrokeWidth);
		this.__inflateBounds(x + width + this.__halfStrokeWidth,y + height + this.__halfStrokeWidth);
		this.__commands.push(openfl.display.DrawCommand.DrawRoundRect(x,y,width,height,rx,ry));
		this.__dirty = true;
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		if(thickness != null) this.__halfStrokeWidth = thickness / 2; else this.__halfStrokeWidth = 0;
		this.__commands.push(openfl.display.DrawCommand.LineStyle(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit));
		if(thickness != null) this.__visible = true;
	}
	,__getBounds: function(rect,matrix) {
		if(this.__bounds == null) return;
		var bounds = this.__bounds.clone().transform(matrix);
		rect.__expand(bounds.x,bounds.y,bounds.width,bounds.height);
	}
	,__hitTest: function(x,y,shapeFlag,matrix) {
		if(this.__bounds == null) return false;
		var bounds = this.__bounds.clone().transform(matrix);
		return x > bounds.x && y > bounds.y && x <= bounds.get_right() && y <= bounds.get_bottom();
	}
	,__inflateBounds: function(x,y) {
		if(this.__bounds == null) {
			this.__bounds = new openfl.geom.Rectangle(x,y,0,0);
			this.__transformDirty = true;
			return;
		}
		if(x < this.__bounds.x) {
			this.__bounds.width += this.__bounds.x - x;
			this.__bounds.x = x;
			this.__transformDirty = true;
		}
		if(y < this.__bounds.y) {
			this.__bounds.height += this.__bounds.y - y;
			this.__bounds.y = y;
			this.__transformDirty = true;
		}
		if(x > this.__bounds.x + this.__bounds.width) this.__bounds.width = x - this.__bounds.x;
		if(y > this.__bounds.y + this.__bounds.height) this.__bounds.height = y - this.__bounds.y;
	}
	,__class__: openfl.display.Graphics
};
openfl.display.DrawCommand = $hxClasses["openfl.display.DrawCommand"] = { __ename__ : true, __constructs__ : ["BeginBitmapFill","BeginFill","CubicCurveTo","CurveTo","DrawCircle","DrawEllipse","DrawRect","DrawRoundRect","DrawTiles","DrawTriangles","EndFill","LineStyle","LineTo","MoveTo"] };
openfl.display.DrawCommand.BeginBitmapFill = function(bitmap,matrix,repeat,smooth) { var $x = ["BeginBitmapFill",0,bitmap,matrix,repeat,smooth]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.BeginFill = function(color,alpha) { var $x = ["BeginFill",1,color,alpha]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.CubicCurveTo = function(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY) { var $x = ["CubicCurveTo",2,controlX1,controlY1,controlX2,controlY2,anchorX,anchorY]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.CurveTo = function(controlX,controlY,anchorX,anchorY) { var $x = ["CurveTo",3,controlX,controlY,anchorX,anchorY]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawCircle = function(x,y,radius) { var $x = ["DrawCircle",4,x,y,radius]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawEllipse = function(x,y,width,height) { var $x = ["DrawEllipse",5,x,y,width,height]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawRect = function(x,y,width,height) { var $x = ["DrawRect",6,x,y,width,height]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawRoundRect = function(x,y,width,height,rx,ry) { var $x = ["DrawRoundRect",7,x,y,width,height,rx,ry]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawTiles = function(sheet,tileData,smooth,flags,count) { var $x = ["DrawTiles",8,sheet,tileData,smooth,flags,count]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.DrawTriangles = function(vertices,indices,uvtData,culling,colors,blendMode) { var $x = ["DrawTriangles",9,vertices,indices,uvtData,culling,colors,blendMode]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.EndFill = ["EndFill",10];
openfl.display.DrawCommand.EndFill.toString = $estr;
openfl.display.DrawCommand.EndFill.__enum__ = openfl.display.DrawCommand;
openfl.display.DrawCommand.LineStyle = function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) { var $x = ["LineStyle",11,thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.LineTo = function(x,y) { var $x = ["LineTo",12,x,y]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.DrawCommand.MoveTo = function(x,y) { var $x = ["MoveTo",13,x,y]; $x.__enum__ = openfl.display.DrawCommand; $x.toString = $estr; return $x; };
openfl.display.JointStyle = $hxClasses["openfl.display.JointStyle"] = { __ename__ : true, __constructs__ : ["MITER","ROUND","BEVEL"] };
openfl.display.JointStyle.MITER = ["MITER",0];
openfl.display.JointStyle.MITER.toString = $estr;
openfl.display.JointStyle.MITER.__enum__ = openfl.display.JointStyle;
openfl.display.JointStyle.ROUND = ["ROUND",1];
openfl.display.JointStyle.ROUND.toString = $estr;
openfl.display.JointStyle.ROUND.__enum__ = openfl.display.JointStyle;
openfl.display.JointStyle.BEVEL = ["BEVEL",2];
openfl.display.JointStyle.BEVEL.toString = $estr;
openfl.display.JointStyle.BEVEL.__enum__ = openfl.display.JointStyle;
openfl.display.LineScaleMode = $hxClasses["openfl.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] };
openfl.display.LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
openfl.display.LineScaleMode.HORIZONTAL.toString = $estr;
openfl.display.LineScaleMode.HORIZONTAL.__enum__ = openfl.display.LineScaleMode;
openfl.display.LineScaleMode.NONE = ["NONE",1];
openfl.display.LineScaleMode.NONE.toString = $estr;
openfl.display.LineScaleMode.NONE.__enum__ = openfl.display.LineScaleMode;
openfl.display.LineScaleMode.NORMAL = ["NORMAL",2];
openfl.display.LineScaleMode.NORMAL.toString = $estr;
openfl.display.LineScaleMode.NORMAL.__enum__ = openfl.display.LineScaleMode;
openfl.display.LineScaleMode.VERTICAL = ["VERTICAL",3];
openfl.display.LineScaleMode.VERTICAL.toString = $estr;
openfl.display.LineScaleMode.VERTICAL.__enum__ = openfl.display.LineScaleMode;
openfl.display.Loader = function() { };
$hxClasses["openfl.display.Loader"] = openfl.display.Loader;
openfl.display.Loader.__name__ = ["openfl","display","Loader"];
openfl.display.Loader.__super__ = openfl.display.Sprite;
openfl.display.Loader.prototype = $extend(openfl.display.Sprite.prototype,{
	__class__: openfl.display.Loader
});
openfl.display.OpenGLView = function() {
	openfl.display.DirectRenderer.call(this,"OpenGLView");
	if(!this.__initialized) {
		this.__canvas = window.document.createElement("canvas");
		this.__canvas.width = openfl.Lib.current.stage.stageWidth;
		this.__canvas.height = openfl.Lib.current.stage.stageHeight;
		this.__context = this.__canvas.getContext("webgl");
		if(this.__context == null) this.__context = this.__canvas.getContext("experimental-webgl");
		lime.graphics.opengl.GL.context = this.__context;
		this.__initialized = true;
	}
};
$hxClasses["openfl.display.OpenGLView"] = openfl.display.OpenGLView;
openfl.display.OpenGLView.__name__ = ["openfl","display","OpenGLView"];
openfl.display.OpenGLView.__properties__ = {get_isSupported:"get_isSupported"}
openfl.display.OpenGLView.get_isSupported = function() {
	if(!window.WebGLRenderingContext) return false;
	if(lime.graphics.opengl.GL.context != null) return true; else {
		var canvas = window.document.createElement("canvas");
		var context = canvas.getContext("webgl");
		if(context == null) context = canvas.getContext("experimental-webgl");
		return context != null;
	}
	return true;
};
openfl.display.OpenGLView.__super__ = openfl.display.DirectRenderer;
openfl.display.OpenGLView.prototype = $extend(openfl.display.DirectRenderer.prototype,{
	__added: null
	,__initialized: null
	,__renderCanvas: function(renderSession) {
	}
	,__renderDOM: function(renderSession) {
		if(this.stage != null && this.__worldVisible && this.__renderable) {
			if(!this.__added) {
				renderSession.element.appendChild(this.__canvas);
				this.__added = true;
				openfl._internal.renderer.dom.DOMRenderer.initializeElement(this,this.__canvas,renderSession);
			}
			if(this.__context != null) {
				var rect = null;
				if(this.get_scrollRect() == null) rect = new openfl.geom.Rectangle(0,0,this.stage.stageWidth,this.stage.stageHeight); else rect = new openfl.geom.Rectangle(this.get_x() + this.get_scrollRect().x,this.get_y() + this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height);
				if(this.__render != null) this.__render(rect);
			}
		} else if(this.__added) {
			renderSession.element.removeChild(this.__canvas);
			this.__added = false;
		}
	}
	,__renderGL: function(renderSession) {
		if(this.stage != null && this.__renderable) {
			var rect = null;
			if(this.get_scrollRect() == null) rect = new openfl.geom.Rectangle(0,0,this.stage.stageWidth,this.stage.stageHeight); else rect = new openfl.geom.Rectangle(this.get_x() + this.get_scrollRect().x,this.get_y() + this.get_scrollRect().y,this.get_scrollRect().width,this.get_scrollRect().height);
			if(this.__render != null) this.__render(rect);
		}
	}
	,__class__: openfl.display.OpenGLView
});
openfl.display.Preloader = function(display) {
	lime.app.Preloader.call(this);
	if(display != null) {
		this.display = display;
		openfl.Lib.current.addChild(display);
		if(js.Boot.__instanceof(display,NMEPreloader)) (js.Boot.__cast(display , NMEPreloader)).onInit();
	}
};
$hxClasses["openfl.display.Preloader"] = openfl.display.Preloader;
openfl.display.Preloader.__name__ = ["openfl","display","Preloader"];
openfl.display.Preloader.__super__ = lime.app.Preloader;
openfl.display.Preloader.prototype = $extend(lime.app.Preloader.prototype,{
	display: null
	,load: function(urls,types) {
		var sounds = [];
		var url = null;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "MUSIC":case "SOUND":
				var sound = haxe.io.Path.withoutExtension(url);
				if(!HxOverrides.remove(sounds,sound)) this.total++;
				sounds.push(sound);
				break;
			default:
			}
		}
		var _g3 = 0;
		while(_g3 < sounds.length) {
			var soundName = sounds[_g3];
			++_g3;
			var sound1 = new openfl.media.Sound();
			sound1.addEventListener(openfl.events.Event.COMPLETE,$bind(this,this.sound_onComplete));
			sound1.addEventListener(openfl.events.IOErrorEvent.IO_ERROR,$bind(this,this.sound_onIOError));
			sound1.load(new openfl.net.URLRequest(soundName + ".ogg"));
		}
		lime.app.Preloader.prototype.load.call(this,urls,types);
	}
	,start: function() {
		if(this.display != null && js.Boot.__instanceof(this.display,NMEPreloader)) {
			this.display.addEventListener(openfl.events.Event.COMPLETE,$bind(this,this.display_onComplete));
			(js.Boot.__cast(this.display , NMEPreloader)).onLoaded();
		} else lime.app.Preloader.prototype.start.call(this);
	}
	,update: function(loaded,total) {
		if(this.display != null && js.Boot.__instanceof(this.display,NMEPreloader)) (js.Boot.__cast(this.display , NMEPreloader)).onUpdate(loaded,total);
	}
	,display_onComplete: function(event) {
		this.display.removeEventListener(openfl.events.Event.COMPLETE,$bind(this,this.display_onComplete));
		openfl.Lib.current.removeChild(this.display);
		openfl.Lib.current.stage.set_focus(null);
		this.display = null;
		lime.app.Preloader.prototype.start.call(this);
	}
	,sound_onComplete: function(event) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,sound_onIOError: function(event) {
		this.loaded++;
		this.update(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: openfl.display.Preloader
});
openfl.display.Stage = function(width,height,color) {
	this.__mouseY = 0;
	this.__mouseX = 0;
	openfl.display.Sprite.call(this);
	if(color == null) {
		this.__transparent = true;
		this.set_color(0);
	} else this.set_color(color);
	this.set_name(null);
	this.__mouseX = 0;
	this.__mouseY = 0;
	this.stageWidth = width;
	this.stageHeight = height;
	this.stage = this;
	this.align = openfl.display.StageAlign.TOP_LEFT;
	this.allowsFullScreen = false;
	this.set_displayState(openfl.display.StageDisplayState.NORMAL);
	this.frameRate = 60;
	this.quality = openfl.display.StageQuality.HIGH;
	this.scaleMode = openfl.display.StageScaleMode.NO_SCALE;
	this.stageFocusRect = true;
	this.__clearBeforeRender = true;
	this.__stack = [];
	var this1;
	this1 = new openfl.VectorData();
	var this2;
	this2 = new Array(0);
	this1.data = this2;
	this1.length = 0;
	this1.fixed = false;
	this.stage3Ds = this1;
	var this3 = this.stage3Ds;
	var x = new openfl.display.Stage3D();
	if(!this3.fixed) {
		this3.length++;
		if(this3.data.length < this3.length) {
			var data;
			var this4;
			this4 = new Array(this3.data.length + 10);
			data = this4;
			haxe.ds._Vector.Vector_Impl_.blit(this3.data,0,data,0,this3.data.length);
			this3.data = data;
		}
		this3.data[this3.length - 1] = x;
	}
	this3.length;
};
$hxClasses["openfl.display.Stage"] = openfl.display.Stage;
openfl.display.Stage.__name__ = ["openfl","display","Stage"];
openfl.display.Stage.__super__ = openfl.display.Sprite;
openfl.display.Stage.prototype = $extend(openfl.display.Sprite.prototype,{
	align: null
	,allowsFullScreen: null
	,displayState: null
	,frameRate: null
	,quality: null
	,stageFocusRect: null
	,scaleMode: null
	,stage3Ds: null
	,stageHeight: null
	,stageWidth: null
	,__clearBeforeRender: null
	,__color: null
	,__colorSplit: null
	,__colorString: null
	,__dirty: null
	,__dragBounds: null
	,__dragObject: null
	,__dragOffsetX: null
	,__dragOffsetY: null
	,__focus: null
	,__invalidated: null
	,__mouseX: null
	,__mouseY: null
	,__renderer: null
	,__stack: null
	,__transparent: null
	,__wasDirty: null
	,globalToLocal: function(pos) {
		return pos;
	}
	,__drag: function(mouse) {
		var parent = this.__dragObject.parent;
		if(parent != null) mouse = parent.globalToLocal(mouse);
		var x = mouse.x + this.__dragOffsetX;
		var y = mouse.y + this.__dragOffsetY;
		if(this.__dragBounds != null) {
			if(x < this.__dragBounds.x) x = this.__dragBounds.x; else if(x > this.__dragBounds.get_right()) x = this.__dragBounds.get_right();
			if(y < this.__dragBounds.y) y = this.__dragBounds.y; else if(y > this.__dragBounds.get_bottom()) y = this.__dragBounds.get_bottom();
		}
		this.__dragObject.set_x(x);
		this.__dragObject.set_y(y);
	}
	,__fireEvent: function(event,stack) {
		var length = stack.length;
		if(length == 0) {
			event.eventPhase = openfl.events.EventPhase.AT_TARGET;
			event.target.__broadcast(event,false);
		} else {
			event.eventPhase = openfl.events.EventPhase.CAPTURING_PHASE;
			event.target = stack[stack.length - 1];
			var _g1 = 0;
			var _g = length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				stack[i].__broadcast(event,false);
				if(event.__isCancelled) return;
			}
			event.eventPhase = openfl.events.EventPhase.AT_TARGET;
			event.target.__broadcast(event,false);
			if(event.__isCancelled) return;
			if(event.bubbles) {
				event.eventPhase = openfl.events.EventPhase.BUBBLING_PHASE;
				var i1 = length - 2;
				while(i1 >= 0) {
					stack[i1].__broadcast(event,false);
					if(event.__isCancelled) return;
					i1--;
				}
			}
		}
	}
	,__getInteractive: function(stack) {
		stack.push(this);
	}
	,__render: function(context) {
		this.__broadcast(new openfl.events.Event(openfl.events.Event.ENTER_FRAME),true);
		if(this.__invalidated) {
			this.__invalidated = false;
			this.__broadcast(new openfl.events.Event(openfl.events.Event.RENDER),true);
		}
		this.__renderable = true;
		this.__update(false,true);
		switch(context[1]) {
		case 0:
			var gl = context[2];
			if(this.__renderer == null) this.__renderer = new openfl._internal.renderer.opengl.GLRenderer(this.stageWidth,this.stageHeight,gl);
			this.__renderer.render(this);
			break;
		case 1:
			var context1 = context[2];
			if(this.__renderer == null) this.__renderer = new openfl._internal.renderer.canvas.CanvasRenderer(this.stageWidth,this.stageHeight,context1);
			this.__renderer.render(this);
			break;
		case 2:
			var element = context[2];
			if(this.__renderer == null) this.__renderer = new openfl._internal.renderer.dom.DOMRenderer(this.stageWidth,this.stageHeight,element);
			this.__renderer.render(this);
			break;
		default:
		}
	}
	,__update: function(transformOnly,updateChildren) {
		if(transformOnly) {
			if(openfl.display.DisplayObject.__worldTransformDirty > 0) {
				openfl.display.Sprite.prototype.__update.call(this,true,updateChildren);
				if(updateChildren) {
					openfl.display.DisplayObject.__worldTransformDirty = 0;
					this.__dirty = true;
				}
			}
		} else if(openfl.display.DisplayObject.__worldTransformDirty > 0 || this.__dirty || openfl.display.DisplayObject.__worldRenderDirty > 0) {
			openfl.display.Sprite.prototype.__update.call(this,false,updateChildren);
			if(updateChildren) {
				this.__wasDirty = true;
				openfl.display.DisplayObject.__worldTransformDirty = 0;
				openfl.display.DisplayObject.__worldRenderDirty = 0;
				this.__dirty = false;
			}
		} else if(this.__wasDirty) {
			openfl.display.Sprite.prototype.__update.call(this,false,updateChildren);
			if(updateChildren) this.__wasDirty = false;
		}
	}
	,get_mouseX: function() {
		return this.__mouseX;
	}
	,get_mouseY: function() {
		return this.__mouseY;
	}
	,set_color: function(value) {
		var r = (value & 16711680) >>> 16;
		var g = (value & 65280) >>> 8;
		var b = value & 255;
		this.__colorSplit = [r / 255,g / 255,b / 255];
		this.__colorString = "#" + StringTools.hex(value,6);
		return this.__color = value;
	}
	,set_focus: function(value) {
		if(value != this.__focus) {
			if(this.__focus != null) {
				var event = new openfl.events.FocusEvent(openfl.events.FocusEvent.FOCUS_OUT,true,false,value,false,0);
				this.__stack = [];
				this.__focus.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event,this.__stack);
			}
			if(value != null) {
				var event1 = new openfl.events.FocusEvent(openfl.events.FocusEvent.FOCUS_IN,true,false,this.__focus,false,0);
				this.__stack = [];
				value.__getInteractive(this.__stack);
				this.__stack.reverse();
				this.__fireEvent(event1,this.__stack);
			}
			this.__focus = value;
		}
		return this.__focus;
	}
	,set_displayState: function(value) {
		this.displayState = value;
		return value;
	}
	,__class__: openfl.display.Stage
	,__properties__: $extend(openfl.display.Sprite.prototype.__properties__,{set_focus:"set_focus",set_color:"set_color",set_displayState:"set_displayState"})
});
openfl.display.Stage3D = function() {
	openfl.events.EventDispatcher.call(this);
};
$hxClasses["openfl.display.Stage3D"] = openfl.display.Stage3D;
openfl.display.Stage3D.__name__ = ["openfl","display","Stage3D"];
openfl.display.Stage3D.__super__ = openfl.events.EventDispatcher;
openfl.display.Stage3D.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	context3D: null
	,x: null
	,y: null
	,requestContext3D: function(context3DRenderMode) {
		if(context3DRenderMode == null) context3DRenderMode = "";
		if(openfl.display.OpenGLView.get_isSupported()) {
			this.context3D = new openfl.display3D.Context3D();
			this.dispatchEvent(new openfl.events.Event(openfl.events.Event.CONTEXT3D_CREATE));
		} else this.dispatchEvent(new openfl.events.ErrorEvent(openfl.events.ErrorEvent.ERROR));
	}
	,__class__: openfl.display.Stage3D
});
openfl.display.StageAlign = $hxClasses["openfl.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] };
openfl.display.StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
openfl.display.StageAlign.TOP_RIGHT.toString = $estr;
openfl.display.StageAlign.TOP_RIGHT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.TOP_LEFT = ["TOP_LEFT",1];
openfl.display.StageAlign.TOP_LEFT.toString = $estr;
openfl.display.StageAlign.TOP_LEFT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.TOP = ["TOP",2];
openfl.display.StageAlign.TOP.toString = $estr;
openfl.display.StageAlign.TOP.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.RIGHT = ["RIGHT",3];
openfl.display.StageAlign.RIGHT.toString = $estr;
openfl.display.StageAlign.RIGHT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.LEFT = ["LEFT",4];
openfl.display.StageAlign.LEFT.toString = $estr;
openfl.display.StageAlign.LEFT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
openfl.display.StageAlign.BOTTOM_RIGHT.toString = $estr;
openfl.display.StageAlign.BOTTOM_RIGHT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
openfl.display.StageAlign.BOTTOM_LEFT.toString = $estr;
openfl.display.StageAlign.BOTTOM_LEFT.__enum__ = openfl.display.StageAlign;
openfl.display.StageAlign.BOTTOM = ["BOTTOM",7];
openfl.display.StageAlign.BOTTOM.toString = $estr;
openfl.display.StageAlign.BOTTOM.__enum__ = openfl.display.StageAlign;
openfl.display.StageDisplayState = $hxClasses["openfl.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["NORMAL","FULL_SCREEN","FULL_SCREEN_INTERACTIVE"] };
openfl.display.StageDisplayState.NORMAL = ["NORMAL",0];
openfl.display.StageDisplayState.NORMAL.toString = $estr;
openfl.display.StageDisplayState.NORMAL.__enum__ = openfl.display.StageDisplayState;
openfl.display.StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",1];
openfl.display.StageDisplayState.FULL_SCREEN.toString = $estr;
openfl.display.StageDisplayState.FULL_SCREEN.__enum__ = openfl.display.StageDisplayState;
openfl.display.StageDisplayState.FULL_SCREEN_INTERACTIVE = ["FULL_SCREEN_INTERACTIVE",2];
openfl.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.toString = $estr;
openfl.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.__enum__ = openfl.display.StageDisplayState;
openfl.display.StageQuality = $hxClasses["openfl.display.StageQuality"] = { __ename__ : true, __constructs__ : ["BEST","HIGH","MEDIUM","LOW"] };
openfl.display.StageQuality.BEST = ["BEST",0];
openfl.display.StageQuality.BEST.toString = $estr;
openfl.display.StageQuality.BEST.__enum__ = openfl.display.StageQuality;
openfl.display.StageQuality.HIGH = ["HIGH",1];
openfl.display.StageQuality.HIGH.toString = $estr;
openfl.display.StageQuality.HIGH.__enum__ = openfl.display.StageQuality;
openfl.display.StageQuality.MEDIUM = ["MEDIUM",2];
openfl.display.StageQuality.MEDIUM.toString = $estr;
openfl.display.StageQuality.MEDIUM.__enum__ = openfl.display.StageQuality;
openfl.display.StageQuality.LOW = ["LOW",3];
openfl.display.StageQuality.LOW.toString = $estr;
openfl.display.StageQuality.LOW.__enum__ = openfl.display.StageQuality;
openfl.display.StageScaleMode = $hxClasses["openfl.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] };
openfl.display.StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
openfl.display.StageScaleMode.SHOW_ALL.toString = $estr;
openfl.display.StageScaleMode.SHOW_ALL.__enum__ = openfl.display.StageScaleMode;
openfl.display.StageScaleMode.NO_SCALE = ["NO_SCALE",1];
openfl.display.StageScaleMode.NO_SCALE.toString = $estr;
openfl.display.StageScaleMode.NO_SCALE.__enum__ = openfl.display.StageScaleMode;
openfl.display.StageScaleMode.NO_BORDER = ["NO_BORDER",2];
openfl.display.StageScaleMode.NO_BORDER.toString = $estr;
openfl.display.StageScaleMode.NO_BORDER.__enum__ = openfl.display.StageScaleMode;
openfl.display.StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
openfl.display.StageScaleMode.EXACT_FIT.toString = $estr;
openfl.display.StageScaleMode.EXACT_FIT.__enum__ = openfl.display.StageScaleMode;
openfl.display.Tilesheet = function() { };
$hxClasses["openfl.display.Tilesheet"] = openfl.display.Tilesheet;
openfl.display.Tilesheet.__name__ = ["openfl","display","Tilesheet"];
openfl.display.Tilesheet.prototype = {
	__bitmap: null
	,__centerPoints: null
	,__tileRects: null
	,__tileUVs: null
	,__rectTile: null
	,__rectUV: null
	,__point: null
	,__class__: openfl.display.Tilesheet
};
openfl.display.TriangleCulling = $hxClasses["openfl.display.TriangleCulling"] = { __ename__ : true, __constructs__ : ["NEGATIVE","NONE","POSITIVE"] };
openfl.display.TriangleCulling.NEGATIVE = ["NEGATIVE",0];
openfl.display.TriangleCulling.NEGATIVE.toString = $estr;
openfl.display.TriangleCulling.NEGATIVE.__enum__ = openfl.display.TriangleCulling;
openfl.display.TriangleCulling.NONE = ["NONE",1];
openfl.display.TriangleCulling.NONE.toString = $estr;
openfl.display.TriangleCulling.NONE.__enum__ = openfl.display.TriangleCulling;
openfl.display.TriangleCulling.POSITIVE = ["POSITIVE",2];
openfl.display.TriangleCulling.POSITIVE.toString = $estr;
openfl.display.TriangleCulling.POSITIVE.__enum__ = openfl.display.TriangleCulling;
openfl.display3D = {};
openfl.display3D.Context3D = function() {
	this.disposed = false;
	this._yFlip = 1;
	this.vertexBuffersCreated = new Array();
	this.indexBuffersCreated = new Array();
	this.programsCreated = new Array();
	this.texturesCreated = new Array();
	this.samplerParameters = new Array();
	var _g1 = 0;
	var _g = openfl.display3D.Context3D.MAX_SAMPLERS;
	while(_g1 < _g) {
		var i = _g1++;
		this.samplerParameters[i] = new openfl.display3D._Context3D.SamplerState();
		this.samplerParameters[i].wrap = openfl.display3D.Context3DWrapMode.REPEAT;
		this.samplerParameters[i].filter = openfl.display3D.Context3DTextureFilter.LINEAR;
		this.samplerParameters[i].mipfilter = openfl.display3D.Context3DMipFilter.MIPNONE;
	}
	var stage = openfl.Lib.current.stage;
	this.ogl = new openfl.display.OpenGLView();
	this.ogl.set_scrollRect(new openfl.geom.Rectangle(0,0,stage.stageWidth,stage.stageHeight));
	this.scrollRect = this.ogl.get_scrollRect().clone();
	this.ogl.set_width(stage.stageWidth);
	this.ogl.set_height(stage.stageHeight);
	stage.addChildAt(this.ogl,0);
};
$hxClasses["openfl.display3D.Context3D"] = openfl.display3D.Context3D;
openfl.display3D.Context3D.__name__ = ["openfl","display3D","Context3D"];
openfl.display3D.Context3D.prototype = {
	blendDestinationFactor: null
	,blendEnabled: null
	,blendSourceFactor: null
	,disposed: null
	,drawing: null
	,indexBuffersCreated: null
	,ogl: null
	,programsCreated: null
	,samplerParameters: null
	,scrollRect: null
	,texturesCreated: null
	,vertexBuffersCreated: null
	,_yFlip: null
	,clear: function(red,green,blue,alpha,depth,stencil,mask) {
		if(mask == null) mask = 17664;
		if(stencil == null) stencil = 0;
		if(depth == null) depth = 1;
		if(alpha == null) alpha = 1;
		if(blue == null) blue = 0;
		if(green == null) green = 0;
		if(red == null) red = 0;
		if(!this.drawing) {
			this.__updateBlendStatus();
			this.drawing = true;
		}
		lime.graphics.opengl.GL.context.clearColor(red,green,blue,alpha);
		lime.graphics.opengl.GL.context.clearDepth(depth);
		lime.graphics.opengl.GL.context.clearStencil(stencil);
		lime.graphics.opengl.GL.context.clear(mask);
	}
	,configureBackBuffer: function(width,height,antiAlias,enableDepthAndStencil) {
		if(enableDepthAndStencil == null) enableDepthAndStencil = true;
		if(enableDepthAndStencil) {
			lime.graphics.opengl.GL.context.enable(2929);
			lime.graphics.opengl.GL.context.enable(2960);
		}
		this.ogl.set_scrollRect(new openfl.geom.Rectangle(0,0,width,height));
		this.ogl.set_width(width);
		this.ogl.set_height(height);
		this.scrollRect = this.ogl.get_scrollRect().clone();
		lime.graphics.opengl.GL.context.viewport(this.scrollRect.x | 0,this.scrollRect.y | 0,this.scrollRect.width | 0,this.scrollRect.height | 0);
	}
	,present: function() {
		this.drawing = false;
		lime.graphics.opengl.GL.context.useProgram(null);
		lime.graphics.opengl.GL.context.bindBuffer(34962,null);
		lime.graphics.opengl.GL.context.disable(2884);
	}
	,__updateBlendStatus: function() {
		if(this.blendEnabled) {
			lime.graphics.opengl.GL.context.enable(3042);
			lime.graphics.opengl.GL.context.blendEquation(32774);
			lime.graphics.opengl.GL.context.blendFunc(this.blendSourceFactor,this.blendDestinationFactor);
		} else lime.graphics.opengl.GL.context.disable(3042);
	}
	,__class__: openfl.display3D.Context3D
};
openfl.display3D._Context3D = {};
openfl.display3D._Context3D.SamplerState = function() {
};
$hxClasses["openfl.display3D._Context3D.SamplerState"] = openfl.display3D._Context3D.SamplerState;
openfl.display3D._Context3D.SamplerState.__name__ = ["openfl","display3D","_Context3D","SamplerState"];
openfl.display3D._Context3D.SamplerState.prototype = {
	wrap: null
	,filter: null
	,mipfilter: null
	,__class__: openfl.display3D._Context3D.SamplerState
};
openfl.display3D.Context3DMipFilter = $hxClasses["openfl.display3D.Context3DMipFilter"] = { __ename__ : true, __constructs__ : ["MIPLINEAR","MIPNEAREST","MIPNONE"] };
openfl.display3D.Context3DMipFilter.MIPLINEAR = ["MIPLINEAR",0];
openfl.display3D.Context3DMipFilter.MIPLINEAR.toString = $estr;
openfl.display3D.Context3DMipFilter.MIPLINEAR.__enum__ = openfl.display3D.Context3DMipFilter;
openfl.display3D.Context3DMipFilter.MIPNEAREST = ["MIPNEAREST",1];
openfl.display3D.Context3DMipFilter.MIPNEAREST.toString = $estr;
openfl.display3D.Context3DMipFilter.MIPNEAREST.__enum__ = openfl.display3D.Context3DMipFilter;
openfl.display3D.Context3DMipFilter.MIPNONE = ["MIPNONE",2];
openfl.display3D.Context3DMipFilter.MIPNONE.toString = $estr;
openfl.display3D.Context3DMipFilter.MIPNONE.__enum__ = openfl.display3D.Context3DMipFilter;
openfl.display3D.Context3DRenderMode = $hxClasses["openfl.display3D.Context3DRenderMode"] = { __ename__ : true, __constructs__ : ["AUTO","SOFTWARE"] };
openfl.display3D.Context3DRenderMode.AUTO = ["AUTO",0];
openfl.display3D.Context3DRenderMode.AUTO.toString = $estr;
openfl.display3D.Context3DRenderMode.AUTO.__enum__ = openfl.display3D.Context3DRenderMode;
openfl.display3D.Context3DRenderMode.SOFTWARE = ["SOFTWARE",1];
openfl.display3D.Context3DRenderMode.SOFTWARE.toString = $estr;
openfl.display3D.Context3DRenderMode.SOFTWARE.__enum__ = openfl.display3D.Context3DRenderMode;
openfl.display3D.Context3DTextureFilter = $hxClasses["openfl.display3D.Context3DTextureFilter"] = { __ename__ : true, __constructs__ : ["ANISOTROPIC2X","ANISOTROPIC4X","ANISOTROPIC8X","ANISOTROPIC16X","LINEAR","NEAREST"] };
openfl.display3D.Context3DTextureFilter.ANISOTROPIC2X = ["ANISOTROPIC2X",0];
openfl.display3D.Context3DTextureFilter.ANISOTROPIC2X.toString = $estr;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC2X.__enum__ = openfl.display3D.Context3DTextureFilter;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC4X = ["ANISOTROPIC4X",1];
openfl.display3D.Context3DTextureFilter.ANISOTROPIC4X.toString = $estr;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC4X.__enum__ = openfl.display3D.Context3DTextureFilter;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC8X = ["ANISOTROPIC8X",2];
openfl.display3D.Context3DTextureFilter.ANISOTROPIC8X.toString = $estr;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC8X.__enum__ = openfl.display3D.Context3DTextureFilter;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC16X = ["ANISOTROPIC16X",3];
openfl.display3D.Context3DTextureFilter.ANISOTROPIC16X.toString = $estr;
openfl.display3D.Context3DTextureFilter.ANISOTROPIC16X.__enum__ = openfl.display3D.Context3DTextureFilter;
openfl.display3D.Context3DTextureFilter.LINEAR = ["LINEAR",4];
openfl.display3D.Context3DTextureFilter.LINEAR.toString = $estr;
openfl.display3D.Context3DTextureFilter.LINEAR.__enum__ = openfl.display3D.Context3DTextureFilter;
openfl.display3D.Context3DTextureFilter.NEAREST = ["NEAREST",5];
openfl.display3D.Context3DTextureFilter.NEAREST.toString = $estr;
openfl.display3D.Context3DTextureFilter.NEAREST.__enum__ = openfl.display3D.Context3DTextureFilter;
openfl.display3D.Context3DWrapMode = $hxClasses["openfl.display3D.Context3DWrapMode"] = { __ename__ : true, __constructs__ : ["CLAMP","REPEAT"] };
openfl.display3D.Context3DWrapMode.CLAMP = ["CLAMP",0];
openfl.display3D.Context3DWrapMode.CLAMP.toString = $estr;
openfl.display3D.Context3DWrapMode.CLAMP.__enum__ = openfl.display3D.Context3DWrapMode;
openfl.display3D.Context3DWrapMode.REPEAT = ["REPEAT",1];
openfl.display3D.Context3DWrapMode.REPEAT.toString = $estr;
openfl.display3D.Context3DWrapMode.REPEAT.__enum__ = openfl.display3D.Context3DWrapMode;
openfl.display3D.IndexBuffer3D = function() { };
$hxClasses["openfl.display3D.IndexBuffer3D"] = openfl.display3D.IndexBuffer3D;
openfl.display3D.IndexBuffer3D.__name__ = ["openfl","display3D","IndexBuffer3D"];
openfl.display3D.Program3D = function() { };
$hxClasses["openfl.display3D.Program3D"] = openfl.display3D.Program3D;
openfl.display3D.Program3D.__name__ = ["openfl","display3D","Program3D"];
openfl.display3D.VertexBuffer3D = function() { };
$hxClasses["openfl.display3D.VertexBuffer3D"] = openfl.display3D.VertexBuffer3D;
openfl.display3D.VertexBuffer3D.__name__ = ["openfl","display3D","VertexBuffer3D"];
openfl.display3D.textures = {};
openfl.display3D.textures.TextureBase = function() { };
$hxClasses["openfl.display3D.textures.TextureBase"] = openfl.display3D.textures.TextureBase;
openfl.display3D.textures.TextureBase.__name__ = ["openfl","display3D","textures","TextureBase"];
openfl.display3D.textures.TextureBase.__super__ = openfl.events.EventDispatcher;
openfl.display3D.textures.TextureBase.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	__class__: openfl.display3D.textures.TextureBase
});
openfl.errors = {};
openfl.errors.Error = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.errorID = id;
	this.name = "Error";
};
$hxClasses["openfl.errors.Error"] = openfl.errors.Error;
openfl.errors.Error.__name__ = ["openfl","errors","Error"];
openfl.errors.Error.prototype = {
	errorID: null
	,message: null
	,name: null
	,toString: function() {
		if(this.message != null) return this.message; else return "Error";
	}
	,__class__: openfl.errors.Error
};
openfl.errors.ArgumentError = function(inMessage) {
	if(inMessage == null) inMessage = "";
	openfl.errors.Error.call(this,inMessage);
};
$hxClasses["openfl.errors.ArgumentError"] = openfl.errors.ArgumentError;
openfl.errors.ArgumentError.__name__ = ["openfl","errors","ArgumentError"];
openfl.errors.ArgumentError.__super__ = openfl.errors.Error;
openfl.errors.ArgumentError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: openfl.errors.ArgumentError
});
openfl.events.TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["openfl.events.TextEvent"] = openfl.events.TextEvent;
openfl.events.TextEvent.__name__ = ["openfl","events","TextEvent"];
openfl.events.TextEvent.__super__ = openfl.events.Event;
openfl.events.TextEvent.prototype = $extend(openfl.events.Event.prototype,{
	text: null
	,__class__: openfl.events.TextEvent
});
openfl.events.ErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.TextEvent.call(this,type,bubbles,cancelable,text);
	this.errorID = id;
};
$hxClasses["openfl.events.ErrorEvent"] = openfl.events.ErrorEvent;
openfl.events.ErrorEvent.__name__ = ["openfl","events","ErrorEvent"];
openfl.events.ErrorEvent.__super__ = openfl.events.TextEvent;
openfl.events.ErrorEvent.prototype = $extend(openfl.events.TextEvent.prototype,{
	errorID: null
	,toString: function() {
		return "[ErrorEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " text=" + this.text + " errorID=" + this.errorID + "]";
	}
	,__class__: openfl.events.ErrorEvent
});
openfl.events._EventDispatcher = {};
openfl.events._EventDispatcher.Listener = function(callback,useCapture,priority) {
	this.callback = callback;
	this.useCapture = useCapture;
	this.priority = priority;
};
$hxClasses["openfl.events._EventDispatcher.Listener"] = openfl.events._EventDispatcher.Listener;
openfl.events._EventDispatcher.Listener.__name__ = ["openfl","events","_EventDispatcher","Listener"];
openfl.events._EventDispatcher.Listener.prototype = {
	callback: null
	,priority: null
	,useCapture: null
	,match: function(callback,useCapture) {
		return Reflect.compareMethods(this.callback,callback) && this.useCapture == useCapture;
	}
	,__class__: openfl.events._EventDispatcher.Listener
};
openfl.events.EventPhase = $hxClasses["openfl.events.EventPhase"] = { __ename__ : true, __constructs__ : ["CAPTURING_PHASE","AT_TARGET","BUBBLING_PHASE"] };
openfl.events.EventPhase.CAPTURING_PHASE = ["CAPTURING_PHASE",0];
openfl.events.EventPhase.CAPTURING_PHASE.toString = $estr;
openfl.events.EventPhase.CAPTURING_PHASE.__enum__ = openfl.events.EventPhase;
openfl.events.EventPhase.AT_TARGET = ["AT_TARGET",1];
openfl.events.EventPhase.AT_TARGET.toString = $estr;
openfl.events.EventPhase.AT_TARGET.__enum__ = openfl.events.EventPhase;
openfl.events.EventPhase.BUBBLING_PHASE = ["BUBBLING_PHASE",2];
openfl.events.EventPhase.BUBBLING_PHASE.toString = $estr;
openfl.events.EventPhase.BUBBLING_PHASE.__enum__ = openfl.events.EventPhase;
openfl.events.FocusEvent = function(type,bubbles,cancelable,relatedObject,shiftKey,keyCode) {
	if(keyCode == null) keyCode = 0;
	if(shiftKey == null) shiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = keyCode;
	this.shiftKey = shiftKey;
	this.relatedObject = relatedObject;
};
$hxClasses["openfl.events.FocusEvent"] = openfl.events.FocusEvent;
openfl.events.FocusEvent.__name__ = ["openfl","events","FocusEvent"];
openfl.events.FocusEvent.__super__ = openfl.events.Event;
openfl.events.FocusEvent.prototype = $extend(openfl.events.Event.prototype,{
	keyCode: null
	,relatedObject: null
	,shiftKey: null
	,__class__: openfl.events.FocusEvent
});
openfl.events.HTTPStatusEvent = function(type,bubbles,cancelable,status) {
	if(status == null) status = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.status = status;
	openfl.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["openfl.events.HTTPStatusEvent"] = openfl.events.HTTPStatusEvent;
openfl.events.HTTPStatusEvent.__name__ = ["openfl","events","HTTPStatusEvent"];
openfl.events.HTTPStatusEvent.__super__ = openfl.events.Event;
openfl.events.HTTPStatusEvent.prototype = $extend(openfl.events.Event.prototype,{
	status: null
	,__class__: openfl.events.HTTPStatusEvent
});
openfl.events.IOErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl.events.ErrorEvent.call(this,type,bubbles,cancelable,text,id);
};
$hxClasses["openfl.events.IOErrorEvent"] = openfl.events.IOErrorEvent;
openfl.events.IOErrorEvent.__name__ = ["openfl","events","IOErrorEvent"];
openfl.events.IOErrorEvent.__super__ = openfl.events.ErrorEvent;
openfl.events.IOErrorEvent.prototype = $extend(openfl.events.ErrorEvent.prototype,{
	toString: function() {
		return "[IOErrorEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " text=" + this.text + " errorID=" + this.errorID + "]";
	}
	,__class__: openfl.events.IOErrorEvent
});
openfl.events.KeyboardEvent = function(type,bubbles,cancelable,charCodeValue,keyCodeValue,keyLocationValue,ctrlKeyValue,altKeyValue,shiftKeyValue,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) commandKeyValue = false;
	if(controlKeyValue == null) controlKeyValue = false;
	if(shiftKeyValue == null) shiftKeyValue = false;
	if(altKeyValue == null) altKeyValue = false;
	if(ctrlKeyValue == null) ctrlKeyValue = false;
	if(keyCodeValue == null) keyCodeValue = 0;
	if(charCodeValue == null) charCodeValue = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.charCode = charCodeValue;
	this.keyCode = keyCodeValue;
	if(keyLocationValue != null) this.keyLocation = keyLocationValue; else this.keyLocation = 0;
	this.ctrlKey = ctrlKeyValue;
	this.altKey = altKeyValue;
	this.shiftKey = shiftKeyValue;
	this.controlKey = controlKeyValue;
	this.commandKey = commandKeyValue;
};
$hxClasses["openfl.events.KeyboardEvent"] = openfl.events.KeyboardEvent;
openfl.events.KeyboardEvent.__name__ = ["openfl","events","KeyboardEvent"];
openfl.events.KeyboardEvent.__super__ = openfl.events.Event;
openfl.events.KeyboardEvent.prototype = $extend(openfl.events.Event.prototype,{
	altKey: null
	,charCode: null
	,ctrlKey: null
	,commandKey: null
	,controlKey: null
	,keyCode: null
	,keyLocation: null
	,shiftKey: null
	,__class__: openfl.events.KeyboardEvent
});
openfl.events.MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["openfl.events.MouseEvent"] = openfl.events.MouseEvent;
openfl.events.MouseEvent.__name__ = ["openfl","events","MouseEvent"];
openfl.events.MouseEvent.__create = function(type,button,local,target) {
	var delta = 2;
	switch(type) {
	case openfl.events.MouseEvent.MOUSE_DOWN:case openfl.events.MouseEvent.MIDDLE_MOUSE_DOWN:case openfl.events.MouseEvent.RIGHT_MOUSE_DOWN:
		openfl.events.MouseEvent.__buttonDown[button] = true;
		break;
	case openfl.events.MouseEvent.MOUSE_UP:case openfl.events.MouseEvent.MIDDLE_MOUSE_UP:case openfl.events.MouseEvent.RIGHT_MOUSE_UP:
		openfl.events.MouseEvent.__buttonDown[button] = false;
		break;
	}
	var pseudoEvent = new openfl.events.MouseEvent(type,true,false,local.x,local.y,null,false,false,false,openfl.events.MouseEvent.__buttonDown[button],delta);
	pseudoEvent.stageX = openfl.Lib.current.stage.get_mouseX();
	pseudoEvent.stageY = openfl.Lib.current.stage.get_mouseY();
	pseudoEvent.target = target;
	return pseudoEvent;
};
openfl.events.MouseEvent.__super__ = openfl.events.Event;
openfl.events.MouseEvent.prototype = $extend(openfl.events.Event.prototype,{
	altKey: null
	,buttonDown: null
	,commandKey: null
	,clickCount: null
	,ctrlKey: null
	,delta: null
	,localX: null
	,localY: null
	,relatedObject: null
	,shiftKey: null
	,stageX: null
	,stageY: null
	,__class__: openfl.events.MouseEvent
});
openfl.events.ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) bytesTotal = 0;
	if(bytesLoaded == null) bytesLoaded = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["openfl.events.ProgressEvent"] = openfl.events.ProgressEvent;
openfl.events.ProgressEvent.__name__ = ["openfl","events","ProgressEvent"];
openfl.events.ProgressEvent.__super__ = openfl.events.Event;
openfl.events.ProgressEvent.prototype = $extend(openfl.events.Event.prototype,{
	bytesLoaded: null
	,bytesTotal: null
	,__class__: openfl.events.ProgressEvent
});
openfl.events.SecurityErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	openfl.events.ErrorEvent.call(this,type,bubbles,cancelable,text,id);
};
$hxClasses["openfl.events.SecurityErrorEvent"] = openfl.events.SecurityErrorEvent;
openfl.events.SecurityErrorEvent.__name__ = ["openfl","events","SecurityErrorEvent"];
openfl.events.SecurityErrorEvent.__super__ = openfl.events.ErrorEvent;
openfl.events.SecurityErrorEvent.prototype = $extend(openfl.events.ErrorEvent.prototype,{
	toString: function() {
		return "[SecurityErrorEvent type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + " text=" + this.text + " errorID=" + this.errorID + "]";
	}
	,__class__: openfl.events.SecurityErrorEvent
});
openfl.events.TouchEvent = function(type,bubbles,cancelable,localX,localY,sizeX,sizeY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(sizeY == null) sizeY = 1;
	if(sizeX == null) sizeX = 1;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	openfl.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.pressure = 1;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["openfl.events.TouchEvent"] = openfl.events.TouchEvent;
openfl.events.TouchEvent.__name__ = ["openfl","events","TouchEvent"];
openfl.events.TouchEvent.__create = function(type,touch,local,target) {
	var evt = new openfl.events.TouchEvent(type,true,false,local.x,local.y,null,null,null,false,false,false,false,0,null,0);
	evt.stageX = openfl.Lib.current.stage.get_mouseX();
	evt.stageY = openfl.Lib.current.stage.get_mouseY();
	evt.target = target;
	return evt;
};
openfl.events.TouchEvent.__super__ = openfl.events.Event;
openfl.events.TouchEvent.prototype = $extend(openfl.events.Event.prototype,{
	altKey: null
	,buttonDown: null
	,commandKey: null
	,ctrlKey: null
	,delta: null
	,isPrimaryTouchPoint: null
	,localX: null
	,localY: null
	,pressure: null
	,relatedObject: null
	,shiftKey: null
	,sizeX: null
	,sizeY: null
	,stageX: null
	,stageY: null
	,touchPointID: null
	,__class__: openfl.events.TouchEvent
});
openfl.media = {};
openfl.media.ID3Info = function() { };
$hxClasses["openfl.media.ID3Info"] = openfl.media.ID3Info;
openfl.media.ID3Info.__name__ = ["openfl","media","ID3Info"];
openfl.media.Sound = function(stream,context) {
	openfl.events.EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.length = 0;
	this.url = null;
	if(stream != null) this.load(stream,context);
};
$hxClasses["openfl.media.Sound"] = openfl.media.Sound;
openfl.media.Sound.__name__ = ["openfl","media","Sound"];
openfl.media.Sound.__super__ = openfl.events.EventDispatcher;
openfl.media.Sound.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	bytesLoaded: null
	,bytesTotal: null
	,id3: null
	,isBuffering: null
	,length: null
	,url: null
	,__soundID: null
	,load: function(stream,context) {
		this.url = stream.url;
		this.__soundID = haxe.io.Path.withoutExtension(stream.url);
		if(!openfl.media.Sound.__registeredSounds.exists(this.__soundID)) {
			openfl.media.Sound.__registeredSounds.set(this.__soundID,true);
			createjs.Sound.addEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.addEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			createjs.Sound.registerSound(this.url,this.__soundID);
		} else this.dispatchEvent(new openfl.events.Event(openfl.events.Event.COMPLETE));
	}
	,SoundJS_onFileLoad: function(event) {
		if(event.id == this.__soundID) {
			createjs.Sound.removeEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.removeEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			this.dispatchEvent(new openfl.events.Event(openfl.events.Event.COMPLETE));
		}
	}
	,SoundJS_onFileError: function(event) {
		if(event.id == this.__soundID) {
			createjs.Sound.removeEventListener("fileload",$bind(this,this.SoundJS_onFileLoad));
			createjs.Sound.removeEventListener("fileerror",$bind(this,this.SoundJS_onFileError));
			this.dispatchEvent(new openfl.events.IOErrorEvent(openfl.events.IOErrorEvent.IO_ERROR));
		}
	}
	,__class__: openfl.media.Sound
});
openfl.media.SoundLoaderContext = function() { };
$hxClasses["openfl.media.SoundLoaderContext"] = openfl.media.SoundLoaderContext;
openfl.media.SoundLoaderContext.__name__ = ["openfl","media","SoundLoaderContext"];
openfl.net = {};
openfl.net.URLLoader = function(request) {
	openfl.events.EventDispatcher.call(this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(openfl.net.URLLoaderDataFormat.TEXT);
	if(request != null) this.load(request);
};
$hxClasses["openfl.net.URLLoader"] = openfl.net.URLLoader;
openfl.net.URLLoader.__name__ = ["openfl","net","URLLoader"];
openfl.net.URLLoader.__super__ = openfl.events.EventDispatcher;
openfl.net.URLLoader.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	bytesLoaded: null
	,bytesTotal: null
	,data: null
	,dataFormat: null
	,getData: function() {
		return null;
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,registerEvents: function(subject) {
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s;
			try {
				s = subject.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) self.onStatus(s);
			if(s != null && s >= 200 && s < 400) self.onData(subject.response); else if(s == null) self.onError("Failed to connect or resolve host"); else if(s == 12029) self.onError("Failed to connect to host"); else if(s == 12007) self.onError("Unknown host"); else if(s == 0) {
				self.onError("Unable to make request (may be blocked due to cross-domain permissions)");
				self.onSecurityError("Unable to make request (may be blocked due to cross-domain permissions)");
			} else self.onError("Http Error #" + subject.status);
		};
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js.Boot.__instanceof(data,lime.utils.ByteArray)) {
			var data1 = data;
			var _g = this.dataFormat;
			switch(_g[1]) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js.Boot.__instanceof(data,openfl.net.URLVariables)) {
			var data2 = data;
			var _g1 = 0;
			var _g11 = Reflect.fields(data2);
			while(_g1 < _g11.length) {
				var p = _g11[_g1];
				++_g1;
				if(uri.length != 0) uri += "&";
				uri += encodeURIComponent(p) + "=" + StringTools.urlEncode(Reflect.field(data2,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open(method,url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(method,url,true);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		var _g2 = this.dataFormat;
		switch(_g2[1]) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g3 = 0;
		while(_g3 < requestHeaders.length) {
			var header = requestHeaders[_g3];
			++_g3;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		this.onOpen();
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,onData: function(_) {
		var content = this.getData();
		var _g = this.dataFormat;
		switch(_g[1]) {
		case 0:
			this.data = lime.utils.ByteArray.__ofBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var evt = new openfl.events.Event(openfl.events.Event.COMPLETE);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onError: function(msg) {
		var evt = new openfl.events.IOErrorEvent(openfl.events.IOErrorEvent.IO_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onOpen: function() {
		var evt = new openfl.events.Event(openfl.events.Event.OPEN);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onProgress: function(event) {
		var evt = new openfl.events.ProgressEvent(openfl.events.ProgressEvent.PROGRESS);
		evt.currentTarget = this;
		evt.bytesLoaded = event.loaded;
		evt.bytesTotal = event.total;
		this.dispatchEvent(evt);
	}
	,onSecurityError: function(msg) {
		var evt = new openfl.events.SecurityErrorEvent(openfl.events.SecurityErrorEvent.SECURITY_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onStatus: function(status) {
		var evt = new openfl.events.HTTPStatusEvent(openfl.events.HTTPStatusEvent.HTTP_STATUS,false,false,status);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,set_dataFormat: function(inputVal) {
		if(inputVal == openfl.net.URLLoaderDataFormat.BINARY && !Reflect.hasField(window,"ArrayBuffer")) this.dataFormat = openfl.net.URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,__class__: openfl.net.URLLoader
	,__properties__: {set_dataFormat:"set_dataFormat"}
});
openfl.net.URLLoaderDataFormat = $hxClasses["openfl.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] };
openfl.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
openfl.net.URLLoaderDataFormat.BINARY.toString = $estr;
openfl.net.URLLoaderDataFormat.BINARY.__enum__ = openfl.net.URLLoaderDataFormat;
openfl.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
openfl.net.URLLoaderDataFormat.TEXT.toString = $estr;
openfl.net.URLLoaderDataFormat.TEXT.__enum__ = openfl.net.URLLoaderDataFormat;
openfl.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
openfl.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
openfl.net.URLLoaderDataFormat.VARIABLES.__enum__ = openfl.net.URLLoaderDataFormat;
openfl.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = openfl.net.URLRequestMethod.GET;
	this.contentType = null;
};
$hxClasses["openfl.net.URLRequest"] = openfl.net.URLRequest;
openfl.net.URLRequest.__name__ = ["openfl","net","URLRequest"];
openfl.net.URLRequest.prototype = {
	contentType: null
	,data: null
	,method: null
	,requestHeaders: null
	,url: null
	,formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == openfl.net.URLRequestMethod.GET || this.data == null) return res;
		if(typeof(this.data) == "string" || js.Boot.__instanceof(this.data,lime.utils.ByteArray)) {
			res = res.slice();
			res.push(new openfl.net.URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: openfl.net.URLRequest
};
openfl.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["openfl.net.URLRequestHeader"] = openfl.net.URLRequestHeader;
openfl.net.URLRequestHeader.__name__ = ["openfl","net","URLRequestHeader"];
openfl.net.URLRequestHeader.prototype = {
	name: null
	,value: null
	,__class__: openfl.net.URLRequestHeader
};
openfl.net.URLRequestMethod = function() { };
$hxClasses["openfl.net.URLRequestMethod"] = openfl.net.URLRequestMethod;
openfl.net.URLRequestMethod.__name__ = ["openfl","net","URLRequestMethod"];
openfl.net.URLVariables = function() { };
$hxClasses["openfl.net.URLVariables"] = openfl.net.URLVariables;
openfl.net.URLVariables.__name__ = ["openfl","net","URLVariables"];
var org = {};
org.swiftsuspenders = {};
org.swiftsuspenders.InjectionEvent = function(type,instance,instanceType) {
	openfl.events.Event.call(this,type);
	this.instance = instance;
	this.instanceType = instanceType;
};
$hxClasses["org.swiftsuspenders.InjectionEvent"] = org.swiftsuspenders.InjectionEvent;
org.swiftsuspenders.InjectionEvent.__name__ = ["org","swiftsuspenders","InjectionEvent"];
org.swiftsuspenders.InjectionEvent.__super__ = openfl.events.Event;
org.swiftsuspenders.InjectionEvent.prototype = $extend(openfl.events.Event.prototype,{
	instance: null
	,instanceType: null
	,clone: function() {
		return new org.swiftsuspenders.InjectionEvent(this.type,this.instance,this.instanceType);
	}
	,__class__: org.swiftsuspenders.InjectionEvent
});
org.swiftsuspenders.utils = {};
org.swiftsuspenders.utils.CallProxy = function() {
};
$hxClasses["org.swiftsuspenders.utils.CallProxy"] = org.swiftsuspenders.utils.CallProxy;
org.swiftsuspenders.utils.CallProxy.__name__ = ["org","swiftsuspenders","utils","CallProxy"];
org.swiftsuspenders.utils.CallProxy.replaceClassName = function(c) {
	var className = org.swiftsuspenders.utils.CallProxy.getClassName(c);
	className = className.split("flash.").join("openfl.");
	return className;
};
org.swiftsuspenders.utils.CallProxy.getClassName = function(c) {
	var className = Type.getClassName(c);
	return className;
};
org.swiftsuspenders.utils.CallProxy.hasField = function(o,field) {
	var fields;
	var clazz;
	if(js.Boot.__instanceof(o,Class)) {
		clazz = o;
		fields = Type.getInstanceFields(clazz);
	} else fields = Reflect.fields(o);
	var _g1 = 0;
	var _g = fields.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(fields[i] == field) return true;
	}
	var f = Reflect.getProperty(o,field);
	var isFunction = Reflect.isFunction(f);
	var isObject = Reflect.isObject(f);
	if(isFunction || isObject) return true; else return false;
};
org.swiftsuspenders.utils.CallProxy.createInstance = function(cl,args) {
	var instance = Type.createInstance(cl,args);
	return instance;
};
org.swiftsuspenders.utils.CallProxy.prototype = {
	__class__: org.swiftsuspenders.utils.CallProxy
};
org.swiftsuspenders.Injector = function() {
	this.providerMappings = new haxe.ds.StringMap();
	this._mappings = new haxe.ds.StringMap();
	this._mappingsInProcess = new haxe.ds.StringMap();
	this._managedObjects = new haxe.ds.StringMap();
	this._reflector = new org.swiftsuspenders.reflection.DescribeTypeRTTIReflector();
	this._classDescriptor = new org.swiftsuspenders.utils.TypeDescriptor(this._reflector,org.swiftsuspenders.Injector.INJECTION_POINTS_CACHE);
	this.set_applicationDomain(openfl.system.ApplicationDomain.currentDomain);
	openfl.events.EventDispatcher.call(this);
};
$hxClasses["org.swiftsuspenders.Injector"] = org.swiftsuspenders.Injector;
org.swiftsuspenders.Injector.__name__ = ["org","swiftsuspenders","Injector"];
org.swiftsuspenders.Injector.initBaseTypeMappingIds = function(types) {
	var returnArray = new Array();
	var _g1 = 0;
	var _g = types.length;
	while(_g1 < _g) {
		var i = _g1++;
		returnArray.push(org.swiftsuspenders.utils.CallProxy.replaceClassName(types[i]) + "|");
	}
	return returnArray;
};
org.swiftsuspenders.Injector.purgeInjectionPointsCache = function() {
	org.swiftsuspenders.Injector.INJECTION_POINTS_CACHE = new haxe.ds.StringMap();
};
org.swiftsuspenders.Injector.__super__ = openfl.events.EventDispatcher;
org.swiftsuspenders.Injector.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	parentInjector: null
	,set_parentInjector: function(parentInjector) {
		this.parentInjector = parentInjector;
		return this.get_parentInjector();
	}
	,get_parentInjector: function() {
		return this.parentInjector;
	}
	,applicationDomain: null
	,set_applicationDomain: function(applicationDomain) {
		if(applicationDomain != null) this.applicationDomain = applicationDomain; else this.applicationDomain = openfl.system.ApplicationDomain.currentDomain;
		return this.get_applicationDomain();
	}
	,get_applicationDomain: function() {
		return this.applicationDomain;
	}
	,_classDescriptor: null
	,_mappings: null
	,_mappingsInProcess: null
	,_managedObjects: null
	,_reflector: null
	,fallbackProvider: null
	,get_fallbackProvider: function() {
		return this.fallbackProvider;
	}
	,set_fallbackProvider: function(provider) {
		this.fallbackProvider = provider;
		return provider;
	}
	,blockParentFallbackProvider: null
	,get_blockParentFallbackProvider: function() {
		return this.blockParentFallbackProvider;
	}
	,set_blockParentFallbackProvider: function(value) {
		this.blockParentFallbackProvider = value;
		return value;
	}
	,providerMappings: null
	,map: function(type,name) {
		if(name == null) name = "";
		var mappingId = org.swiftsuspenders.utils.CallProxy.replaceClassName(type) + "|" + name;
		if(this._mappings.get(mappingId) != null) return this._mappings.get(mappingId);
		return this.createMapping(type,name,mappingId);
	}
	,unmap: function(type,name) {
		if(name == null) name = "";
		var mappingId = org.swiftsuspenders.utils.CallProxy.replaceClassName(type) + "|" + name;
		var mapping = this._mappings.get(mappingId);
		if(mapping != null && mapping.get_isSealed()) throw new org.swiftsuspenders.errors.InjectorError("Can't unmap a sealed mapping");
		if(mapping == null) throw new org.swiftsuspenders.errors.InjectorError("Error while removing an injector mapping: " + "No mapping defined for dependency " + mappingId);
		mapping.getProvider().destroy();
		this._mappings.remove(mappingId);
		this.providerMappings.remove(mappingId);
		this.hasEventListener(org.swiftsuspenders.mapping.MappingEvent.POST_MAPPING_REMOVE) && this.dispatchEvent(new org.swiftsuspenders.mapping.MappingEvent(org.swiftsuspenders.mapping.MappingEvent.POST_MAPPING_REMOVE,type,name,null));
	}
	,satisfies: function(type,name) {
		if(name == null) name = "";
		var mappingId = org.swiftsuspenders.utils.CallProxy.replaceClassName(type) + "|" + name;
		return this.getProvider(mappingId,true) != null;
	}
	,satisfiesDirectly: function(type,name) {
		if(name == null) name = "";
		return this.hasDirectMapping(type,name) || this.getDefaultProvider(org.swiftsuspenders.utils.CallProxy.replaceClassName(type) + "|" + name,false) != null;
	}
	,getMapping: function(type,name) {
		if(name == null) name = "";
		var mappingId = org.swiftsuspenders.utils.CallProxy.replaceClassName(type) + "|" + name;
		var mapping = this._mappings.get(mappingId);
		if(mapping == null) throw new org.swiftsuspenders.errors.InjectorMissingMappingError("Error while retrieving an injector mapping: " + "No mapping defined for dependency " + mappingId);
		return mapping;
	}
	,hasManagedInstance: function(instance) {
		var key = org.swiftsuspenders.utils.UID.instanceID(instance);
		return this._managedObjects.get(key);
	}
	,injectInto: function(target) {
		var type = this._reflector.getClass(target);
		this.applyInjectionPoints(target,type,this._classDescriptor.getDescription(type));
	}
	,getInstance: function(type,name,targetType) {
		if(name == null) name = "";
		var mappingId = org.swiftsuspenders.utils.CallProxy.replaceClassName(type) + "|" + name;
		var provider;
		if(this.getProvider(mappingId) != null) provider = this.getProvider(mappingId); else provider = this.getDefaultProvider(mappingId,true);
		if(provider != null) {
			var ctor = this._classDescriptor.getDescription(type).ctor;
			var returnVal;
			if(ctor != null) returnVal = provider.apply(targetType,this,ctor.injectParameters); else returnVal = provider.apply(targetType,this,null);
			return returnVal;
		}
		var fallbackMessage;
		if(this.get_fallbackProvider() != null) fallbackMessage = "the fallbackProvider, '" + Std.string(this.get_fallbackProvider()) + "', was unable to fulfill this request."; else fallbackMessage = "the injector has no fallbackProvider.";
		throw new org.swiftsuspenders.errors.InjectorMissingMappingError("No mapping found for request " + mappingId + " and " + fallbackMessage);
	}
	,getOrCreateNewInstance: function(type) {
		var _satisfies = this.satisfies(type);
		if(_satisfies) return this.getInstance(type); else return this.instantiateUnmapped(type);
	}
	,instantiateUnmapped: function(type) {
		if(!this.canBeInstantiated(type)) throw new org.swiftsuspenders.errors.InjectorInterfaceConstructionError("Can't instantiate interface " + org.swiftsuspenders.utils.CallProxy.replaceClassName(type));
		var description = this._classDescriptor.getDescription(type);
		var instance = description.ctor.createInstance(type,this);
		if(this.hasEventListener(org.swiftsuspenders.InjectionEvent.POST_INSTANTIATE)) this.dispatchEvent(new org.swiftsuspenders.InjectionEvent(org.swiftsuspenders.InjectionEvent.POST_INSTANTIATE,instance,type));
		this.applyInjectionPoints(instance,type,description);
		return instance;
	}
	,destroyInstance: function(instance) {
		var k = org.swiftsuspenders.utils.UID.clearInstanceID(instance);
		this._managedObjects.set(k,null);
		null;
		var type = this._reflector.getClass(instance);
		var typeDescription = this.getTypeDescription(type);
	}
	,teardown: function() {
		var $it0 = this._mappings.iterator();
		while( $it0.hasNext() ) {
			var mapping = $it0.next();
			mapping.getProvider().destroy();
		}
		var objectsToRemove = new Array();
		var fields;
		var $it1 = this._managedObjects.iterator();
		while( $it1.hasNext() ) {
			var instance = $it1.next();
			if(instance) objectsToRemove.push(instance);
		}
		while(objectsToRemove.length > 0) this.destroyInstance(objectsToRemove.pop());
		fields = Reflect.fields(this.providerMappings);
		var _g = 0;
		while(_g < fields.length) {
			var mappingId = fields[_g];
			++_g;
			this.providerMappings.remove(mappingId);
		}
		this._mappings = new haxe.ds.StringMap();
		this._mappingsInProcess = new haxe.ds.StringMap();
		this._managedObjects = new haxe.ds.StringMap();
		this.set_fallbackProvider(null);
		this.set_blockParentFallbackProvider(false);
	}
	,createChildInjector: function(applicationDomain) {
		var injector = new org.swiftsuspenders.Injector();
		if(applicationDomain != null) injector.set_applicationDomain(applicationDomain); else injector.set_applicationDomain(this.get_applicationDomain());
		injector.set_parentInjector(this);
		return injector;
	}
	,addTypeDescription: function(type,description) {
		this._classDescriptor.addDescription(type,description);
	}
	,getTypeDescription: function(type) {
		return this._reflector.describeInjections(type);
	}
	,hasMapping: function(type,name) {
		if(name == null) name = "";
		return this.getProvider(org.swiftsuspenders.utils.CallProxy.replaceClassName(type) + "|" + name) != null;
	}
	,hasDirectMapping: function(type,name) {
		if(name == null) name = "";
		return (function($this) {
			var $r;
			var key = org.swiftsuspenders.utils.CallProxy.replaceClassName(type) + "|" + name;
			$r = $this._mappings.get(key);
			return $r;
		}(this)) != null;
	}
	,canBeInstantiated: function(type) {
		var description = this._classDescriptor.getDescription(type);
		return description.ctor != null;
	}
	,getProvider: function(mappingId,fallbackToDefault) {
		if(fallbackToDefault == null) fallbackToDefault = true;
		var softProvider = null;
		var injector = this;
		while(injector != null) {
			var provider = injector.providerMappings.get(mappingId);
			if(provider != null) {
				if(js.Boot.__instanceof(provider,org.swiftsuspenders.dependencyproviders.SoftDependencyProvider)) {
					softProvider = provider;
					injector = injector.get_parentInjector();
					continue;
				}
				if(js.Boot.__instanceof(provider,org.swiftsuspenders.dependencyproviders.LocalOnlyProvider) && injector != this) {
					injector = injector.get_parentInjector();
					continue;
				}
				return provider;
			}
			injector = injector.get_parentInjector();
		}
		if(softProvider != null) return softProvider;
		if(fallbackToDefault) return this.getDefaultProvider(mappingId,true); else return null;
	}
	,getDefaultProvider: function(mappingId,consultParents) {
		if(HxOverrides.indexOf(org.swiftsuspenders.Injector._baseTypes,mappingId,0) > -1) return null;
		if(this.get_fallbackProvider() != null && this.get_fallbackProvider().prepareNextRequest(mappingId)) return this.get_fallbackProvider();
		if(consultParents && this.get_blockParentFallbackProvider() && this.get_parentInjector() != null) return this.get_parentInjector().getDefaultProvider(mappingId,consultParents);
		return null;
	}
	,createMapping: function(type,name,mappingId) {
		if(this._mappingsInProcess.get(mappingId)) throw new org.swiftsuspenders.errors.InjectorError("Can't change a mapping from inside a listener to it's creation event");
		this._mappingsInProcess.set(mappingId,true);
		true;
		this.hasEventListener(org.swiftsuspenders.mapping.MappingEvent.PRE_MAPPING_CREATE) && this.dispatchEvent(new org.swiftsuspenders.mapping.MappingEvent(org.swiftsuspenders.mapping.MappingEvent.PRE_MAPPING_CREATE,type,name,null));
		var mapping = new org.swiftsuspenders.mapping.InjectionMapping(this,type,name,mappingId);
		this._mappings.set(mappingId,mapping);
		mapping;
		var sealKey = mapping.seal();
		this.hasEventListener(org.swiftsuspenders.mapping.MappingEvent.POST_MAPPING_CREATE) && this.dispatchEvent(new org.swiftsuspenders.mapping.MappingEvent(org.swiftsuspenders.mapping.MappingEvent.POST_MAPPING_CREATE,type,name,mapping));
		this._mappingsInProcess.remove(mappingId);
		mapping.unseal(sealKey);
		return mapping;
	}
	,applyInjectionPoints: function(target,targetType,description) {
		var injectionPoint = description.injectionPoints;
		if(this.hasEventListener(org.swiftsuspenders.InjectionEvent.PRE_CONSTRUCT)) this.dispatchEvent(new org.swiftsuspenders.InjectionEvent(org.swiftsuspenders.InjectionEvent.PRE_CONSTRUCT,target,targetType));
		while(injectionPoint != null) {
			injectionPoint.applyInjection(target,targetType,this);
			injectionPoint = injectionPoint.next;
		}
		if(description.preDestroyMethods != null) {
			var k = org.swiftsuspenders.utils.UID.instanceID(target);
			var v = target;
			this._managedObjects.set(k,v);
			v;
		}
		this.hasEventListener(org.swiftsuspenders.InjectionEvent.POST_CONSTRUCT) && this.dispatchEvent(new org.swiftsuspenders.InjectionEvent(org.swiftsuspenders.InjectionEvent.POST_CONSTRUCT,target,targetType));
	}
	,__class__: org.swiftsuspenders.Injector
	,__properties__: {set_blockParentFallbackProvider:"set_blockParentFallbackProvider",get_blockParentFallbackProvider:"get_blockParentFallbackProvider",set_fallbackProvider:"set_fallbackProvider",get_fallbackProvider:"get_fallbackProvider",set_applicationDomain:"set_applicationDomain",get_applicationDomain:"get_applicationDomain",set_parentInjector:"set_parentInjector",get_parentInjector:"get_parentInjector"}
});
org.swiftsuspenders.dependencyproviders = {};
org.swiftsuspenders.dependencyproviders.DependencyProvider = function() { };
$hxClasses["org.swiftsuspenders.dependencyproviders.DependencyProvider"] = org.swiftsuspenders.dependencyproviders.DependencyProvider;
org.swiftsuspenders.dependencyproviders.DependencyProvider.__name__ = ["org","swiftsuspenders","dependencyproviders","DependencyProvider"];
org.swiftsuspenders.dependencyproviders.DependencyProvider.prototype = {
	apply: null
	,destroy: null
	,__class__: org.swiftsuspenders.dependencyproviders.DependencyProvider
};
org.swiftsuspenders.dependencyproviders.ClassProvider = function(responseType) {
	this._responseType = responseType;
};
$hxClasses["org.swiftsuspenders.dependencyproviders.ClassProvider"] = org.swiftsuspenders.dependencyproviders.ClassProvider;
org.swiftsuspenders.dependencyproviders.ClassProvider.__name__ = ["org","swiftsuspenders","dependencyproviders","ClassProvider"];
org.swiftsuspenders.dependencyproviders.ClassProvider.__interfaces__ = [org.swiftsuspenders.dependencyproviders.DependencyProvider];
org.swiftsuspenders.dependencyproviders.ClassProvider.prototype = {
	_responseType: null
	,apply: function(targetType,activeInjector,injectParameters) {
		return activeInjector.instantiateUnmapped(this._responseType);
	}
	,destroy: function() {
	}
	,__class__: org.swiftsuspenders.dependencyproviders.ClassProvider
};
org.swiftsuspenders.dependencyproviders.FallbackDependencyProvider = function() { };
$hxClasses["org.swiftsuspenders.dependencyproviders.FallbackDependencyProvider"] = org.swiftsuspenders.dependencyproviders.FallbackDependencyProvider;
org.swiftsuspenders.dependencyproviders.FallbackDependencyProvider.__name__ = ["org","swiftsuspenders","dependencyproviders","FallbackDependencyProvider"];
org.swiftsuspenders.dependencyproviders.FallbackDependencyProvider.__interfaces__ = [org.swiftsuspenders.dependencyproviders.DependencyProvider];
org.swiftsuspenders.dependencyproviders.FallbackDependencyProvider.prototype = {
	prepareNextRequest: null
	,__class__: org.swiftsuspenders.dependencyproviders.FallbackDependencyProvider
};
org.swiftsuspenders.dependencyproviders.ForwardingProvider = function(provider) {
	this.provider = provider;
};
$hxClasses["org.swiftsuspenders.dependencyproviders.ForwardingProvider"] = org.swiftsuspenders.dependencyproviders.ForwardingProvider;
org.swiftsuspenders.dependencyproviders.ForwardingProvider.__name__ = ["org","swiftsuspenders","dependencyproviders","ForwardingProvider"];
org.swiftsuspenders.dependencyproviders.ForwardingProvider.__interfaces__ = [org.swiftsuspenders.dependencyproviders.DependencyProvider];
org.swiftsuspenders.dependencyproviders.ForwardingProvider.prototype = {
	provider: null
	,apply: function(targetType,activeInjector,injectParameters) {
		return this.provider.apply(targetType,activeInjector,injectParameters);
	}
	,destroy: function() {
		this.provider.destroy();
	}
	,__class__: org.swiftsuspenders.dependencyproviders.ForwardingProvider
};
org.swiftsuspenders.dependencyproviders.InjectorUsingProvider = function(injector,provider) {
	org.swiftsuspenders.dependencyproviders.ForwardingProvider.call(this,provider);
	this.injector = injector;
};
$hxClasses["org.swiftsuspenders.dependencyproviders.InjectorUsingProvider"] = org.swiftsuspenders.dependencyproviders.InjectorUsingProvider;
org.swiftsuspenders.dependencyproviders.InjectorUsingProvider.__name__ = ["org","swiftsuspenders","dependencyproviders","InjectorUsingProvider"];
org.swiftsuspenders.dependencyproviders.InjectorUsingProvider.__super__ = org.swiftsuspenders.dependencyproviders.ForwardingProvider;
org.swiftsuspenders.dependencyproviders.InjectorUsingProvider.prototype = $extend(org.swiftsuspenders.dependencyproviders.ForwardingProvider.prototype,{
	injector: null
	,apply: function(targetType,activeInjector,injectParameters) {
		return this.provider.apply(targetType,this.injector,injectParameters);
	}
	,__class__: org.swiftsuspenders.dependencyproviders.InjectorUsingProvider
});
org.swiftsuspenders.dependencyproviders.LocalOnlyProvider = function(provider) {
	org.swiftsuspenders.dependencyproviders.ForwardingProvider.call(this,provider);
};
$hxClasses["org.swiftsuspenders.dependencyproviders.LocalOnlyProvider"] = org.swiftsuspenders.dependencyproviders.LocalOnlyProvider;
org.swiftsuspenders.dependencyproviders.LocalOnlyProvider.__name__ = ["org","swiftsuspenders","dependencyproviders","LocalOnlyProvider"];
org.swiftsuspenders.dependencyproviders.LocalOnlyProvider.__super__ = org.swiftsuspenders.dependencyproviders.ForwardingProvider;
org.swiftsuspenders.dependencyproviders.LocalOnlyProvider.prototype = $extend(org.swiftsuspenders.dependencyproviders.ForwardingProvider.prototype,{
	__class__: org.swiftsuspenders.dependencyproviders.LocalOnlyProvider
});
org.swiftsuspenders.dependencyproviders.SingletonProvider = function(responseType,creatingInjector) {
	this._responseType = responseType;
	this._creatingInjector = creatingInjector;
};
$hxClasses["org.swiftsuspenders.dependencyproviders.SingletonProvider"] = org.swiftsuspenders.dependencyproviders.SingletonProvider;
org.swiftsuspenders.dependencyproviders.SingletonProvider.__name__ = ["org","swiftsuspenders","dependencyproviders","SingletonProvider"];
org.swiftsuspenders.dependencyproviders.SingletonProvider.__interfaces__ = [org.swiftsuspenders.dependencyproviders.DependencyProvider];
org.swiftsuspenders.dependencyproviders.SingletonProvider.prototype = {
	_responseType: null
	,_creatingInjector: null
	,_response: null
	,_destroyed: null
	,apply: function(targetType,activeInjector,injectParameters) {
		if(this._response == null) this._response = this.createResponse(this._creatingInjector);
		return this._response;
	}
	,createResponse: function(injector) {
		if(this._destroyed) throw new org.swiftsuspenders.errors.InjectorError("Forbidden usage of unmapped singleton provider for type " + org.swiftsuspenders.utils.CallProxy.replaceClassName(this._responseType));
		return injector.instantiateUnmapped(this._responseType);
	}
	,destroy: function() {
		this._destroyed = true;
		if(this._response != null && this._creatingInjector != null && this._creatingInjector.hasManagedInstance(this._response)) this._creatingInjector.destroyInstance(this._response);
		this._creatingInjector = null;
		this._response = null;
	}
	,__class__: org.swiftsuspenders.dependencyproviders.SingletonProvider
};
org.swiftsuspenders.dependencyproviders.SoftDependencyProvider = function(provider) {
	org.swiftsuspenders.dependencyproviders.ForwardingProvider.call(this,provider);
};
$hxClasses["org.swiftsuspenders.dependencyproviders.SoftDependencyProvider"] = org.swiftsuspenders.dependencyproviders.SoftDependencyProvider;
org.swiftsuspenders.dependencyproviders.SoftDependencyProvider.__name__ = ["org","swiftsuspenders","dependencyproviders","SoftDependencyProvider"];
org.swiftsuspenders.dependencyproviders.SoftDependencyProvider.__super__ = org.swiftsuspenders.dependencyproviders.ForwardingProvider;
org.swiftsuspenders.dependencyproviders.SoftDependencyProvider.prototype = $extend(org.swiftsuspenders.dependencyproviders.ForwardingProvider.prototype,{
	__class__: org.swiftsuspenders.dependencyproviders.SoftDependencyProvider
});
org.swiftsuspenders.dependencyproviders.ValueProvider = function(value,creatingInjector) {
	this._value = value;
	this._creatingInjector = creatingInjector;
};
$hxClasses["org.swiftsuspenders.dependencyproviders.ValueProvider"] = org.swiftsuspenders.dependencyproviders.ValueProvider;
org.swiftsuspenders.dependencyproviders.ValueProvider.__name__ = ["org","swiftsuspenders","dependencyproviders","ValueProvider"];
org.swiftsuspenders.dependencyproviders.ValueProvider.__interfaces__ = [org.swiftsuspenders.dependencyproviders.DependencyProvider];
org.swiftsuspenders.dependencyproviders.ValueProvider.prototype = {
	_value: null
	,_creatingInjector: null
	,apply: function(targetType,activeInjector,injectParameters) {
		return this._value;
	}
	,destroy: function() {
		if(this._value != null && this._creatingInjector != null && this._creatingInjector.hasManagedInstance(this._value)) this._creatingInjector.destroyInstance(this._value);
		this._creatingInjector = null;
		this._value = null;
	}
	,__class__: org.swiftsuspenders.dependencyproviders.ValueProvider
};
org.swiftsuspenders.errors = {};
org.swiftsuspenders.errors.InjectorError = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	openfl.errors.Error.call(this,message,id);
};
$hxClasses["org.swiftsuspenders.errors.InjectorError"] = org.swiftsuspenders.errors.InjectorError;
org.swiftsuspenders.errors.InjectorError.__name__ = ["org","swiftsuspenders","errors","InjectorError"];
org.swiftsuspenders.errors.InjectorError.__super__ = openfl.errors.Error;
org.swiftsuspenders.errors.InjectorError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: org.swiftsuspenders.errors.InjectorError
});
org.swiftsuspenders.errors.InjectorInterfaceConstructionError = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	org.swiftsuspenders.errors.InjectorError.call(this,message,id);
};
$hxClasses["org.swiftsuspenders.errors.InjectorInterfaceConstructionError"] = org.swiftsuspenders.errors.InjectorInterfaceConstructionError;
org.swiftsuspenders.errors.InjectorInterfaceConstructionError.__name__ = ["org","swiftsuspenders","errors","InjectorInterfaceConstructionError"];
org.swiftsuspenders.errors.InjectorInterfaceConstructionError.__super__ = org.swiftsuspenders.errors.InjectorError;
org.swiftsuspenders.errors.InjectorInterfaceConstructionError.prototype = $extend(org.swiftsuspenders.errors.InjectorError.prototype,{
	__class__: org.swiftsuspenders.errors.InjectorInterfaceConstructionError
});
org.swiftsuspenders.errors.InjectorMissingMappingError = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	org.swiftsuspenders.errors.InjectorError.call(this,message,id);
};
$hxClasses["org.swiftsuspenders.errors.InjectorMissingMappingError"] = org.swiftsuspenders.errors.InjectorMissingMappingError;
org.swiftsuspenders.errors.InjectorMissingMappingError.__name__ = ["org","swiftsuspenders","errors","InjectorMissingMappingError"];
org.swiftsuspenders.errors.InjectorMissingMappingError.__super__ = org.swiftsuspenders.errors.InjectorError;
org.swiftsuspenders.errors.InjectorMissingMappingError.prototype = $extend(org.swiftsuspenders.errors.InjectorError.prototype,{
	__class__: org.swiftsuspenders.errors.InjectorMissingMappingError
});
org.swiftsuspenders.mapping = {};
org.swiftsuspenders.mapping.UnsealedMapping = function() { };
$hxClasses["org.swiftsuspenders.mapping.UnsealedMapping"] = org.swiftsuspenders.mapping.UnsealedMapping;
org.swiftsuspenders.mapping.UnsealedMapping.__name__ = ["org","swiftsuspenders","mapping","UnsealedMapping"];
org.swiftsuspenders.mapping.UnsealedMapping.prototype = {
	seal: null
	,__class__: org.swiftsuspenders.mapping.UnsealedMapping
};
org.swiftsuspenders.mapping.ProviderlessMapping = function() { };
$hxClasses["org.swiftsuspenders.mapping.ProviderlessMapping"] = org.swiftsuspenders.mapping.ProviderlessMapping;
org.swiftsuspenders.mapping.ProviderlessMapping.__name__ = ["org","swiftsuspenders","mapping","ProviderlessMapping"];
org.swiftsuspenders.mapping.ProviderlessMapping.prototype = {
	toType: null
	,toValue: null
	,toSingleton: null
	,asSingleton: null
	,toProvider: null
	,seal: null
	,__class__: org.swiftsuspenders.mapping.ProviderlessMapping
};
org.swiftsuspenders.mapping.InjectionMapping = function(creatingInjector,type,name,mappingId) {
	this._creatingInjector = creatingInjector;
	this._type = type;
	this._name = name;
	this._mappingId = mappingId;
	this._defaultProviderSet = true;
	this.mapProvider(new org.swiftsuspenders.dependencyproviders.ClassProvider(type));
};
$hxClasses["org.swiftsuspenders.mapping.InjectionMapping"] = org.swiftsuspenders.mapping.InjectionMapping;
org.swiftsuspenders.mapping.InjectionMapping.__name__ = ["org","swiftsuspenders","mapping","InjectionMapping"];
org.swiftsuspenders.mapping.InjectionMapping.__interfaces__ = [org.swiftsuspenders.mapping.UnsealedMapping,org.swiftsuspenders.mapping.ProviderlessMapping];
org.swiftsuspenders.mapping.InjectionMapping.prototype = {
	_type: null
	,_name: null
	,_mappingId: null
	,_creatingInjector: null
	,_defaultProviderSet: null
	,_overridingInjector: null
	,_soft: null
	,_local: null
	,_sealed: null
	,_sealKey: null
	,asSingleton: function(initializeImmediately) {
		if(initializeImmediately == null) initializeImmediately = false;
		this.toSingleton(this._type,initializeImmediately);
		return this;
	}
	,toType: function(type) {
		this.toProvider(new org.swiftsuspenders.dependencyproviders.ClassProvider(type));
		return this;
	}
	,toSingleton: function(type,initializeImmediately) {
		if(initializeImmediately == null) initializeImmediately = false;
		this.toProvider(new org.swiftsuspenders.dependencyproviders.SingletonProvider(type,this._creatingInjector));
		if(initializeImmediately) this._creatingInjector.getInstance(this._type,this._name);
		return this;
	}
	,toValue: function(value,autoInject,destroyOnUnmap) {
		if(destroyOnUnmap == null) destroyOnUnmap = false;
		if(autoInject == null) autoInject = false;
		this.toProvider(new org.swiftsuspenders.dependencyproviders.ValueProvider(value,destroyOnUnmap?this._creatingInjector:null));
		if(autoInject) this._creatingInjector.injectInto(value);
		return this;
	}
	,toProvider: function(provider) {
		if(this._sealed) this.throwSealedError();
		if(this.hasProvider() && provider != null && !this._defaultProviderSet) {
			haxe.Log.trace("Warning: Injector already has a mapping for " + this._mappingId + ".\n " + "If you have overridden this mapping intentionally you can use " + "\"injector.unmap()\" prior to your replacement mapping in order to " + "avoid seeing this message.",{ fileName : "InjectionMapping.hx", lineNumber : 160, className : "org.swiftsuspenders.mapping.InjectionMapping", methodName : "toProvider"});
			this._creatingInjector.hasEventListener(org.swiftsuspenders.mapping.MappingEvent.MAPPING_OVERRIDE) && this._creatingInjector.dispatchEvent(new org.swiftsuspenders.mapping.MappingEvent(org.swiftsuspenders.mapping.MappingEvent.MAPPING_OVERRIDE,this._type,this._name,this));
		}
		this.dispatchPreChangeEvent();
		this._defaultProviderSet = false;
		this.mapProvider(provider);
		this.dispatchPostChangeEvent();
		return this;
	}
	,toProviderOf: function(type,name) {
		if(name == null) name = "";
		var provider = this._creatingInjector.getMapping(type,name).getProvider();
		this.toProvider(provider);
		return this;
	}
	,softly: function() {
		if(this._sealed) this.throwSealedError();
		if(!this._soft) {
			var provider = this.getProvider();
			this.dispatchPreChangeEvent();
			this._soft = true;
			this.mapProvider(provider);
			this.dispatchPostChangeEvent();
		}
		return this;
	}
	,locally: function() {
		if(this._sealed) this.throwSealedError();
		if(this._local) return this;
		var provider = this.getProvider();
		this.dispatchPreChangeEvent();
		this._local = true;
		this.mapProvider(provider);
		this.dispatchPostChangeEvent();
		return this;
	}
	,seal: function() {
		if(this._sealed) throw new org.swiftsuspenders.errors.InjectorError("Mapping is already sealed.");
		this._sealed = true;
		this._sealKey = { };
		return this._sealKey;
	}
	,unseal: function(key) {
		if(!this._sealed) throw new org.swiftsuspenders.errors.InjectorError("Can't unseal a non-sealed mapping.");
		if(key != this._sealKey) throw new org.swiftsuspenders.errors.InjectorError("Can't unseal mapping without the correct key.");
		this._sealed = false;
		this._sealKey = null;
		return this;
	}
	,isSealed: null
	,get_isSealed: function() {
		return this._sealed;
	}
	,hasProvider: function() {
		if(this._creatingInjector.providerMappings.get(this._mappingId) == null) return false;
		return true;
	}
	,getProvider: function() {
		var provider = this._creatingInjector.providerMappings.get(this._mappingId);
		while(js.Boot.__instanceof(provider,org.swiftsuspenders.dependencyproviders.ForwardingProvider)) provider = (js.Boot.__cast(provider , org.swiftsuspenders.dependencyproviders.ForwardingProvider)).provider;
		return provider;
	}
	,setInjector: function(injector) {
		if(this._sealed) this.throwSealedError();
		if(injector == this._overridingInjector) return this;
		var provider = this.getProvider();
		this._overridingInjector = injector;
		this.mapProvider(provider);
		return this;
	}
	,mapProvider: function(provider) {
		if(this._soft) provider = new org.swiftsuspenders.dependencyproviders.SoftDependencyProvider(provider);
		if(this._local) provider = new org.swiftsuspenders.dependencyproviders.LocalOnlyProvider(provider);
		if(this._overridingInjector != null) provider = new org.swiftsuspenders.dependencyproviders.InjectorUsingProvider(this._overridingInjector,provider);
		this._creatingInjector.providerMappings.set(this._mappingId,provider);
		provider;
	}
	,throwSealedError: function() {
		throw new org.swiftsuspenders.errors.InjectorError("Can't change a sealed mapping");
	}
	,dispatchPreChangeEvent: function() {
		this._creatingInjector.hasEventListener(org.swiftsuspenders.mapping.MappingEvent.PRE_MAPPING_CHANGE) && this._creatingInjector.dispatchEvent(new org.swiftsuspenders.mapping.MappingEvent(org.swiftsuspenders.mapping.MappingEvent.PRE_MAPPING_CHANGE,this._type,this._name,this));
	}
	,dispatchPostChangeEvent: function() {
		this._creatingInjector.hasEventListener(org.swiftsuspenders.mapping.MappingEvent.POST_MAPPING_CHANGE) && this._creatingInjector.dispatchEvent(new org.swiftsuspenders.mapping.MappingEvent(org.swiftsuspenders.mapping.MappingEvent.POST_MAPPING_CHANGE,this._type,this._name,this));
	}
	,__class__: org.swiftsuspenders.mapping.InjectionMapping
	,__properties__: {get_isSealed:"get_isSealed"}
};
org.swiftsuspenders.mapping.MappingEvent = function(type,mappedType,mappedName,mapping) {
	openfl.events.Event.call(this,type);
	this.mappedType = mappedType;
	this.mappedName = mappedName;
	this.mapping = mapping;
};
$hxClasses["org.swiftsuspenders.mapping.MappingEvent"] = org.swiftsuspenders.mapping.MappingEvent;
org.swiftsuspenders.mapping.MappingEvent.__name__ = ["org","swiftsuspenders","mapping","MappingEvent"];
org.swiftsuspenders.mapping.MappingEvent.__super__ = openfl.events.Event;
org.swiftsuspenders.mapping.MappingEvent.prototype = $extend(openfl.events.Event.prototype,{
	mappedType: null
	,mappedName: null
	,mapping: null
	,clone: function() {
		return new org.swiftsuspenders.mapping.MappingEvent(this.type,this.mappedType,this.mappedName,this.mapping);
	}
	,__class__: org.swiftsuspenders.mapping.MappingEvent
});
org.swiftsuspenders.reflection = {};
org.swiftsuspenders.reflection.ReflectorBase = function() {
};
$hxClasses["org.swiftsuspenders.reflection.ReflectorBase"] = org.swiftsuspenders.reflection.ReflectorBase;
org.swiftsuspenders.reflection.ReflectorBase.__name__ = ["org","swiftsuspenders","reflection","ReflectorBase"];
org.swiftsuspenders.reflection.ReflectorBase.prototype = {
	getClass: function(value) {
		if(js.Boot.__instanceof(value,Xml)) return Xml; else if((value instanceof Array) && value.__enum__ == null) return Array;
		return value.constructor;
	}
	,getFQCN: function(value,replaceColons) {
		if(replaceColons == null) replaceColons = false;
		var fqcn;
		if(typeof(value) == "string") {
			fqcn = value;
			if(!replaceColons && fqcn.indexOf("::") == -1) {
				var lastDotIndex = fqcn.lastIndexOf(".");
				if(lastDotIndex == -1) return fqcn;
				return fqcn.substring(0,lastDotIndex) + "::" + fqcn.substring(lastDotIndex + 1);
			}
		} else fqcn = org.swiftsuspenders.utils.CallProxy.replaceClassName(value);
		if(replaceColons == true) return fqcn.split("::").join(".");
		return fqcn;
	}
	,__class__: org.swiftsuspenders.reflection.ReflectorBase
};
org.swiftsuspenders.reflection.Reflector = function() { };
$hxClasses["org.swiftsuspenders.reflection.Reflector"] = org.swiftsuspenders.reflection.Reflector;
org.swiftsuspenders.reflection.Reflector.__name__ = ["org","swiftsuspenders","reflection","Reflector"];
org.swiftsuspenders.reflection.Reflector.prototype = {
	getClass: null
	,getFQCN: null
	,typeImplements: null
	,describeInjections: null
	,__class__: org.swiftsuspenders.reflection.Reflector
};
org.swiftsuspenders.reflection.DescribeTypeRTTIReflector = function() {
	org.swiftsuspenders.reflection.ReflectorBase.call(this);
};
$hxClasses["org.swiftsuspenders.reflection.DescribeTypeRTTIReflector"] = org.swiftsuspenders.reflection.DescribeTypeRTTIReflector;
org.swiftsuspenders.reflection.DescribeTypeRTTIReflector.__name__ = ["org","swiftsuspenders","reflection","DescribeTypeRTTIReflector"];
org.swiftsuspenders.reflection.DescribeTypeRTTIReflector.__interfaces__ = [org.swiftsuspenders.reflection.Reflector];
org.swiftsuspenders.reflection.DescribeTypeRTTIReflector.__super__ = org.swiftsuspenders.reflection.ReflectorBase;
org.swiftsuspenders.reflection.DescribeTypeRTTIReflector.prototype = $extend(org.swiftsuspenders.reflection.ReflectorBase.prototype,{
	_currentFactoryXML: null
	,_currentFactoryXMLFast: null
	,constructorElem: null
	,rtti: null
	,extendPath: null
	,extendDescribeTypeReflector: null
	,extendTypeDescription: null
	,typeImplements: function(type,superType) {
		return this.classExtendsOrImplements(type,superType);
	}
	,classExtendsOrImplements: function(classOrClassName,superClass) {
		var actualClass = null;
		if(js.Boot.__instanceof(classOrClassName,Class)) actualClass = js.Boot.__cast(classOrClassName , Class); else if(typeof(classOrClassName) == "string") try {
			actualClass = Type.resolveClass(js.Boot.__cast(classOrClassName , String));
		} catch( e ) {
			throw "The class name " + Std.string(classOrClassName) + " is not valid because of " + Std.string(e) + "\n" + Std.string(e.getStackTrace());
		}
		if(actualClass == null) throw "The parameter classOrClassName must be a Class or fully qualified class name.";
		var classInstance = Type.createEmptyInstance(actualClass);
		return js.Boot.__instanceof(classInstance,superClass);
	}
	,describeInjections: function(_type) {
		if(this.extendDescribeTypeReflector == null) this.extendDescribeTypeReflector = new org.swiftsuspenders.reflection.DescribeTypeRTTIReflector();
		var type = _type;
		this.rtti = type.__rtti;
		if(this.rtti == null) {
			if(!this.isInterface(type)) haxe.Log.trace("Warning: " + org.swiftsuspenders.utils.CallProxy.getClassName(type) + " missing @:rtti matadata",{ fileName : "DescribeTypeRTTIReflector.hx", lineNumber : 103, className : "org.swiftsuspenders.reflection.DescribeTypeRTTIReflector", methodName : "describeInjections"});
		}
		if(this.rtti != null) {
			this._currentFactoryXML = Xml.parse(this.rtti).firstElement();
			this._currentFactoryXMLFast = new haxe.xml.Fast(this._currentFactoryXML);
			var $it0 = this._currentFactoryXMLFast.get_elements();
			while( $it0.hasNext() ) {
				var elem = $it0.next();
				if(elem.get_name() == "new") this.constructorElem = elem;
				if(elem.get_name() == "extends") {
					this.extendPath = elem.att.resolve("path");
					var extendClass = Type.resolveClass(this.extendPath);
					this.extendTypeDescription = this.extendDescribeTypeReflector.describeInjections(extendClass);
				}
			}
		}
		var description = new org.swiftsuspenders.typedescriptions.TypeDescription(false);
		this.addCtorInjectionPoint(description,type);
		this.addFieldInjectionPoints(description,type);
		this.addMethodInjectionPoints(description,type);
		this.addPostConstructMethodPoints(description,type);
		this.addPreDestroyMethodPoints(description,type);
		this._currentFactoryXML = null;
		this._currentFactoryXMLFast = null;
		this.constructorElem = null;
		this.rtti = null;
		this.extendPath = null;
		this.extendTypeDescription = null;
		return description;
	}
	,isInterface: function(type) {
		var classPath = org.swiftsuspenders.utils.CallProxy.replaceClassName(type);
		var split = classPath.split(".");
		var className = split[split.length - 1];
		if(className.length <= 1) return false; else {
			var r = new EReg("(I)([A-Z])","");
			var f2 = HxOverrides.substr(className,0,2);
			if(r.match(f2)) return true; else return false;
		}
	}
	,addCtorInjectionPoint: function(description,type) {
		if(this.constructorElem == null) {
			description.ctor = new org.swiftsuspenders.typedescriptions.NoParamsConstructorInjectionPoint();
			return;
		}
		var className = org.swiftsuspenders.utils.CallProxy.getClassName(type);
		var injectParameters = null;
		var parameterNames = this.constructorElem.node.resolve("f").att.resolve("a").split(":");
		var parameters = this.parametersFromXml(this.constructorElem.x);
		var requiredParameters = 0;
		var _g1 = 0;
		var _g = parameterNames.length;
		while(_g1 < _g) {
			var j = _g1++;
			if(parameterNames[j].indexOf("?") != 0) requiredParameters++;
		}
		description.ctor = new org.swiftsuspenders.typedescriptions.ConstructorInjectionPoint(parameters,requiredParameters,injectParameters);
	}
	,parametersFromXml: function(x) {
		var parameters = [];
		var $it0 = x.firstElement().iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(node.nodeType == Xml.Element) {
				var nodeFast = new haxe.xml.Fast(node);
				parameters.push(nodeFast.att.resolve("path") + "|");
			}
		}
		parameters.pop();
		return parameters;
	}
	,addFieldInjectionPoints: function(description,type) {
		var metaFields = haxe.rtti.Meta.getFields(type);
		var fields = Reflect.fields(metaFields);
		var injectFields = [];
		var _g = 0;
		while(_g < fields.length) {
			var value = fields[_g];
			++_g;
			var metaFields1 = Reflect.getProperty(metaFields,value);
			var fields1 = Reflect.fields(metaFields1);
			if(fields1[0] == "inject") injectFields.push(value);
		}
		if(this.extendTypeDescription != null) description.injectionPoints = this.extendTypeDescription.injectionPoints;
		var _g1 = 0;
		while(_g1 < injectFields.length) {
			var propertyName = injectFields[_g1];
			++_g1;
			var optional = false;
			var injectParams = Reflect.getProperty(Reflect.getProperty(metaFields,propertyName),"inject");
			if(injectParams != null) {
				var _g2 = 0;
				var _g11 = injectParams.length;
				while(_g2 < _g11) {
					var i = _g2++;
					if(injectParams[i].indexOf("optional=") != -1) {
						if(injectParams[i].split("optional=")[1].toLowerCase() == "true") optional = true;
					}
				}
			}
			var mappingId = "";
			var $it0 = this._currentFactoryXMLFast.get_elements();
			while( $it0.hasNext() ) {
				var elem = $it0.next();
				if(elem.get_name() == propertyName) {
					var pathFast = new haxe.xml.Fast(elem.x.firstElement());
					if(pathFast.has.resolve("path")) mappingId = pathFast.att.resolve("path") + "|";
				}
			}
			var injectParameters = new haxe.ds.StringMap();
			var injectionPoint = new org.swiftsuspenders.typedescriptions.PropertyInjectionPoint(mappingId,propertyName,optional,injectParameters);
			description.addInjectionPoint(injectionPoint);
		}
	}
	,addMethodInjectionPoints: function(description,type) {
	}
	,addPostConstructMethodPoints: function(description,type) {
		var injectionPoints = this.gatherOrderedInjectionPointsForTag(org.swiftsuspenders.typedescriptions.PostConstructInjectionPoint,"PostConstruct",type);
		var length = injectionPoints.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			description.addInjectionPoint(injectionPoints[i]);
		}
	}
	,addPreDestroyMethodPoints: function(description,type) {
		var injectionPoints = this.gatherOrderedInjectionPointsForTag(org.swiftsuspenders.typedescriptions.PreDestroyInjectionPoint,"PreDestroy",type);
		if(injectionPoints.length == 0) return;
		description.preDestroyMethods = injectionPoints[0];
		description.preDestroyMethods.last = injectionPoints[0];
		var length = injectionPoints.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			description.preDestroyMethods.last.next = injectionPoints[i];
			description.preDestroyMethods.last = injectionPoints[i];
		}
	}
	,gatherOrderedInjectionPointsForTag: function(injectionPointType,tag,type) {
		var injectionPoints = [];
		var metaFields = haxe.rtti.Meta.getFields(type);
		var fields = Reflect.fields(metaFields);
		var injectMethods = [];
		var _g = 0;
		while(_g < fields.length) {
			var value = fields[_g];
			++_g;
			var metaFields1 = Reflect.getProperty(metaFields,value);
			var fields1 = Reflect.fields(metaFields1);
			if(fields1[0].toLowerCase() == tag.toLowerCase()) {
				injectMethods.push(value);
				var $it0 = this._currentFactoryXML.iterator();
				while( $it0.hasNext() ) {
					var node = $it0.next();
					if(node.nodeType == Xml.Element) {
						if(node.get_nodeName() == value) {
							var parameterNames = new haxe.xml.Fast(node).node.resolve("f").att.resolve("a").split(":");
							var requiredParameters = 0;
							var _g2 = 0;
							var _g1 = parameterNames.length;
							while(_g2 < _g1) {
								var i = _g2++;
								if(parameterNames[i].indexOf("?") != 0) requiredParameters++;
							}
							requiredParameters--;
							var parameters = this.parametersFromXml(node);
							var injectionPoint = org.swiftsuspenders.utils.CallProxy.createInstance(injectionPointType,[node.get_nodeName(),parameters,requiredParameters,1073741823]);
							injectionPoints.push(injectionPoint);
						}
					}
				}
			}
		}
		return injectionPoints;
	}
	,createDummyInstance: function(constructorNode,clazz) {
	}
	,__class__: org.swiftsuspenders.reflection.DescribeTypeRTTIReflector
});
org.swiftsuspenders.typedescriptions = {};
org.swiftsuspenders.typedescriptions.InjectionPoint = function() {
};
$hxClasses["org.swiftsuspenders.typedescriptions.InjectionPoint"] = org.swiftsuspenders.typedescriptions.InjectionPoint;
org.swiftsuspenders.typedescriptions.InjectionPoint.__name__ = ["org","swiftsuspenders","typedescriptions","InjectionPoint"];
org.swiftsuspenders.typedescriptions.InjectionPoint.prototype = {
	next: null
	,last: null
	,injectParameters: null
	,applyInjection: function(target,targetType,injector) {
	}
	,__class__: org.swiftsuspenders.typedescriptions.InjectionPoint
};
org.swiftsuspenders.typedescriptions.MethodInjectionPoint = function(methodName,parameters,requiredParameters,isOptional,injectParameters) {
	this._methodName = methodName;
	this._parameterMappingIDs = parameters;
	this._requiredParameters = requiredParameters;
	this._isOptional = isOptional;
	this.injectParameters = injectParameters;
	org.swiftsuspenders.typedescriptions.InjectionPoint.call(this);
};
$hxClasses["org.swiftsuspenders.typedescriptions.MethodInjectionPoint"] = org.swiftsuspenders.typedescriptions.MethodInjectionPoint;
org.swiftsuspenders.typedescriptions.MethodInjectionPoint.__name__ = ["org","swiftsuspenders","typedescriptions","MethodInjectionPoint"];
org.swiftsuspenders.typedescriptions.MethodInjectionPoint.__super__ = org.swiftsuspenders.typedescriptions.InjectionPoint;
org.swiftsuspenders.typedescriptions.MethodInjectionPoint.prototype = $extend(org.swiftsuspenders.typedescriptions.InjectionPoint.prototype,{
	_parameterMappingIDs: null
	,_requiredParameters: null
	,_isOptional: null
	,_methodName: null
	,applyInjection: function(target,targetType,injector) {
		var p = this.gatherParameterValues(target,targetType,injector);
		if(p.length >= this._requiredParameters) {
			var func = Reflect.getProperty(target,this._methodName);
			if(Reflect.isFunction(func)) func.apply(target,p);
		}
		p = [];
	}
	,gatherParameterValues: function(target,targetType,injector) {
		var length = this._parameterMappingIDs.length;
		var parameters = [];
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			var parameterMappingId = this._parameterMappingIDs[i];
			var provider = injector.getProvider(parameterMappingId);
			if(provider == null) {
				if(i >= this._requiredParameters || this._isOptional) break;
				var errorMsg = "Injector is missing a mapping to handle injection into target \"";
				errorMsg += Std.string(target);
				errorMsg += "\" of type \"";
				errorMsg += org.swiftsuspenders.utils.CallProxy.replaceClassName(targetType);
				errorMsg += "\". Target dependency: ";
				errorMsg += parameterMappingId;
				errorMsg += ", method: ";
				errorMsg += this._methodName;
				errorMsg += ", parameter: ";
				errorMsg += i + 1;
				throw new org.swiftsuspenders.errors.InjectorMissingMappingError(errorMsg);
			}
			parameters[i] = provider.apply(targetType,injector,this.injectParameters);
		}
		return parameters;
	}
	,__class__: org.swiftsuspenders.typedescriptions.MethodInjectionPoint
});
org.swiftsuspenders.typedescriptions.ConstructorInjectionPoint = function(parameters,requiredParameters,injectParameters) {
	org.swiftsuspenders.typedescriptions.MethodInjectionPoint.call(this,"ctor",parameters,requiredParameters,false,injectParameters);
};
$hxClasses["org.swiftsuspenders.typedescriptions.ConstructorInjectionPoint"] = org.swiftsuspenders.typedescriptions.ConstructorInjectionPoint;
org.swiftsuspenders.typedescriptions.ConstructorInjectionPoint.__name__ = ["org","swiftsuspenders","typedescriptions","ConstructorInjectionPoint"];
org.swiftsuspenders.typedescriptions.ConstructorInjectionPoint.__super__ = org.swiftsuspenders.typedescriptions.MethodInjectionPoint;
org.swiftsuspenders.typedescriptions.ConstructorInjectionPoint.prototype = $extend(org.swiftsuspenders.typedescriptions.MethodInjectionPoint.prototype,{
	createInstance: function(type,injector) {
		var p = this.gatherParameterValues(type,type,injector);
		var result;
		var _g = p.length;
		switch(_g) {
		case 0:
			result = org.swiftsuspenders.utils.CallProxy.createInstance(type,[]);
			break;
		case 1:
			result = org.swiftsuspenders.utils.CallProxy.createInstance(type,[p[0]]);
			break;
		case 2:
			result = org.swiftsuspenders.utils.CallProxy.createInstance(type,[p[0],p[1]]);
			break;
		case 3:
			result = org.swiftsuspenders.utils.CallProxy.createInstance(type,[p[0],p[1],p[2]]);
			break;
		case 4:
			result = org.swiftsuspenders.utils.CallProxy.createInstance(type,[p[0],p[1],p[2],p[3]]);
			break;
		case 5:
			result = org.swiftsuspenders.utils.CallProxy.createInstance(type,[p[0],p[1],p[2],p[3],p[4]]);
			break;
		case 6:
			result = org.swiftsuspenders.utils.CallProxy.createInstance(type,[p[0],p[1],p[2],p[3],p[4],p[5]]);
			break;
		case 7:
			result = org.swiftsuspenders.utils.CallProxy.createInstance(type,[p[0],p[1],p[2],p[3],p[4],p[5],p[6]]);
			break;
		case 8:
			result = org.swiftsuspenders.utils.CallProxy.createInstance(type,[p[0],p[1],p[2],p[3],p[4],p[5],p[6],p[7]]);
			break;
		case 9:
			result = org.swiftsuspenders.utils.CallProxy.createInstance(type,[p[0],p[1],p[2],p[3],p[4],p[5],p[6],p[7],p[8]]);
			break;
		case 10:
			result = org.swiftsuspenders.utils.CallProxy.createInstance(type,[p[0],p[1],p[2],p[3],p[4],p[5],p[6],p[7],p[8],p[9]]);
			break;
		default:
			throw new openfl.errors.Error("The constructor for " + Std.string(type) + " has too many arguments, maximum is 10");
		}
		p = [];
		return result;
	}
	,__class__: org.swiftsuspenders.typedescriptions.ConstructorInjectionPoint
});
org.swiftsuspenders.typedescriptions.NoParamsConstructorInjectionPoint = function() {
	org.swiftsuspenders.typedescriptions.ConstructorInjectionPoint.call(this,[],0,this.injectParameters);
};
$hxClasses["org.swiftsuspenders.typedescriptions.NoParamsConstructorInjectionPoint"] = org.swiftsuspenders.typedescriptions.NoParamsConstructorInjectionPoint;
org.swiftsuspenders.typedescriptions.NoParamsConstructorInjectionPoint.__name__ = ["org","swiftsuspenders","typedescriptions","NoParamsConstructorInjectionPoint"];
org.swiftsuspenders.typedescriptions.NoParamsConstructorInjectionPoint.__super__ = org.swiftsuspenders.typedescriptions.ConstructorInjectionPoint;
org.swiftsuspenders.typedescriptions.NoParamsConstructorInjectionPoint.prototype = $extend(org.swiftsuspenders.typedescriptions.ConstructorInjectionPoint.prototype,{
	createInstance: function(type,injector) {
		return org.swiftsuspenders.utils.CallProxy.createInstance(type,[]);
	}
	,__class__: org.swiftsuspenders.typedescriptions.NoParamsConstructorInjectionPoint
});
org.swiftsuspenders.typedescriptions.OrderedInjectionPoint = function(methodName,parameters,requiredParameters,order) {
	org.swiftsuspenders.typedescriptions.MethodInjectionPoint.call(this,methodName,parameters,requiredParameters,false,null);
	this.order = order;
};
$hxClasses["org.swiftsuspenders.typedescriptions.OrderedInjectionPoint"] = org.swiftsuspenders.typedescriptions.OrderedInjectionPoint;
org.swiftsuspenders.typedescriptions.OrderedInjectionPoint.__name__ = ["org","swiftsuspenders","typedescriptions","OrderedInjectionPoint"];
org.swiftsuspenders.typedescriptions.OrderedInjectionPoint.__super__ = org.swiftsuspenders.typedescriptions.MethodInjectionPoint;
org.swiftsuspenders.typedescriptions.OrderedInjectionPoint.prototype = $extend(org.swiftsuspenders.typedescriptions.MethodInjectionPoint.prototype,{
	order: null
	,__class__: org.swiftsuspenders.typedescriptions.OrderedInjectionPoint
});
org.swiftsuspenders.typedescriptions.PostConstructInjectionPoint = function(methodName,parameters,requiredParameters,order) {
	org.swiftsuspenders.typedescriptions.OrderedInjectionPoint.call(this,methodName,parameters,requiredParameters,order);
};
$hxClasses["org.swiftsuspenders.typedescriptions.PostConstructInjectionPoint"] = org.swiftsuspenders.typedescriptions.PostConstructInjectionPoint;
org.swiftsuspenders.typedescriptions.PostConstructInjectionPoint.__name__ = ["org","swiftsuspenders","typedescriptions","PostConstructInjectionPoint"];
org.swiftsuspenders.typedescriptions.PostConstructInjectionPoint.__super__ = org.swiftsuspenders.typedescriptions.OrderedInjectionPoint;
org.swiftsuspenders.typedescriptions.PostConstructInjectionPoint.prototype = $extend(org.swiftsuspenders.typedescriptions.OrderedInjectionPoint.prototype,{
	__class__: org.swiftsuspenders.typedescriptions.PostConstructInjectionPoint
});
org.swiftsuspenders.typedescriptions.PreDestroyInjectionPoint = function(methodName,parameters,requiredParameters,order) {
	org.swiftsuspenders.typedescriptions.OrderedInjectionPoint.call(this,methodName,parameters,requiredParameters,order);
};
$hxClasses["org.swiftsuspenders.typedescriptions.PreDestroyInjectionPoint"] = org.swiftsuspenders.typedescriptions.PreDestroyInjectionPoint;
org.swiftsuspenders.typedescriptions.PreDestroyInjectionPoint.__name__ = ["org","swiftsuspenders","typedescriptions","PreDestroyInjectionPoint"];
org.swiftsuspenders.typedescriptions.PreDestroyInjectionPoint.__super__ = org.swiftsuspenders.typedescriptions.OrderedInjectionPoint;
org.swiftsuspenders.typedescriptions.PreDestroyInjectionPoint.prototype = $extend(org.swiftsuspenders.typedescriptions.OrderedInjectionPoint.prototype,{
	__class__: org.swiftsuspenders.typedescriptions.PreDestroyInjectionPoint
});
org.swiftsuspenders.typedescriptions.PropertyInjectionPoint = function(mappingId,propertyName,optional,injectParameters) {
	this._propertyName = propertyName;
	this._mappingId = mappingId;
	this._optional = optional;
	this.injectParameters = injectParameters;
	org.swiftsuspenders.typedescriptions.InjectionPoint.call(this);
};
$hxClasses["org.swiftsuspenders.typedescriptions.PropertyInjectionPoint"] = org.swiftsuspenders.typedescriptions.PropertyInjectionPoint;
org.swiftsuspenders.typedescriptions.PropertyInjectionPoint.__name__ = ["org","swiftsuspenders","typedescriptions","PropertyInjectionPoint"];
org.swiftsuspenders.typedescriptions.PropertyInjectionPoint.__super__ = org.swiftsuspenders.typedescriptions.InjectionPoint;
org.swiftsuspenders.typedescriptions.PropertyInjectionPoint.prototype = $extend(org.swiftsuspenders.typedescriptions.InjectionPoint.prototype,{
	_propertyName: null
	,_mappingId: null
	,_optional: null
	,applyInjection: function(target,targetType,injector) {
		var provider = injector.getProvider(this._mappingId);
		if(provider == null) {
			if(this._optional) return;
			throw new org.swiftsuspenders.errors.InjectorMissingMappingError("Injector is missing a mapping to handle injection into property \"" + this._propertyName + "\" of object \"" + Std.string(target) + "\" with type \"" + org.swiftsuspenders.utils.CallProxy.replaceClassName(targetType) + "\". Target dependency: \"" + this._mappingId + "\"");
		}
		Reflect.setProperty(target,this._propertyName,provider.apply(targetType,injector,this.injectParameters));
	}
	,__class__: org.swiftsuspenders.typedescriptions.PropertyInjectionPoint
});
org.swiftsuspenders.typedescriptions.TypeDescription = function(useDefaultConstructor) {
	if(useDefaultConstructor == null) useDefaultConstructor = true;
	if(useDefaultConstructor) this.ctor = new org.swiftsuspenders.typedescriptions.NoParamsConstructorInjectionPoint();
};
$hxClasses["org.swiftsuspenders.typedescriptions.TypeDescription"] = org.swiftsuspenders.typedescriptions.TypeDescription;
org.swiftsuspenders.typedescriptions.TypeDescription.__name__ = ["org","swiftsuspenders","typedescriptions","TypeDescription"];
org.swiftsuspenders.typedescriptions.TypeDescription.prototype = {
	ctor: null
	,injectionPoints: null
	,preDestroyMethods: null
	,_postConstructAdded: null
	,setConstructor: function(parameterTypes,parameterNames,requiredParameters,metadata) {
		if(requiredParameters == null) requiredParameters = 1073741823;
		var param;
		if(parameterNames != null) param = parameterNames; else param = [];
		this.ctor = new org.swiftsuspenders.typedescriptions.ConstructorInjectionPoint(this.createParameterMappings(parameterTypes,param),requiredParameters,metadata);
		return this;
	}
	,addFieldInjection: function(fieldName,type,injectionName,optional,metadata) {
		if(optional == null) optional = false;
		if(injectionName == null) injectionName = "";
		if(this._postConstructAdded) throw new org.swiftsuspenders.errors.InjectorError("Can't add injection point after post construct method");
		this.addInjectionPoint(new org.swiftsuspenders.typedescriptions.PropertyInjectionPoint(org.swiftsuspenders.utils.CallProxy.replaceClassName(type) + "|" + injectionName,fieldName,optional,metadata));
		return this;
	}
	,addMethodInjection: function(methodName,parameterTypes,parameterNames,requiredParameters,optional,metadata) {
		if(optional == null) optional = false;
		if(requiredParameters == null) requiredParameters = 1073741823;
		if(this._postConstructAdded) throw new org.swiftsuspenders.errors.InjectorError("Can't add injection point after post construct method");
		var param;
		if(parameterNames != null) param = parameterNames; else param = [];
		this.addInjectionPoint(new org.swiftsuspenders.typedescriptions.MethodInjectionPoint(methodName,this.createParameterMappings(parameterTypes,param),js.Boot.__cast(Math.min((function($this) {
			var $r;
			var $int = requiredParameters;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)),parameterTypes.length) , Int),optional,metadata));
		return this;
	}
	,addPostConstructMethod: function(methodName,parameterTypes,parameterNames,requiredParameters) {
		if(requiredParameters == null) requiredParameters = 1073741823;
		var param;
		if(parameterNames != null) param = parameterNames; else param = [];
		this._postConstructAdded = true;
		this.addInjectionPoint(new org.swiftsuspenders.typedescriptions.PostConstructInjectionPoint(methodName,this.createParameterMappings(parameterTypes,param),js.Boot.__cast(Math.min((function($this) {
			var $r;
			var $int = requiredParameters;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)),parameterTypes.length) , Int),0));
		return this;
	}
	,addPreDestroyMethod: function(methodName,parameterTypes,parameterNames,requiredParameters) {
		if(requiredParameters == null) requiredParameters = 1073741823;
		var param;
		if(parameterNames != null) param = parameterNames; else param = [];
		var method = new org.swiftsuspenders.typedescriptions.PreDestroyInjectionPoint(methodName,this.createParameterMappings(parameterTypes,param),js.Boot.__cast(Math.min((function($this) {
			var $r;
			var $int = requiredParameters;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)),parameterTypes.length) , Int),0);
		if(this.preDestroyMethods != null) {
			this.preDestroyMethods.last.next = method;
			this.preDestroyMethods.last = method;
		} else {
			this.preDestroyMethods = method;
			this.preDestroyMethods.last = method;
		}
		return this;
	}
	,addInjectionPoint: function(injectionPoint) {
		if(this.injectionPoints != null) {
			this.injectionPoints.last.next = injectionPoint;
			this.injectionPoints.last = injectionPoint;
		} else {
			this.injectionPoints = injectionPoint;
			this.injectionPoints.last = injectionPoint;
		}
	}
	,createParameterMappings: function(parameterTypes,parameterNames) {
		var parameters = new Array();
		var _g1 = 0;
		var _g = parameterTypes.length;
		while(_g1 < _g) {
			var n = _g1++;
			var i = parameters.length - n;
			parameters[i] = org.swiftsuspenders.utils.CallProxy.replaceClassName(parameterTypes[i]) + "|";
			if(parameterNames[i]) parameters[i] += parameterNames[i];
		}
		return parameters;
	}
	,__class__: org.swiftsuspenders.typedescriptions.TypeDescription
};
org.swiftsuspenders.utils.TypeDescriptor = function(reflector,descriptionsCache) {
	this._descriptionsCache = descriptionsCache;
	this._reflector = reflector;
};
$hxClasses["org.swiftsuspenders.utils.TypeDescriptor"] = org.swiftsuspenders.utils.TypeDescriptor;
org.swiftsuspenders.utils.TypeDescriptor.__name__ = ["org","swiftsuspenders","utils","TypeDescriptor"];
org.swiftsuspenders.utils.TypeDescriptor.prototype = {
	_descriptionsCache: null
	,_reflector: null
	,getDescription: function(type) {
		var id = org.swiftsuspenders.utils.UID.classID(type);
		if(this._descriptionsCache.get(id) == null) {
			var v = this._reflector.describeInjections(type);
			this._descriptionsCache.set(id,v);
			v;
		}
		return this._descriptionsCache.get(id);
	}
	,addDescription: function(type,description) {
		var k = org.swiftsuspenders.utils.UID.classID(type);
		this._descriptionsCache.set(k,description);
		description;
	}
	,__class__: org.swiftsuspenders.utils.TypeDescriptor
};
org.swiftsuspenders.utils.UID = function() { };
$hxClasses["org.swiftsuspenders.utils.UID"] = org.swiftsuspenders.utils.UID;
org.swiftsuspenders.utils.UID.__name__ = ["org","swiftsuspenders","utils","UID"];
org.swiftsuspenders.utils.UID._i = null;
org.swiftsuspenders.utils.UID.create = function(source) {
	var className = org.swiftsuspenders.utils.UID.classID(source);
	return (source?Std.string(source) + "-":"") + StringTools.hex(org.swiftsuspenders.utils.UID._i++,16) + "-" + StringTools.hex(Math.floor(Math.random() * 255),16);
};
org.swiftsuspenders.utils.UID.classID = function(source) {
	var className = "";
	if(js.Boot.__instanceof(source,Class)) className = org.swiftsuspenders.utils.CallProxy.replaceClassName(source); else if(Type.getClass(source) != null) className = org.swiftsuspenders.utils.CallProxy.replaceClassName(Type.getClass(source));
	return className;
};
org.swiftsuspenders.utils.UID.instanceID = function(source) {
	var classID = org.swiftsuspenders.utils.UID.classID(source);
	if(js.Boot.__instanceof(source,Class)) return classID;
	if(org.swiftsuspenders.utils.UID.classRefs.get(classID) == null) {
		var v = [];
		org.swiftsuspenders.utils.UID.classRefs.set(classID,v);
		v;
	}
	var id = -1;
	var _g1 = 0;
	var _g = org.swiftsuspenders.utils.UID.classRefs.get(classID).length;
	while(_g1 < _g) {
		var i = _g1++;
		if(org.swiftsuspenders.utils.UID.classRefs.get(classID)[i] == source) {
			id = i;
			break;
		}
	}
	if(id == -1) {
		id = org.swiftsuspenders.utils.UID.classRefs.get(classID).length;
		org.swiftsuspenders.utils.UID.classRefs.get(classID).push(source);
	}
	return org.swiftsuspenders.utils.UID.classID(source) + "-" + id;
};
org.swiftsuspenders.utils.UID.clearInstanceID = function(source) {
	var classID = org.swiftsuspenders.utils.UID.classID(source);
	if(js.Boot.__instanceof(source,Class)) return classID;
	if(org.swiftsuspenders.utils.UID.classRefs.get(classID) == null) {
		var v = [];
		org.swiftsuspenders.utils.UID.classRefs.set(classID,v);
		v;
	}
	var _g1 = 0;
	var _g = org.swiftsuspenders.utils.UID.classRefs.get(classID).length;
	while(_g1 < _g) {
		var i = _g1++;
		if(org.swiftsuspenders.utils.UID.classRefs.get(classID)[i] == source) {
			org.swiftsuspenders.utils.UID.classRefs.get(classID)[i] = null;
			return org.swiftsuspenders.utils.UID.classID(source) + "-" + i;
		}
	}
	throw new openfl.errors.Error("instanceID: " + Std.string(source) + " is not in use");
	return "";
};
robotlegs.bender.framework.api.IExtension = function() { };
$hxClasses["robotlegs.bender.framework.api.IExtension"] = robotlegs.bender.framework.api.IExtension;
robotlegs.bender.framework.api.IExtension.__name__ = ["robotlegs","bender","framework","api","IExtension"];
robotlegs.bender.framework.api.IBundle = function() { };
$hxClasses["robotlegs.bender.framework.api.IBundle"] = robotlegs.bender.framework.api.IBundle;
robotlegs.bender.framework.api.IBundle.__name__ = ["robotlegs","bender","framework","api","IBundle"];
robotlegs.bender.framework.api.IBundle.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.bundles.ImagBundle = function() { };
$hxClasses["robotlegs.bender.bundles.ImagBundle"] = robotlegs.bender.bundles.ImagBundle;
robotlegs.bender.bundles.ImagBundle.__name__ = ["robotlegs","bender","bundles","ImagBundle"];
robotlegs.bender.bundles.ImagBundle.__interfaces__ = [robotlegs.bender.framework.api.IBundle];
robotlegs.bender.bundles.ImagBundle.prototype = {
	extend: function(context) {
		context.install([robotlegs.bender.bundles.mvcs.MVCSBundle]);
		context.set_logLevel(robotlegs.bender.framework.api.LogLevel.INFO);
		context.install([robotlegs.bender.extensions.viewManager.ManualStageObserverExtension,robotlegs.bender.extensions.signalCommandMap.SignalCommandMapExtension,robotlegs.bender.extensions.imag.ImagSignalExtension,robotlegs.bender.extensions.imag.ImagModelExtension,robotlegs.bender.extensions.imag.ImagServiceExtension,robotlegs.bender.extensions.imag.ImagCommandExtension,robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension]);
	}
	,__class__: robotlegs.bender.bundles.ImagBundle
};
robotlegs.bender.bundles.mvcs.MVCSBundle = function() {
};
$hxClasses["robotlegs.bender.bundles.mvcs.MVCSBundle"] = robotlegs.bender.bundles.mvcs.MVCSBundle;
robotlegs.bender.bundles.mvcs.MVCSBundle.__name__ = ["robotlegs","bender","bundles","mvcs","MVCSBundle"];
robotlegs.bender.bundles.mvcs.MVCSBundle.__interfaces__ = [robotlegs.bender.framework.api.IBundle];
robotlegs.bender.bundles.mvcs.MVCSBundle.prototype = {
	extend: function(context) {
		context.set_logLevel(robotlegs.bender.framework.api.LogLevel.INFO);
		context.install([robotlegs.bender.extensions.enhancedLogging.TraceLoggingExtension,robotlegs.bender.extensions.vigilance.VigilanceExtension,robotlegs.bender.extensions.enhancedLogging.InjectableLoggerExtension,robotlegs.bender.extensions.contextView.ContextViewExtension,robotlegs.bender.extensions.eventDispatcher.EventDispatcherExtension,robotlegs.bender.extensions.modularity.ModularityExtension,robotlegs.bender.extensions.directCommandMap.DirectCommandMapExtension,robotlegs.bender.extensions.eventCommandMap.EventCommandMapExtension,robotlegs.bender.extensions.localEventMap.LocalEventMapExtension,robotlegs.bender.extensions.viewManager.ViewManagerExtension,robotlegs.bender.extensions.viewManager.StageObserverExtension,robotlegs.bender.extensions.mediatorMap.MediatorMapExtension,robotlegs.bender.extensions.viewProcessorMap.ViewProcessorMapExtension,robotlegs.bender.extensions.viewManager.StageCrawlerExtension,robotlegs.bender.extensions.contextView.StageSyncExtension]);
		context.configure([robotlegs.bender.extensions.contextView.ContextViewListenerConfig]);
	}
	,__class__: robotlegs.bender.bundles.mvcs.MVCSBundle
};
robotlegs.bender.extensions.commandCenter.api.CommandPayload = function(values,classes) {
	this.values = values;
	this.classes = classes;
};
$hxClasses["robotlegs.bender.extensions.commandCenter.api.CommandPayload"] = robotlegs.bender.extensions.commandCenter.api.CommandPayload;
robotlegs.bender.extensions.commandCenter.api.CommandPayload.__name__ = ["robotlegs","bender","extensions","commandCenter","api","CommandPayload"];
robotlegs.bender.extensions.commandCenter.api.CommandPayload.prototype = {
	values: null
	,get_values: function() {
		return this.values;
	}
	,classes: null
	,get_classes: function() {
		return this.classes;
	}
	,length: null
	,get_length: function() {
		if(this.get_classes() != null) return this.get_classes().length; else return 0;
	}
	,addPayload: function(payloadValue,payloadClass) {
		if(this.get_values() != null) this.get_values().push(payloadValue); else this.values = [payloadValue];
		if(this.get_classes() != null) this.get_classes().push(payloadClass); else this.classes = [payloadClass];
		return this;
	}
	,hasPayload: function() {
		if(this.get_values() != null && this.get_classes() != null) {
			if(this.get_values().length > 0 && this.get_classes().length == this.get_values().length) return true; else return false;
		} else return false;
	}
	,__class__: robotlegs.bender.extensions.commandCenter.api.CommandPayload
	,__properties__: {get_length:"get_length",get_classes:"get_classes",get_values:"get_values"}
};
robotlegs.bender.extensions.commandCenter.api.ICommandExecutor = function() { };
$hxClasses["robotlegs.bender.extensions.commandCenter.api.ICommandExecutor"] = robotlegs.bender.extensions.commandCenter.api.ICommandExecutor;
robotlegs.bender.extensions.commandCenter.api.ICommandExecutor.__name__ = ["robotlegs","bender","extensions","commandCenter","api","ICommandExecutor"];
robotlegs.bender.extensions.commandCenter.api.ICommandExecutor.prototype = {
	executeCommands: null
	,__class__: robotlegs.bender.extensions.commandCenter.api.ICommandExecutor
};
robotlegs.bender.extensions.commandCenter.api.ICommandMapping = function() { };
$hxClasses["robotlegs.bender.extensions.commandCenter.api.ICommandMapping"] = robotlegs.bender.extensions.commandCenter.api.ICommandMapping;
robotlegs.bender.extensions.commandCenter.api.ICommandMapping.__name__ = ["robotlegs","bender","extensions","commandCenter","api","ICommandMapping"];
robotlegs.bender.extensions.commandCenter.api.ICommandMapping.prototype = {
	commandClass: null
	,executeMethod: null
	,guards: null
	,hooks: null
	,fireOnce: null
	,payloadInjectionEnabled: null
	,setExecuteMethod: null
	,addGuards: null
	,addHooks: null
	,setFireOnce: null
	,setPayloadInjectionEnabled: null
	,__class__: robotlegs.bender.extensions.commandCenter.api.ICommandMapping
};
robotlegs.bender.extensions.commandCenter.api.ICommandMappingList = function() { };
$hxClasses["robotlegs.bender.extensions.commandCenter.api.ICommandMappingList"] = robotlegs.bender.extensions.commandCenter.api.ICommandMappingList;
robotlegs.bender.extensions.commandCenter.api.ICommandMappingList.__name__ = ["robotlegs","bender","extensions","commandCenter","api","ICommandMappingList"];
robotlegs.bender.extensions.commandCenter.api.ICommandMappingList.prototype = {
	getList: null
	,addMapping: null
	,removeMapping: null
	,removeMappingFor: null
	,removeAllMappings: null
	,__class__: robotlegs.bender.extensions.commandCenter.api.ICommandMappingList
};
robotlegs.bender.extensions.commandCenter.api.ICommandTrigger = function() { };
$hxClasses["robotlegs.bender.extensions.commandCenter.api.ICommandTrigger"] = robotlegs.bender.extensions.commandCenter.api.ICommandTrigger;
robotlegs.bender.extensions.commandCenter.api.ICommandTrigger.__name__ = ["robotlegs","bender","extensions","commandCenter","api","ICommandTrigger"];
robotlegs.bender.extensions.commandCenter.api.ICommandTrigger.prototype = {
	activate: null
	,deactivate: null
	,__class__: robotlegs.bender.extensions.commandCenter.api.ICommandTrigger
};
robotlegs.bender.extensions.commandCenter.dsl = {};
robotlegs.bender.extensions.commandCenter.dsl.ICommandConfigurator = function() { };
$hxClasses["robotlegs.bender.extensions.commandCenter.dsl.ICommandConfigurator"] = robotlegs.bender.extensions.commandCenter.dsl.ICommandConfigurator;
robotlegs.bender.extensions.commandCenter.dsl.ICommandConfigurator.__name__ = ["robotlegs","bender","extensions","commandCenter","dsl","ICommandConfigurator"];
robotlegs.bender.extensions.commandCenter.dsl.ICommandConfigurator.prototype = {
	once: null
	,__class__: robotlegs.bender.extensions.commandCenter.dsl.ICommandConfigurator
};
robotlegs.bender.extensions.commandCenter.dsl.ICommandMapper = function() { };
$hxClasses["robotlegs.bender.extensions.commandCenter.dsl.ICommandMapper"] = robotlegs.bender.extensions.commandCenter.dsl.ICommandMapper;
robotlegs.bender.extensions.commandCenter.dsl.ICommandMapper.__name__ = ["robotlegs","bender","extensions","commandCenter","dsl","ICommandMapper"];
robotlegs.bender.extensions.commandCenter.dsl.ICommandMapper.prototype = {
	toCommand: null
	,__class__: robotlegs.bender.extensions.commandCenter.dsl.ICommandMapper
};
robotlegs.bender.extensions.commandCenter.dsl.ICommandUnmapper = function() { };
$hxClasses["robotlegs.bender.extensions.commandCenter.dsl.ICommandUnmapper"] = robotlegs.bender.extensions.commandCenter.dsl.ICommandUnmapper;
robotlegs.bender.extensions.commandCenter.dsl.ICommandUnmapper.__name__ = ["robotlegs","bender","extensions","commandCenter","dsl","ICommandUnmapper"];
robotlegs.bender.extensions.commandCenter.impl = {};
robotlegs.bender.extensions.commandCenter.impl.CommandExecutor = function(injector,removeMapping,handleResult) {
	this._injector = injector.createChild();
	this._removeMapping = removeMapping;
	this._handleResult = handleResult;
};
$hxClasses["robotlegs.bender.extensions.commandCenter.impl.CommandExecutor"] = robotlegs.bender.extensions.commandCenter.impl.CommandExecutor;
robotlegs.bender.extensions.commandCenter.impl.CommandExecutor.__name__ = ["robotlegs","bender","extensions","commandCenter","impl","CommandExecutor"];
robotlegs.bender.extensions.commandCenter.impl.CommandExecutor.__interfaces__ = [robotlegs.bender.extensions.commandCenter.api.ICommandExecutor];
robotlegs.bender.extensions.commandCenter.impl.CommandExecutor.prototype = {
	_injector: null
	,_removeMapping: null
	,_handleResult: null
	,executeCommands: function(mappings,payload) {
		var length = mappings.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			this.executeCommand(mappings[i],payload);
		}
	}
	,executeCommand: function(mapping,payload) {
		var hasPayload = payload != null && payload.hasPayload();
		var injectionEnabled = hasPayload && mapping.get_payloadInjectionEnabled();
		var command = null;
		if(injectionEnabled) this.mapPayload(payload);
		if(mapping.get_guards().length == 0 || robotlegs.bender.framework.impl.GuardsApprove.call(mapping.get_guards(),this._injector)) {
			var commandClass = mapping.get_commandClass();
			if(mapping.get_fireOnce() && this._removeMapping != null) this._removeMapping(mapping);
			command = this._injector.getOrCreateNewInstance(commandClass);
			if(mapping.get_hooks().length > 0) {
				this._injector.map(commandClass).toValue(command);
				robotlegs.bender.framework.impl.ApplyHooks.call(mapping.get_hooks(),this._injector);
				this._injector.unmap(commandClass);
			}
		}
		if(injectionEnabled) this.unmapPayload(payload);
		if(command != null && mapping.get_executeMethod() != null) {
			var executeMethod = Reflect.getProperty(command,mapping.get_executeMethod());
			var result;
			if(hasPayload && executeMethod.length > 0) result = Reflect.callMethod(null,executeMethod,payload.get_values()); else result = executeMethod.apply(command,[]);
			if(this._handleResult != null) this._handleResult(result,command,mapping);
		}
	}
	,mapPayload: function(payload) {
		var i = payload.get_length();
		while((function($this) {
			var $r;
			var a = i--;
			var aNeg = a < 0;
			var bNeg = 0 < 0;
			$r = aNeg != bNeg?aNeg:a > 0;
			return $r;
		}(this))) this._injector.map(payload.get_classes()[i]).toValue(payload.get_values()[i]);
	}
	,unmapPayload: function(payload) {
		var i = payload.get_length();
		while((function($this) {
			var $r;
			var a = i--;
			var aNeg = a < 0;
			var bNeg = 0 < 0;
			$r = aNeg != bNeg?aNeg:a > 0;
			return $r;
		}(this))) this._injector.unmap(payload.get_classes()[i]);
	}
	,__class__: robotlegs.bender.extensions.commandCenter.impl.CommandExecutor
};
robotlegs.bender.extensions.commandCenter.impl.CommandMapper = function(mappings) {
	this._mappings = mappings;
};
$hxClasses["robotlegs.bender.extensions.commandCenter.impl.CommandMapper"] = robotlegs.bender.extensions.commandCenter.impl.CommandMapper;
robotlegs.bender.extensions.commandCenter.impl.CommandMapper.__name__ = ["robotlegs","bender","extensions","commandCenter","impl","CommandMapper"];
robotlegs.bender.extensions.commandCenter.impl.CommandMapper.__interfaces__ = [robotlegs.bender.extensions.commandCenter.dsl.ICommandConfigurator,robotlegs.bender.extensions.commandCenter.dsl.ICommandUnmapper,robotlegs.bender.extensions.commandCenter.dsl.ICommandMapper];
robotlegs.bender.extensions.commandCenter.impl.CommandMapper.prototype = {
	_mappings: null
	,_mapping: null
	,toCommand: function(commandClass) {
		this._mapping = new robotlegs.bender.extensions.commandCenter.impl.CommandMapping(commandClass);
		this._mappings.addMapping(this._mapping);
		return this;
	}
	,fromCommand: function(commandClass) {
		this._mappings.removeMappingFor(commandClass);
	}
	,fromAll: function() {
		this._mappings.removeAllMappings();
	}
	,once: function(value) {
		if(value == null) value = true;
		this._mapping.setFireOnce(value);
		return this;
	}
	,withGuards: function(guards) {
		($_=this._mapping,$bind($_,$_.addGuards)).apply(null,guards);
		return this;
	}
	,withHooks: function(hooks) {
		($_=this._mapping,$bind($_,$_.addHooks)).apply(null,hooks);
		return this;
	}
	,withExecuteMethod: function(name) {
		this._mapping.setExecuteMethod(name);
		return this;
	}
	,withPayloadInjection: function(value) {
		if(value == null) value = true;
		this._mapping.setPayloadInjectionEnabled(value);
		return this;
	}
	,__class__: robotlegs.bender.extensions.commandCenter.impl.CommandMapper
};
robotlegs.bender.extensions.commandCenter.impl.CommandMapping = function(commandClass) {
	this._payloadInjectionEnabled = true;
	this._fireOnce = false;
	this._hooks = [];
	this._guards = [];
	this._executeMethod = "execute";
	this._commandClass = commandClass;
};
$hxClasses["robotlegs.bender.extensions.commandCenter.impl.CommandMapping"] = robotlegs.bender.extensions.commandCenter.impl.CommandMapping;
robotlegs.bender.extensions.commandCenter.impl.CommandMapping.__name__ = ["robotlegs","bender","extensions","commandCenter","impl","CommandMapping"];
robotlegs.bender.extensions.commandCenter.impl.CommandMapping.__interfaces__ = [robotlegs.bender.extensions.commandCenter.api.ICommandMapping];
robotlegs.bender.extensions.commandCenter.impl.CommandMapping.prototype = {
	_commandClass: null
	,commandClass: null
	,get_commandClass: function() {
		return this._commandClass;
	}
	,_executeMethod: null
	,executeMethod: null
	,get_executeMethod: function() {
		return this._executeMethod;
	}
	,_guards: null
	,guards: null
	,get_guards: function() {
		return this._guards;
	}
	,_hooks: null
	,hooks: null
	,get_hooks: function() {
		return this._hooks;
	}
	,_fireOnce: null
	,fireOnce: null
	,get_fireOnce: function() {
		return this._fireOnce;
	}
	,_payloadInjectionEnabled: null
	,payloadInjectionEnabled: null
	,get_payloadInjectionEnabled: function() {
		return this._payloadInjectionEnabled;
	}
	,setExecuteMethod: function(name) {
		this._executeMethod = name;
		return this;
	}
	,addGuards: function(guards) {
		this._guards = ($_=this._guards,$bind($_,$_.concat)).apply(null,guards);
		return this;
	}
	,addHooks: function(hooks) {
		this._hooks = ($_=this._hooks,$bind($_,$_.concat)).apply(null,hooks);
		return this;
	}
	,setFireOnce: function(value) {
		this._fireOnce = value;
		return this;
	}
	,setPayloadInjectionEnabled: function(value) {
		this._payloadInjectionEnabled = value;
		return this;
	}
	,toString: function() {
		return "Command " + Std.string(this._commandClass);
	}
	,__class__: robotlegs.bender.extensions.commandCenter.impl.CommandMapping
	,__properties__: {get_payloadInjectionEnabled:"get_payloadInjectionEnabled",get_fireOnce:"get_fireOnce",get_hooks:"get_hooks",get_guards:"get_guards",get_executeMethod:"get_executeMethod",get_commandClass:"get_commandClass"}
};
robotlegs.bender.extensions.commandCenter.impl.CommandMappingList = function(trigger,processors,logger) {
	this._sorted = false;
	this._mappings = new Array();
	this._mappingsByCommand = new haxe.ds.StringMap();
	this._trigger = trigger;
	this._processors = processors;
	this._logger = logger;
};
$hxClasses["robotlegs.bender.extensions.commandCenter.impl.CommandMappingList"] = robotlegs.bender.extensions.commandCenter.impl.CommandMappingList;
robotlegs.bender.extensions.commandCenter.impl.CommandMappingList.__name__ = ["robotlegs","bender","extensions","commandCenter","impl","CommandMappingList"];
robotlegs.bender.extensions.commandCenter.impl.CommandMappingList.__interfaces__ = [robotlegs.bender.extensions.commandCenter.api.ICommandMappingList];
robotlegs.bender.extensions.commandCenter.impl.CommandMappingList.prototype = {
	_mappingsByCommand: null
	,_mappings: null
	,_trigger: null
	,_processors: null
	,_logger: null
	,_compareFunction: null
	,_sorted: null
	,getList: function() {
		if(!this._sorted) this.sortMappings();
		return this._mappings.concat([]);
	}
	,withSortFunction: function(sorter) {
		this._sorted = false;
		this._compareFunction = sorter;
		return this;
	}
	,addMapping: function(mapping) {
		this._sorted = false;
		this.applyProcessors(mapping);
		var oldMapping;
		var key = org.swiftsuspenders.utils.UID.instanceID(mapping.get_commandClass());
		oldMapping = this._mappingsByCommand.get(key);
		if(oldMapping != null) this.overwriteMapping(oldMapping,mapping); else {
			this.storeMapping(mapping);
			if(this._mappings.length == 1) this._trigger.activate();
		}
	}
	,removeMapping: function(mapping) {
		if((function($this) {
			var $r;
			var key = org.swiftsuspenders.utils.UID.clearInstanceID(mapping.get_commandClass());
			$r = $this._mappingsByCommand.get(key);
			return $r;
		}(this))) {
			this.deleteMapping(mapping);
			if(this._mappings.length == 0) this._trigger.deactivate();
		}
	}
	,removeMappingFor: function(commandClass) {
		var mapping;
		var key = org.swiftsuspenders.utils.UID.instanceID(commandClass);
		mapping = this._mappingsByCommand.get(key);
		if(mapping != null) this.removeMapping(mapping);
	}
	,removeAllMappings: function() {
		if(this._mappings.length > 0) {
			var list = this._mappings.concat([]);
			var length = list.length;
			while(length-- > 0) this.deleteMapping(list[length]);
			this._trigger.deactivate();
		}
	}
	,storeMapping: function(mapping) {
		var k = org.swiftsuspenders.utils.UID.instanceID(mapping.get_commandClass());
		this._mappingsByCommand.set(k,mapping);
		mapping;
		this._mappings.push(mapping);
		if(this._logger != null) this._logger.debug("{0} mapped to {1}",[this._trigger,mapping]);
	}
	,deleteMapping: function(mapping) {
		var key = org.swiftsuspenders.utils.UID.clearInstanceID(mapping.get_commandClass());
		this._mappingsByCommand.remove(key);
		this._mappings.splice(HxOverrides.indexOf(this._mappings,mapping,0),1);
		if(this._logger != null) this._logger.debug("{0} unmapped from {1}",[this._trigger,mapping]);
	}
	,overwriteMapping: function(oldMapping,newMapping) {
		if(this._logger != null) this._logger.warn("{0} already mapped to {1}\n" + "If you have overridden this mapping intentionally you can use \"unmap()\" " + "prior to your replacement mapping in order to avoid seeing this message.\n",[this._trigger,oldMapping]);
		this.deleteMapping(oldMapping);
		this.storeMapping(newMapping);
	}
	,sortMappings: function() {
		this._sorted = true;
	}
	,applyProcessors: function(mapping) {
		var _g = 0;
		var _g1 = this._processors;
		while(_g < _g1.length) {
			var processor = _g1[_g];
			++_g;
			processor(mapping);
		}
	}
	,__class__: robotlegs.bender.extensions.commandCenter.impl.CommandMappingList
};
robotlegs.bender.extensions.commandCenter.impl.CommandTriggerMap = function(keyFactory,triggerFactory) {
	this._triggers = new haxe.ds.StringMap();
	this._keyFactory = keyFactory;
	this._triggerFactory = triggerFactory;
};
$hxClasses["robotlegs.bender.extensions.commandCenter.impl.CommandTriggerMap"] = robotlegs.bender.extensions.commandCenter.impl.CommandTriggerMap;
robotlegs.bender.extensions.commandCenter.impl.CommandTriggerMap.__name__ = ["robotlegs","bender","extensions","commandCenter","impl","CommandTriggerMap"];
robotlegs.bender.extensions.commandCenter.impl.CommandTriggerMap.prototype = {
	_triggers: null
	,_keyFactory: null
	,_triggerFactory: null
	,getTrigger: function(params) {
		var key = this.getKey(params);
		if((function($this) {
			var $r;
			var key1 = org.swiftsuspenders.utils.UID.instanceID(key);
			$r = $this._triggers.get(key1);
			return $r;
		}(this)) == null) {
			var k = org.swiftsuspenders.utils.UID.instanceID(key);
			var v = this.createTrigger(params);
			this._triggers.set(k,v);
			v;
		}
		var key2 = org.swiftsuspenders.utils.UID.instanceID(key);
		return this._triggers.get(key2);
	}
	,removeTrigger: function(params) {
		return this.destroyTrigger(this.getKey(params));
	}
	,getKey: function(mapperArgs) {
		return this._keyFactory.apply(null,mapperArgs);
	}
	,createTrigger: function(mapperArgs) {
		return this._triggerFactory.apply(null,mapperArgs);
	}
	,destroyTrigger: function(key) {
		var id = org.swiftsuspenders.utils.UID.clearInstanceID(key);
		var trigger = this._triggers.get(id);
		if(trigger != null) {
			trigger.deactivate();
			this._triggers.remove(id);
		}
		return trigger;
	}
	,__class__: robotlegs.bender.extensions.commandCenter.impl.CommandTriggerMap
};
robotlegs.bender.extensions.commandCenter.impl.NullCommandTrigger = function() {
};
$hxClasses["robotlegs.bender.extensions.commandCenter.impl.NullCommandTrigger"] = robotlegs.bender.extensions.commandCenter.impl.NullCommandTrigger;
robotlegs.bender.extensions.commandCenter.impl.NullCommandTrigger.__name__ = ["robotlegs","bender","extensions","commandCenter","impl","NullCommandTrigger"];
robotlegs.bender.extensions.commandCenter.impl.NullCommandTrigger.__interfaces__ = [robotlegs.bender.extensions.commandCenter.api.ICommandTrigger];
robotlegs.bender.extensions.commandCenter.impl.NullCommandTrigger.prototype = {
	activate: function() {
	}
	,deactivate: function() {
	}
	,__class__: robotlegs.bender.extensions.commandCenter.impl.NullCommandTrigger
};
robotlegs.bender.extensions.contextView = {};
robotlegs.bender.extensions.contextView.ContextView = function(view) {
	this.view = view;
};
$hxClasses["robotlegs.bender.extensions.contextView.ContextView"] = robotlegs.bender.extensions.contextView.ContextView;
robotlegs.bender.extensions.contextView.ContextView.__name__ = ["robotlegs","bender","extensions","contextView","ContextView"];
robotlegs.bender.extensions.contextView.ContextView.prototype = {
	view: null
	,__class__: robotlegs.bender.extensions.contextView.ContextView
};
robotlegs.bender.extensions.contextView.ContextViewExtension = function() { };
$hxClasses["robotlegs.bender.extensions.contextView.ContextViewExtension"] = robotlegs.bender.extensions.contextView.ContextViewExtension;
robotlegs.bender.extensions.contextView.ContextViewExtension.__name__ = ["robotlegs","bender","extensions","contextView","ContextViewExtension"];
robotlegs.bender.extensions.contextView.ContextViewExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.contextView.ContextViewExtension.prototype = {
	_injector: null
	,_logger: null
	,extend: function(context) {
		this._injector = context.get_injector();
		this._logger = context.getLogger(this);
		context.beforeInitializing($bind(this,this.beforeInitializing));
		context.addConfigHandler(robotlegs.bender.extensions.matching.InstanceOfType.call(robotlegs.bender.extensions.contextView.ContextView),$bind(this,this.handleContextView));
	}
	,handleContextView: function(contextView) {
		if(this._injector.hasDirectMapping(robotlegs.bender.extensions.contextView.ContextView)) this._logger.warn("A contextView has already been installed, ignoring {0}",[contextView.view]); else {
			this._logger.debug("Mapping {0} as contextView",[contextView.view]);
			this._injector.map(robotlegs.bender.extensions.contextView.ContextView).toValue(contextView);
		}
	}
	,beforeInitializing: function() {
		if(!this._injector.hasDirectMapping(robotlegs.bender.extensions.contextView.ContextView)) this._logger.error("A ContextView must be installed if you install the ContextViewExtension.");
	}
	,__class__: robotlegs.bender.extensions.contextView.ContextViewExtension
};
robotlegs.bender.extensions.contextView.ContextViewListenerConfig = function() {
};
$hxClasses["robotlegs.bender.extensions.contextView.ContextViewListenerConfig"] = robotlegs.bender.extensions.contextView.ContextViewListenerConfig;
robotlegs.bender.extensions.contextView.ContextViewListenerConfig.__name__ = ["robotlegs","bender","extensions","contextView","ContextViewListenerConfig"];
robotlegs.bender.extensions.contextView.ContextViewListenerConfig.__interfaces__ = [robotlegs.bender.framework.api.IConfig];
robotlegs.bender.extensions.contextView.ContextViewListenerConfig.prototype = {
	contextView: null
	,viewManager: null
	,configure: function() {
		this.viewManager.addContainer(this.contextView.view);
	}
	,__class__: robotlegs.bender.extensions.contextView.ContextViewListenerConfig
};
robotlegs.bender.extensions.contextView.StageSyncExtension = function() { };
$hxClasses["robotlegs.bender.extensions.contextView.StageSyncExtension"] = robotlegs.bender.extensions.contextView.StageSyncExtension;
robotlegs.bender.extensions.contextView.StageSyncExtension.__name__ = ["robotlegs","bender","extensions","contextView","StageSyncExtension"];
robotlegs.bender.extensions.contextView.StageSyncExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.contextView.StageSyncExtension.prototype = {
	_context: null
	,_contextView: null
	,_logger: null
	,extend: function(context) {
		this._context = context;
		this._logger = context.getLogger(this);
		this._context.addConfigHandler(robotlegs.bender.extensions.matching.InstanceOfType.call(robotlegs.bender.extensions.contextView.ContextView),$bind(this,this.handleContextView));
	}
	,handleContextView: function(contextView) {
		if(this._contextView != null) {
			this._logger.warn("A contextView has already been installed, ignoring {0}",[contextView.view]);
			return;
		}
		this._contextView = contextView.view;
		if(this._contextView.stage != null) this.initializeContext(); else {
			this._logger.debug("Context view is not yet on stage. Waiting...");
			this._contextView.addEventListener(openfl.events.Event.ADDED_TO_STAGE,$bind(this,this.onAddedToStage));
		}
	}
	,onAddedToStage: function(event) {
		this._contextView.removeEventListener(openfl.events.Event.ADDED_TO_STAGE,$bind(this,this.onAddedToStage));
		this.initializeContext();
	}
	,initializeContext: function() {
		this._logger.debug("Context view is now on stage. Initializing context...");
		this._context.initialize();
		this._contextView.addEventListener(openfl.events.Event.REMOVED_FROM_STAGE,$bind(this,this.onRemovedFromStage));
	}
	,onRemovedFromStage: function(event) {
		this._logger.debug("Context view has left the stage. Destroying context...");
		this._contextView.removeEventListener(openfl.events.Event.REMOVED_FROM_STAGE,$bind(this,this.onRemovedFromStage));
		this._context.destroy();
	}
	,__class__: robotlegs.bender.extensions.contextView.StageSyncExtension
};
robotlegs.bender.extensions.directCommandMap = {};
robotlegs.bender.extensions.directCommandMap.DirectCommandMapExtension = function() { };
$hxClasses["robotlegs.bender.extensions.directCommandMap.DirectCommandMapExtension"] = robotlegs.bender.extensions.directCommandMap.DirectCommandMapExtension;
robotlegs.bender.extensions.directCommandMap.DirectCommandMapExtension.__name__ = ["robotlegs","bender","extensions","directCommandMap","DirectCommandMapExtension"];
robotlegs.bender.extensions.directCommandMap.DirectCommandMapExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.directCommandMap.DirectCommandMapExtension.prototype = {
	extend: function(context) {
		context.get_injector().map(robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMap).toType(robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMap);
	}
	,__class__: robotlegs.bender.extensions.directCommandMap.DirectCommandMapExtension
};
robotlegs.bender.extensions.directCommandMap.api = {};
robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMapper = function() { };
$hxClasses["robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMapper"] = robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMapper;
robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMapper.__name__ = ["robotlegs","bender","extensions","directCommandMap","api","IDirectCommandMapper"];
robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMap = function() { };
$hxClasses["robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMap"] = robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMap;
robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMap.__name__ = ["robotlegs","bender","extensions","directCommandMap","api","IDirectCommandMap"];
robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMap.__interfaces__ = [robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMapper];
robotlegs.bender.extensions.directCommandMap.dsl = {};
robotlegs.bender.extensions.directCommandMap.dsl.IDirectCommandConfigurator = function() { };
$hxClasses["robotlegs.bender.extensions.directCommandMap.dsl.IDirectCommandConfigurator"] = robotlegs.bender.extensions.directCommandMap.dsl.IDirectCommandConfigurator;
robotlegs.bender.extensions.directCommandMap.dsl.IDirectCommandConfigurator.__name__ = ["robotlegs","bender","extensions","directCommandMap","dsl","IDirectCommandConfigurator"];
robotlegs.bender.extensions.directCommandMap.dsl.IDirectCommandConfigurator.__interfaces__ = [robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMapper];
robotlegs.bender.extensions.directCommandMap.impl = {};
robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMap = function(context) {
	this._mappingProcessors = [];
	this._context = context;
	var sandboxedInjector = context.get_injector().createChild();
	sandboxedInjector.map(robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMap).toValue(this);
	this._mappings = new robotlegs.bender.extensions.commandCenter.impl.CommandMappingList(new robotlegs.bender.extensions.commandCenter.impl.NullCommandTrigger(),this._mappingProcessors,context.getLogger(this));
	this._executor = new robotlegs.bender.extensions.commandCenter.impl.CommandExecutor(sandboxedInjector,($_=this._mappings,$bind($_,$_.removeMapping)));
};
$hxClasses["robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMap"] = robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMap;
robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMap.__name__ = ["robotlegs","bender","extensions","directCommandMap","impl","DirectCommandMap"];
robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMap.__interfaces__ = [robotlegs.bender.extensions.directCommandMap.api.IDirectCommandMap];
robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMap.prototype = {
	_mappingProcessors: null
	,_context: null
	,_executor: null
	,_mappings: null
	,map: function(commandClass) {
		return new robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMapper(this._executor,this._mappings,commandClass);
	}
	,detain: function(command) {
		this._context.detain(command);
	}
	,release: function(command) {
		this._context.release(command);
	}
	,execute: function(payload) {
		this._executor.executeCommands(this._mappings.getList(),payload);
	}
	,addMappingProcessor: function(handler) {
		if(HxOverrides.indexOf(this._mappingProcessors,handler,0) == -1) this._mappingProcessors.push(handler);
		return this;
	}
	,__class__: robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMap
};
robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMapper = function(executor,mappings,commandClass) {
	this._executor = executor;
	this._mappings = mappings;
	this._mapping = new robotlegs.bender.extensions.commandCenter.impl.CommandMapping(commandClass);
	this._mapping.setFireOnce(true);
	this._mappings.addMapping(this._mapping);
};
$hxClasses["robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMapper"] = robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMapper;
robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMapper.__name__ = ["robotlegs","bender","extensions","directCommandMap","impl","DirectCommandMapper"];
robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMapper.__interfaces__ = [robotlegs.bender.extensions.directCommandMap.dsl.IDirectCommandConfigurator];
robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMapper.prototype = {
	_mappings: null
	,_mapping: null
	,_executor: null
	,withExecuteMethod: function(name) {
		this._mapping.setExecuteMethod(name);
		return this;
	}
	,withGuards: function(guards) {
		($_=this._mapping,$bind($_,$_.addGuards)).apply(null,guards);
		return this;
	}
	,withHooks: function(hooks) {
		($_=this._mapping,$bind($_,$_.addHooks)).apply(null,hooks);
		return this;
	}
	,withPayloadInjection: function(value) {
		if(value == null) value = true;
		this._mapping.setPayloadInjectionEnabled(value);
		return this;
	}
	,execute: function(payload) {
		this._executor.executeCommands(this._mappings.getList(),payload);
	}
	,map: function(commandClass) {
		return new robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMapper(this._executor,this._mappings,commandClass);
	}
	,__class__: robotlegs.bender.extensions.directCommandMap.impl.DirectCommandMapper
};
robotlegs.bender.extensions.enhancedLogging = {};
robotlegs.bender.extensions.enhancedLogging.InjectableLoggerExtension = function() { };
$hxClasses["robotlegs.bender.extensions.enhancedLogging.InjectableLoggerExtension"] = robotlegs.bender.extensions.enhancedLogging.InjectableLoggerExtension;
robotlegs.bender.extensions.enhancedLogging.InjectableLoggerExtension.__name__ = ["robotlegs","bender","extensions","enhancedLogging","InjectableLoggerExtension"];
robotlegs.bender.extensions.enhancedLogging.InjectableLoggerExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.enhancedLogging.InjectableLoggerExtension.prototype = {
	extend: function(context) {
		context.get_injector().map(robotlegs.bender.framework.api.ILogger).toProvider(new robotlegs.bender.extensions.enhancedLogging.impl.LoggerProvider(context));
	}
	,__class__: robotlegs.bender.extensions.enhancedLogging.InjectableLoggerExtension
};
robotlegs.bender.extensions.enhancedLogging.TraceLoggingExtension = function() { };
$hxClasses["robotlegs.bender.extensions.enhancedLogging.TraceLoggingExtension"] = robotlegs.bender.extensions.enhancedLogging.TraceLoggingExtension;
robotlegs.bender.extensions.enhancedLogging.TraceLoggingExtension.__name__ = ["robotlegs","bender","extensions","enhancedLogging","TraceLoggingExtension"];
robotlegs.bender.extensions.enhancedLogging.TraceLoggingExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.enhancedLogging.TraceLoggingExtension.prototype = {
	extend: function(context) {
		context.addLogTarget(new robotlegs.bender.extensions.enhancedLogging.impl.TraceLogTarget(context));
	}
	,__class__: robotlegs.bender.extensions.enhancedLogging.TraceLoggingExtension
};
robotlegs.bender.extensions.enhancedLogging.impl = {};
robotlegs.bender.extensions.enhancedLogging.impl.LogMessageParser = function() {
};
$hxClasses["robotlegs.bender.extensions.enhancedLogging.impl.LogMessageParser"] = robotlegs.bender.extensions.enhancedLogging.impl.LogMessageParser;
robotlegs.bender.extensions.enhancedLogging.impl.LogMessageParser.__name__ = ["robotlegs","bender","extensions","enhancedLogging","impl","LogMessageParser"];
robotlegs.bender.extensions.enhancedLogging.impl.LogMessageParser.prototype = {
	parseMessage: function(message,params) {
		if(params != null) {
			var numParams = params.length;
			var _g = 0;
			while(_g < numParams) {
				var i = _g++;
				message = message.split("{" + i + "}").join(params[i]);
			}
		}
		return message;
	}
	,__class__: robotlegs.bender.extensions.enhancedLogging.impl.LogMessageParser
};
robotlegs.bender.extensions.enhancedLogging.impl.LoggerProvider = function(context) {
	this._context = context;
};
$hxClasses["robotlegs.bender.extensions.enhancedLogging.impl.LoggerProvider"] = robotlegs.bender.extensions.enhancedLogging.impl.LoggerProvider;
robotlegs.bender.extensions.enhancedLogging.impl.LoggerProvider.__name__ = ["robotlegs","bender","extensions","enhancedLogging","impl","LoggerProvider"];
robotlegs.bender.extensions.enhancedLogging.impl.LoggerProvider.__interfaces__ = [org.swiftsuspenders.dependencyproviders.DependencyProvider];
robotlegs.bender.extensions.enhancedLogging.impl.LoggerProvider.prototype = {
	_context: null
	,apply: function(targetType,activeInjector,injectParameters) {
		return this._context.getLogger(targetType);
	}
	,destroy: function() {
	}
	,__class__: robotlegs.bender.extensions.enhancedLogging.impl.LoggerProvider
};
robotlegs.bender.framework.api.ILogTarget = function() { };
$hxClasses["robotlegs.bender.framework.api.ILogTarget"] = robotlegs.bender.framework.api.ILogTarget;
robotlegs.bender.framework.api.ILogTarget.__name__ = ["robotlegs","bender","framework","api","ILogTarget"];
robotlegs.bender.framework.api.ILogTarget.prototype = {
	log: null
	,__class__: robotlegs.bender.framework.api.ILogTarget
};
robotlegs.bender.extensions.enhancedLogging.impl.TraceLogTarget = function(context) {
	this._messageParser = new robotlegs.bender.extensions.enhancedLogging.impl.LogMessageParser();
	this._context = context;
};
$hxClasses["robotlegs.bender.extensions.enhancedLogging.impl.TraceLogTarget"] = robotlegs.bender.extensions.enhancedLogging.impl.TraceLogTarget;
robotlegs.bender.extensions.enhancedLogging.impl.TraceLogTarget.__name__ = ["robotlegs","bender","extensions","enhancedLogging","impl","TraceLogTarget"];
robotlegs.bender.extensions.enhancedLogging.impl.TraceLogTarget.__interfaces__ = [robotlegs.bender.framework.api.ILogTarget];
robotlegs.bender.extensions.enhancedLogging.impl.TraceLogTarget.prototype = {
	_messageParser: null
	,_context: null
	,log: function(source,level,timestamp,message,params) {
		var sourceName = org.swiftsuspenders.utils.CallProxy.getClassName(Type.getClass(source));
		var split = sourceName.split(".");
		sourceName = split[split.length - 1];
		haxe.Log.trace(timestamp + " " + robotlegs.bender.framework.api.LogLevel.NAME[level] + " " + sourceName + ": " + " " + this._messageParser.parseMessage(message,params),{ fileName : "TraceLogTarget.hx", lineNumber : 59, className : "robotlegs.bender.extensions.enhancedLogging.impl.TraceLogTarget", methodName : "log"});
	}
	,__class__: robotlegs.bender.extensions.enhancedLogging.impl.TraceLogTarget
};
robotlegs.bender.extensions.eventCommandMap = {};
robotlegs.bender.extensions.eventCommandMap.EventCommandMapExtension = function() { };
$hxClasses["robotlegs.bender.extensions.eventCommandMap.EventCommandMapExtension"] = robotlegs.bender.extensions.eventCommandMap.EventCommandMapExtension;
robotlegs.bender.extensions.eventCommandMap.EventCommandMapExtension.__name__ = ["robotlegs","bender","extensions","eventCommandMap","EventCommandMapExtension"];
robotlegs.bender.extensions.eventCommandMap.EventCommandMapExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.eventCommandMap.EventCommandMapExtension.prototype = {
	extend: function(context) {
		context.get_injector().map(robotlegs.bender.extensions.eventCommandMap.api.IEventCommandMap).toSingleton(robotlegs.bender.extensions.eventCommandMap.impl.EventCommandMap);
	}
	,__class__: robotlegs.bender.extensions.eventCommandMap.EventCommandMapExtension
};
robotlegs.bender.extensions.eventCommandMap.api = {};
robotlegs.bender.extensions.eventCommandMap.api.IEventCommandMap = function() { };
$hxClasses["robotlegs.bender.extensions.eventCommandMap.api.IEventCommandMap"] = robotlegs.bender.extensions.eventCommandMap.api.IEventCommandMap;
robotlegs.bender.extensions.eventCommandMap.api.IEventCommandMap.__name__ = ["robotlegs","bender","extensions","eventCommandMap","api","IEventCommandMap"];
robotlegs.bender.extensions.eventCommandMap.impl = {};
robotlegs.bender.extensions.eventCommandMap.impl.EventCommandMap = function(context,dispatcher) {
	this._mappingProcessors = [];
	this._injector = context.get_injector();
	this._logger = context.getLogger(this);
	this._dispatcher = dispatcher;
	this._triggerMap = new robotlegs.bender.extensions.commandCenter.impl.CommandTriggerMap($bind(this,this.getKey),$bind(this,this.createTrigger));
};
$hxClasses["robotlegs.bender.extensions.eventCommandMap.impl.EventCommandMap"] = robotlegs.bender.extensions.eventCommandMap.impl.EventCommandMap;
robotlegs.bender.extensions.eventCommandMap.impl.EventCommandMap.__name__ = ["robotlegs","bender","extensions","eventCommandMap","impl","EventCommandMap"];
robotlegs.bender.extensions.eventCommandMap.impl.EventCommandMap.__interfaces__ = [robotlegs.bender.extensions.eventCommandMap.api.IEventCommandMap];
robotlegs.bender.extensions.eventCommandMap.impl.EventCommandMap.prototype = {
	_mappingProcessors: null
	,_injector: null
	,_dispatcher: null
	,_triggerMap: null
	,_logger: null
	,map: function(type,eventClass) {
		return this.getTrigger(type,eventClass).createMapper();
	}
	,unmap: function(type,eventClass) {
		return this.getTrigger(type,eventClass).createMapper();
	}
	,addMappingProcessor: function(handler) {
		if(HxOverrides.indexOf(this._mappingProcessors,handler,0) == -1) this._mappingProcessors.push(handler);
		return this;
	}
	,getKey: function(type,eventClass) {
		return type + Std.string(eventClass);
	}
	,getTrigger: function(type,eventClass) {
		return js.Boot.__cast(this._triggerMap.getTrigger([type,eventClass]) , robotlegs.bender.extensions.eventCommandMap.impl.EventCommandTrigger);
	}
	,createTrigger: function(type,eventClass) {
		return new robotlegs.bender.extensions.eventCommandMap.impl.EventCommandTrigger(this._injector,this._dispatcher,type,eventClass,this._mappingProcessors,this._logger);
	}
	,__class__: robotlegs.bender.extensions.eventCommandMap.impl.EventCommandMap
};
robotlegs.bender.extensions.eventCommandMap.impl.EventCommandTrigger = function(injector,dispatcher,type,eventClass,processors,logger) {
	this._dispatcher = dispatcher;
	this._type = type;
	this._eventClass = eventClass;
	this._mappings = new robotlegs.bender.extensions.commandCenter.impl.CommandMappingList(this,processors,logger);
	this._executor = new robotlegs.bender.extensions.commandCenter.impl.CommandExecutor(injector,($_=this._mappings,$bind($_,$_.removeMapping)));
};
$hxClasses["robotlegs.bender.extensions.eventCommandMap.impl.EventCommandTrigger"] = robotlegs.bender.extensions.eventCommandMap.impl.EventCommandTrigger;
robotlegs.bender.extensions.eventCommandMap.impl.EventCommandTrigger.__name__ = ["robotlegs","bender","extensions","eventCommandMap","impl","EventCommandTrigger"];
robotlegs.bender.extensions.eventCommandMap.impl.EventCommandTrigger.__interfaces__ = [robotlegs.bender.extensions.commandCenter.api.ICommandTrigger];
robotlegs.bender.extensions.eventCommandMap.impl.EventCommandTrigger.prototype = {
	_dispatcher: null
	,_type: null
	,_eventClass: null
	,_mappings: null
	,_executor: null
	,createMapper: function() {
		return new robotlegs.bender.extensions.commandCenter.impl.CommandMapper(this._mappings);
	}
	,activate: function() {
		this._dispatcher.addEventListener(this._type,$bind(this,this.eventHandler));
	}
	,deactivate: function() {
		this._dispatcher.removeEventListener(this._type,$bind(this,this.eventHandler));
	}
	,toString: function() {
		return Std.string(this._eventClass) + " with selector '" + this._type + "'";
	}
	,eventHandler: function(event) {
		var eventConstructor = Type.getClass(event);
		var payloadEventClass;
		if(eventConstructor == this._eventClass || this._eventClass == null) payloadEventClass = eventConstructor; else if(this._eventClass == openfl.events.Event) payloadEventClass = this._eventClass; else return;
		this._executor.executeCommands(this._mappings.getList(),new robotlegs.bender.extensions.commandCenter.api.CommandPayload([event],[payloadEventClass]));
	}
	,__class__: robotlegs.bender.extensions.eventCommandMap.impl.EventCommandTrigger
};
robotlegs.bender.extensions.eventDispatcher = {};
robotlegs.bender.extensions.eventDispatcher.EventDispatcherExtension = function(eventDispatcher) {
	if(eventDispatcher != null) this._eventDispatcher = eventDispatcher; else this._eventDispatcher = new openfl.events.EventDispatcher();
};
$hxClasses["robotlegs.bender.extensions.eventDispatcher.EventDispatcherExtension"] = robotlegs.bender.extensions.eventDispatcher.EventDispatcherExtension;
robotlegs.bender.extensions.eventDispatcher.EventDispatcherExtension.__name__ = ["robotlegs","bender","extensions","eventDispatcher","EventDispatcherExtension"];
robotlegs.bender.extensions.eventDispatcher.EventDispatcherExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.eventDispatcher.EventDispatcherExtension.prototype = {
	_context: null
	,_eventDispatcher: null
	,_lifecycleRelay: null
	,extend: function(context) {
		this._context = context;
		this._context.get_injector().map(openfl.events.IEventDispatcher).toValue(this._eventDispatcher);
		this._context.beforeInitializing($bind(this,this.configureLifecycleEventRelay));
		this._context.afterDestroying($bind(this,this.destroyLifecycleEventRelay));
	}
	,configureLifecycleEventRelay: function() {
		this._lifecycleRelay = new robotlegs.bender.extensions.eventDispatcher.impl.LifecycleEventRelay(this._context,this._eventDispatcher);
	}
	,destroyLifecycleEventRelay: function() {
		this._lifecycleRelay.destroy();
	}
	,__class__: robotlegs.bender.extensions.eventDispatcher.EventDispatcherExtension
};
robotlegs.bender.extensions.eventDispatcher.impl = {};
robotlegs.bender.extensions.eventDispatcher.impl.EventRelay = function(source,destination,types) {
	this._active = false;
	this._source = source;
	this._destination = destination;
	if(types != null) this._types = types; else this._types = [];
};
$hxClasses["robotlegs.bender.extensions.eventDispatcher.impl.EventRelay"] = robotlegs.bender.extensions.eventDispatcher.impl.EventRelay;
robotlegs.bender.extensions.eventDispatcher.impl.EventRelay.__name__ = ["robotlegs","bender","extensions","eventDispatcher","impl","EventRelay"];
robotlegs.bender.extensions.eventDispatcher.impl.EventRelay.prototype = {
	_source: null
	,_destination: null
	,_types: null
	,_active: null
	,start: function() {
		if(!this._active) {
			this._active = true;
			this.addListeners();
		}
		return this;
	}
	,stop: function() {
		if(this._active) {
			this._active = false;
			this.removeListeners();
		}
		return this;
	}
	,addType: function(eventType) {
		this._types.push(eventType);
		if(this._active) this.addListener(eventType);
	}
	,removeType: function(eventType) {
		var index = HxOverrides.indexOf(this._types,eventType,0);
		if(index > -1) {
			this._types.splice(index,1);
			this.removeListener(eventType);
		}
	}
	,removeListener: function(type) {
		this._source.removeEventListener(type,($_=this._destination,$bind($_,$_.dispatchEvent)));
	}
	,addListener: function(type) {
		this._source.addEventListener(type,($_=this._destination,$bind($_,$_.dispatchEvent)));
	}
	,addListeners: function() {
		var _g = 0;
		var _g1 = this._types;
		while(_g < _g1.length) {
			var type = _g1[_g];
			++_g;
			this.addListener(type);
		}
	}
	,removeListeners: function() {
		var _g = 0;
		var _g1 = this._types;
		while(_g < _g1.length) {
			var type = _g1[_g];
			++_g;
			this.removeListener(type);
		}
	}
	,__class__: robotlegs.bender.extensions.eventDispatcher.impl.EventRelay
};
robotlegs.bender.framework.api.LifecycleEvent = function(type,error) {
	openfl.events.Event.call(this,type);
	this._error = error;
};
$hxClasses["robotlegs.bender.framework.api.LifecycleEvent"] = robotlegs.bender.framework.api.LifecycleEvent;
robotlegs.bender.framework.api.LifecycleEvent.__name__ = ["robotlegs","bender","framework","api","LifecycleEvent"];
robotlegs.bender.framework.api.LifecycleEvent.__super__ = openfl.events.Event;
robotlegs.bender.framework.api.LifecycleEvent.prototype = $extend(openfl.events.Event.prototype,{
	_error: null
	,error: null
	,clone: function() {
		return new robotlegs.bender.framework.api.LifecycleEvent(this.type,this.error);
	}
	,__class__: robotlegs.bender.framework.api.LifecycleEvent
});
robotlegs.bender.extensions.eventDispatcher.impl.LifecycleEventRelay = function(source,destination) {
	this._relay = new robotlegs.bender.extensions.eventDispatcher.impl.EventRelay(source,destination,robotlegs.bender.extensions.eventDispatcher.impl.LifecycleEventRelay.TYPES).start();
};
$hxClasses["robotlegs.bender.extensions.eventDispatcher.impl.LifecycleEventRelay"] = robotlegs.bender.extensions.eventDispatcher.impl.LifecycleEventRelay;
robotlegs.bender.extensions.eventDispatcher.impl.LifecycleEventRelay.__name__ = ["robotlegs","bender","extensions","eventDispatcher","impl","LifecycleEventRelay"];
robotlegs.bender.extensions.eventDispatcher.impl.LifecycleEventRelay.prototype = {
	_relay: null
	,destroy: function() {
		this._relay.stop();
		this._relay = null;
	}
	,__class__: robotlegs.bender.extensions.eventDispatcher.impl.LifecycleEventRelay
};
robotlegs.bender.extensions.imag.ImagCommandExtension = function() {
};
$hxClasses["robotlegs.bender.extensions.imag.ImagCommandExtension"] = robotlegs.bender.extensions.imag.ImagCommandExtension;
robotlegs.bender.extensions.imag.ImagCommandExtension.__name__ = ["robotlegs","bender","extensions","imag","ImagCommandExtension"];
robotlegs.bender.extensions.imag.ImagCommandExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.imag.ImagCommandExtension.prototype = {
	_uid: null
	,context: null
	,injector: null
	,extend: function(context) {
		this._uid = robotlegs.bender.framework.impl.UID.create(robotlegs.bender.extensions.imag.ImagCommandExtension);
		this.context = context;
		this.injector = context.get_injector();
		context.configure([robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands]);
	}
	,toString: function() {
		return this._uid;
	}
	,__class__: robotlegs.bender.extensions.imag.ImagCommandExtension
};
robotlegs.bender.extensions.imag.ImagModelExtension = function() {
	this._uid = robotlegs.bender.framework.impl.UID.create(robotlegs.bender.extensions.imag.ImagModelExtension);
};
$hxClasses["robotlegs.bender.extensions.imag.ImagModelExtension"] = robotlegs.bender.extensions.imag.ImagModelExtension;
robotlegs.bender.extensions.imag.ImagModelExtension.__name__ = ["robotlegs","bender","extensions","imag","ImagModelExtension"];
robotlegs.bender.extensions.imag.ImagModelExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.imag.ImagModelExtension.ConfigClass = null;
robotlegs.bender.extensions.imag.ImagModelExtension.prototype = {
	_uid: null
	,context: null
	,injector: null
	,extend: function(context) {
		this.context = context;
		this.injector = context.get_injector();
		context.addConfigHandler(robotlegs.bender.extensions.matching.InstanceOfType.call(robotlegs.bender.extensions.imag.api.model.config.IConfigModel),$bind(this,this.handleConfigModel));
		this.injector.map(robotlegs.bender.extensions.imag.impl.model.activity.ActivityModel).asSingleton();
	}
	,handleConfigModel: function(configModel) {
		robotlegs.bender.extensions.imag.ImagModelExtension.ConfigClass = Reflect.getProperty(configModel,"constructor");
		this.injector.map(robotlegs.bender.extensions.imag.api.model.config.IConfigModel).toSingleton(robotlegs.bender.extensions.imag.ImagModelExtension.ConfigClass);
	}
	,toString: function() {
		return this._uid;
	}
	,__class__: robotlegs.bender.extensions.imag.ImagModelExtension
};
robotlegs.bender.extensions.imag.ImagServiceExtension = function() {
	this._uid = robotlegs.bender.framework.impl.UID.create(robotlegs.bender.extensions.imag.ImagServiceExtension);
};
$hxClasses["robotlegs.bender.extensions.imag.ImagServiceExtension"] = robotlegs.bender.extensions.imag.ImagServiceExtension;
robotlegs.bender.extensions.imag.ImagServiceExtension.__name__ = ["robotlegs","bender","extensions","imag","ImagServiceExtension"];
robotlegs.bender.extensions.imag.ImagServiceExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.imag.ImagServiceExtension.prototype = {
	_uid: null
	,context: null
	,injector: null
	,extend: function(context) {
		this.context = context;
		this.injector = context.get_injector();
		this.injector.map(robotlegs.bender.extensions.imag.api.services.keyboard.IKeyboardMap).toSingleton(robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap);
		this.injector.map(robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap).asSingleton();
	}
	,toString: function() {
		return this._uid;
	}
	,__class__: robotlegs.bender.extensions.imag.ImagServiceExtension
};
robotlegs.bender.extensions.imag.ImagSignalExtension = function() {
	this._uid = robotlegs.bender.framework.impl.UID.create(robotlegs.bender.extensions.imag.ImagSignalExtension);
};
$hxClasses["robotlegs.bender.extensions.imag.ImagSignalExtension"] = robotlegs.bender.extensions.imag.ImagSignalExtension;
robotlegs.bender.extensions.imag.ImagSignalExtension.__name__ = ["robotlegs","bender","extensions","imag","ImagSignalExtension"];
robotlegs.bender.extensions.imag.ImagSignalExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.imag.ImagSignalExtension.prototype = {
	_uid: null
	,context: null
	,injector: null
	,extend: function(context) {
		this.context = context;
		this.injector = context.get_injector();
		context.get_injector().map(robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal).asSingleton();
		context.get_injector().map(robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal).asSingleton();
		context.get_injector().map(robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal).asSingleton();
	}
	,toString: function() {
		return this._uid;
	}
	,__class__: robotlegs.bender.extensions.imag.ImagSignalExtension
};
robotlegs.bender.extensions.imag.api.services = {};
robotlegs.bender.extensions.imag.api.services.keyboard = {};
robotlegs.bender.extensions.imag.api.services.keyboard.IKeyboardMap = function() { };
$hxClasses["robotlegs.bender.extensions.imag.api.services.keyboard.IKeyboardMap"] = robotlegs.bender.extensions.imag.api.services.keyboard.IKeyboardMap;
robotlegs.bender.extensions.imag.api.services.keyboard.IKeyboardMap.__name__ = ["robotlegs","bender","extensions","imag","api","services","keyboard","IKeyboardMap"];
robotlegs.bender.extensions.imag.impl.commands = {};
robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands = function() {
};
$hxClasses["robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands"] = robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands;
robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands.__name__ = ["robotlegs","bender","extensions","imag","impl","commands","ExecuteImagCommands"];
robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands.__interfaces__ = [robotlegs.bender.framework.api.IConfig];
robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands.prototype = {
	commandMap: null
	,injector: null
	,configModel: null
	,initializeAppSignal: null
	,loadConfigSignal: null
	,configure: function() {
		this.commandMap.map(robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal).toCommand(robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand).once();
		this.commandMap.map(robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal).toCommand(robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand).once();
		this.commandMap.map(robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal).toCommand(robotlegs.bender.extensions.imag.impl.commands.fullscreen.HTMLFullscreenCommand).once();
		this.setupSwfCommands();
		this.initializeAppSignal.dispatch();
		this.injector.map(robotlegs.bender.extensions.imag.ImagModelExtension.ConfigClass).toValue(this.configModel);
		this.commandMap.map(robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal).toCommand(robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand);
		this.loadConfigSignal.dispatch();
	}
	,setupSwfCommands: function() {
	}
	,__class__: robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands
};
robotlegs.bender.extensions.imag.impl.commands.config = {};
robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand = function() {
	this.totalAssets = 0;
	this.loadCount = 0;
	this.xmlLoaderService = new robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoaderService();
	this.xmlToTypedObject = new robotlegs.bender.extensions.imag.impl.utils.parsers.XMLToTypedObject();
};
$hxClasses["robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand"] = robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand;
robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand.__name__ = ["robotlegs","bender","extensions","imag","impl","commands","config","ConfigCommand"];
robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand.__super__ = robotlegs.bender.bundles.mvcs.Command;
robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand.prototype = $extend(robotlegs.bender.bundles.mvcs.Command.prototype,{
	configModel: null
	,appSetupCompleteSignal: null
	,xmlLoaderService: null
	,xmlToTypedObject: null
	,loadCount: null
	,totalAssets: null
	,execute: function() {
		this.load("xml/config.xml");
	}
	,load: function(url) {
		this.totalAssets++;
		this.xmlLoaderService.load(url).onComplete.addOnce($bind(this,this.OnLoadComplete));
	}
	,OnLoadComplete: function(data,id) {
		this.xmlToTypedObject.populate(this.configModel,data);
		this.loadCount++;
		if(this.loadCount == this.totalAssets) this.AllFilesLoaded();
	}
	,AllFilesLoaded: function() {
		this.appSetupCompleteSignal.dispatch();
	}
	,__class__: robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand
});
robotlegs.bender.extensions.imag.impl.commands.fullscreen = {};
robotlegs.bender.extensions.imag.impl.commands.fullscreen.HTMLFullscreenCommand = function() {
};
$hxClasses["robotlegs.bender.extensions.imag.impl.commands.fullscreen.HTMLFullscreenCommand"] = robotlegs.bender.extensions.imag.impl.commands.fullscreen.HTMLFullscreenCommand;
robotlegs.bender.extensions.imag.impl.commands.fullscreen.HTMLFullscreenCommand.__name__ = ["robotlegs","bender","extensions","imag","impl","commands","fullscreen","HTMLFullscreenCommand"];
robotlegs.bender.extensions.imag.impl.commands.fullscreen.HTMLFullscreenCommand.__super__ = robotlegs.bender.bundles.mvcs.Command;
robotlegs.bender.extensions.imag.impl.commands.fullscreen.HTMLFullscreenCommand.prototype = $extend(robotlegs.bender.bundles.mvcs.Command.prototype,{
	contextView: null
	,execute: function() {
		this.toggleFullScreen();
		this.contextView.view.stage.addEventListener(openfl.events.MouseEvent.DOUBLE_CLICK,$bind(this,this.OnDoubleClickFullscreen));
		this.contextView.view.stage.addEventListener("touchEnd",$bind(this,this.OnEndTouchFullscreen));
	}
	,OnEndTouchFullscreen: function(e) {
		this.contextView.view.stage.removeEventListener("touchEnd",$bind(this,this.OnEndTouchFullscreen));
		this.GoFullScreen();
	}
	,OnDoubleClickFullscreen: function(e) {
		this.GoFullScreen();
	}
	,GoFullScreen: function() {
		haxe.Log.trace("GoFullScreen",{ fileName : "HTMLFullscreenCommand.hx", lineNumber : 59, className : "robotlegs.bender.extensions.imag.impl.commands.fullscreen.HTMLFullscreenCommand", methodName : "GoFullScreen"});
		var js = openfl.Assets.getText("js/Fullscreen.js");
		eval(js);
	}
	,toggleFullScreen: function() {
	}
	,__class__: robotlegs.bender.extensions.imag.impl.commands.fullscreen.HTMLFullscreenCommand
});
robotlegs.bender.extensions.imag.impl.commands.stageSetup = {};
robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand = function() {
};
$hxClasses["robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand"] = robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand;
robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand.__name__ = ["robotlegs","bender","extensions","imag","impl","commands","stageSetup","StageSetupCommand"];
robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand.__super__ = robotlegs.bender.bundles.mvcs.Command;
robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand.prototype = $extend(robotlegs.bender.bundles.mvcs.Command.prototype,{
	contextView: null
	,execute: function() {
		var stage = this.contextView.view.stage;
		stage.scaleMode = openfl.display.StageScaleMode.NO_SCALE;
		stage.align = openfl.display.StageAlign.TOP_LEFT;
	}
	,__class__: robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand
});
robotlegs.bender.extensions.imag.impl.commands.viewportResize = {};
robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand = function() {
};
$hxClasses["robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand"] = robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand;
robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand.__name__ = ["robotlegs","bender","extensions","imag","impl","commands","viewportResize","FullStageViewportCommand"];
robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand.__super__ = robotlegs.bender.bundles.mvcs.Command;
robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand.prototype = $extend(robotlegs.bender.bundles.mvcs.Command.prototype,{
	viewport: null
	,contextView: null
	,stage: null
	,resizeCount: null
	,canvas: null
	,div: null
	,execute: function() {
		this.stage = this.contextView.view.stage;
		this.stage.addEventListener(openfl.events.Event.RESIZE,$bind(this,this.OnStageResize));
		window.addEventListener("resize",$bind(this,this.OnWindowResize),false);
		this.stage.addEventListener(openfl.events.Event.ENTER_FRAME,$bind(this,this.JSResizer));
	}
	,OnStageResize: function(e) {
		this.viewport.get_rect().setTo(0,0,this.stage.stageWidth,this.stage.stageHeight);
	}
	,OnWindowResize: function(event) {
		this.UpdateWindowDimensions();
		this.resizeCount = 0;
	}
	,JSResizer: function(e) {
		if(this.resizeCount < 2) this.UpdateWindowDimensions();
		this.resizeCount++;
	}
	,UpdateWindowDimensions: function() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		this.viewport.get_rect().setTo(0,0,width,height);
		var openflContent = window.document.getElementById("openfl-content");
		openflContent.style.width = width + "px";
		openflContent.style.height = height + "px";
		this.div = openflContent.childNodes[0];
		this.div.style.width = width + "px";
		this.div.style.height = height + "px";
		this.canvas = this.div.childNodes[0];
		if(this.canvas != null) {
			this.canvas.width = width;
			this.canvas.height = height;
		}
	}
	,__class__: robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand
});
robotlegs.bender.extensions.imag.impl.model.activity = {};
robotlegs.bender.extensions.imag.impl.model.activity.ActivityModel = function() {
	this.standardFPS = 60;
	this.throttleFPS = 4;
	this.timeout = 2;
	this._throttleFramerate = false;
	this._throttlingActive = false;
	this.InteractionCount = 0;
	this.animationCount = 0;
	this.InteractiveEvents = [openfl.events.MouseEvent.MOUSE_DOWN,openfl.events.MouseEvent.MOUSE_MOVE,openfl.events.MouseEvent.MOUSE_UP,openfl.events.MouseEvent.MOUSE_WHEEL,"touchBegin","touchMove","touchEnd"];
};
$hxClasses["robotlegs.bender.extensions.imag.impl.model.activity.ActivityModel"] = robotlegs.bender.extensions.imag.impl.model.activity.ActivityModel;
robotlegs.bender.extensions.imag.impl.model.activity.ActivityModel.__name__ = ["robotlegs","bender","extensions","imag","impl","model","activity","ActivityModel"];
robotlegs.bender.extensions.imag.impl.model.activity.ActivityModel.prototype = {
	contextView: null
	,animationCount: null
	,InteractionCount: null
	,_throttlingActive: null
	,_throttleFramerate: null
	,timeout: null
	,throttleFPS: null
	,standardFPS: null
	,InteractiveEvents: null
	,animating: function() {
		this.animationCount = 0;
	}
	,Interacting: function() {
		this.InteractionCount = 0;
	}
	,get_throttlingActive: function() {
		return this._throttlingActive;
	}
	,set_throttlingActive: function(value) {
		if(this._throttlingActive == value) return value;
		this._throttlingActive = value;
		if(this.get_throttlingActive()) {
			this.contextView.view.stage.addEventListener(openfl.events.Event.ENTER_FRAME,$bind(this,this.Update));
			var _g1 = 0;
			var _g = this.InteractiveEvents.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.contextView.view.stage.addEventListener(this.InteractiveEvents[i],$bind(this,this.OnInteraction));
			}
		} else {
			this.contextView.view.stage.removeEventListener(openfl.events.Event.ENTER_FRAME,$bind(this,this.Update));
			var _g11 = 0;
			var _g2 = this.InteractiveEvents.length;
			while(_g11 < _g2) {
				var j = _g11++;
				this.contextView.view.stage.removeEventListener(this.InteractiveEvents[j],$bind(this,this.OnInteraction));
			}
		}
		return this._throttlingActive;
	}
	,get_throttleFramerate: function() {
		return this._throttleFramerate;
	}
	,set_throttleFramerate: function(value) {
		if(this._throttleFramerate == value) return value;
		this._throttleFramerate = value;
		if(this.get_throttleFramerate()) this.contextView.view.stage.frameRate = this.throttleFPS; else this.contextView.view.stage.frameRate = this.standardFPS;
		return this._throttleFramerate;
	}
	,OnInteraction: function(e) {
		this.InteractionCount = 0;
	}
	,Update: function(e) {
		this.animationCount++;
		this.InteractionCount++;
		if(this.animationCount < this.timeout * this.standardFPS || this.InteractionCount < this.timeout * this.standardFPS) this.set_throttleFramerate(false); else this.set_throttleFramerate(true);
	}
	,__class__: robotlegs.bender.extensions.imag.impl.model.activity.ActivityModel
	,__properties__: {set_throttleFramerate:"set_throttleFramerate",get_throttleFramerate:"get_throttleFramerate",set_throttlingActive:"set_throttlingActive",get_throttlingActive:"get_throttlingActive"}
};
robotlegs.bender.extensions.imag.impl.services = {};
robotlegs.bender.extensions.imag.impl.services.keyboard = {};
robotlegs.bender.extensions.imag.impl.services.keyboard.BoolMap = function(keyboardMap) {
	this.keyboardMap = keyboardMap;
};
$hxClasses["robotlegs.bender.extensions.imag.impl.services.keyboard.BoolMap"] = robotlegs.bender.extensions.imag.impl.services.keyboard.BoolMap;
robotlegs.bender.extensions.imag.impl.services.keyboard.BoolMap.__name__ = ["robotlegs","bender","extensions","imag","impl","services","keyboard","BoolMap"];
robotlegs.bender.extensions.imag.impl.services.keyboard.BoolMap.prototype = {
	keyboardMap: null
	,property: null
	,object: null
	,map: function(object,property,charOrKeycode,options) {
		this.object = object;
		this.property = property;
		var pressOptions = { };
		var releaseOptions = { };
		if(options != null) {
			var fields = Reflect.fields(options);
			var _g = 0;
			while(_g < fields.length) {
				var prop = fields[_g];
				++_g;
				Reflect.setProperty(pressOptions,prop,Reflect.getProperty(options,prop));
				Reflect.setProperty(releaseOptions,prop,Reflect.getProperty(options,prop));
			}
		}
		Reflect.setProperty(pressOptions,"action",robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap.ACTION_DOWN);
		Reflect.setProperty(releaseOptions,"action",robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap.ACTION_UP);
		this.keyboardMap.map($bind(this,this.OnPress),charOrKeycode,pressOptions);
		this.keyboardMap.map($bind(this,this.OnRelease),charOrKeycode,releaseOptions);
	}
	,OnPress: function() {
		Reflect.setProperty(this.object,this.property,true);
	}
	,OnRelease: function() {
		Reflect.setProperty(this.object,this.property,false);
	}
	,__class__: robotlegs.bender.extensions.imag.impl.services.keyboard.BoolMap
};
robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap = function() {
	this.intBooleanMaps = new haxe.ds.IntMap();
	this.strBooleanMaps = new haxe.ds.StringMap();
	this._traceKeyIDs = false;
	this.initiated = false;
	openfl.events.EventDispatcher.call(this);
};
$hxClasses["robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap"] = robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap;
robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap.__name__ = ["robotlegs","bender","extensions","imag","impl","services","keyboard","KeyboardMap"];
robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap.__interfaces__ = [robotlegs.bender.extensions.imag.api.services.keyboard.IKeyboardMap];
robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap.__super__ = openfl.events.EventDispatcher;
robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	contextView: null
	,initiated: null
	,_keyLookup: null
	,_charLookup: null
	,_shortcuts: null
	,_traceKeyIDs: null
	,strBooleanMaps: null
	,intBooleanMaps: null
	,init: function() {
		if(this.initiated) return;
		this.initiated = true;
		this._shortcuts = new Array();
		this._keyLookup = new haxe.ds.IntMap();
		this._charLookup = new haxe.ds.StringMap();
		this.contextView.view.stage.addEventListener(openfl.events.KeyboardEvent.KEY_DOWN,$bind(this,this.OnKeyDown));
		this.contextView.view.stage.addEventListener(openfl.events.KeyboardEvent.KEY_UP,$bind(this,this.OnKeyUp));
	}
	,OnKeyDown: function(e) {
		this.dispatchEvent(e);
		if(this.get_traceKeyIDs()) haxe.Log.trace("[KeyboardMap] Down: " + e.keyCode,{ fileName : "KeyboardMap.hx", lineNumber : 55, className : "robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap", methodName : "OnKeyDown", customParams : [String.fromCharCode(e.charCode).toLowerCase()]});
		this.executeList(this._keyLookup.get(e.keyCode),e);
		this.executeList((function($this) {
			var $r;
			var key = String.fromCharCode(e.charCode).toLowerCase();
			$r = $this._charLookup.get(key);
			return $r;
		}(this)),e);
	}
	,OnKeyUp: function(e) {
		this.dispatchEvent(e);
		if(this.get_traceKeyIDs()) haxe.Log.trace("[KeyboardMap] Up: " + e.keyCode,{ fileName : "KeyboardMap.hx", lineNumber : 64, className : "robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap", methodName : "OnKeyUp", customParams : [String.fromCharCode(e.charCode).toLowerCase()]});
		this.executeList(this._keyLookup.get(e.keyCode),e);
		this.executeList((function($this) {
			var $r;
			var key = String.fromCharCode(e.charCode).toLowerCase();
			$r = $this._charLookup.get(key);
			return $r;
		}(this)),e);
	}
	,map: function(callback,charOrKeycode,options) {
		this.init();
		if(typeof(charOrKeycode) == "string") {
			if((js.Boot.__cast(charOrKeycode , String)).length == 1) this.addCharShortcut(callback,js.Boot.__cast(charOrKeycode , String),options); else {
				var keyboardWord = new robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardWord(this,callback,js.Boot.__cast(charOrKeycode , String),options);
			}
		} else if(((charOrKeycode | 0) === charOrKeycode)) this.addKeyShortcut(callback,js.Boot.__cast(charOrKeycode , Int),options); else throw new openfl.errors.Error("unknown charOrKeycode type, should be String or Int");
	}
	,mapBool: function(object,property,charOrKeycode,options) {
		if(typeof(charOrKeycode) == "string") this.booleanMapStr(charOrKeycode).map(object,property,charOrKeycode,options); else if(((charOrKeycode | 0) === charOrKeycode)) this.booleanMapInt(charOrKeycode).map(object,property,charOrKeycode,options);
	}
	,booleanMapStr: function(charOrKeycode) {
		if(this.strBooleanMaps.get(charOrKeycode) == null) {
			var v = new robotlegs.bender.extensions.imag.impl.services.keyboard.BoolMap(this);
			this.strBooleanMaps.set(charOrKeycode,v);
			v;
		}
		return this.strBooleanMaps.get(charOrKeycode);
	}
	,booleanMapInt: function(charOrKeycode) {
		if(this.intBooleanMaps.get(charOrKeycode) == null) {
			var v = new robotlegs.bender.extensions.imag.impl.services.keyboard.BoolMap(this);
			this.intBooleanMaps.set(charOrKeycode,v);
			v;
		}
		return this.intBooleanMaps.get(charOrKeycode);
	}
	,addCharShortcut: function(callback,$char,options) {
		this.addShortcut(callback,[$char],[],String,options);
	}
	,addKeyShortcut: function(callback,key,options) {
		this.addShortcut(callback,[],[key],Int,options);
	}
	,addShortcut: function(callback,chars,keys,type,options) {
		var ctrl = false;
		var alt = false;
		var shift = false;
		var action = robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap.ACTION_UP;
		var params = null;
		if(options != null) {
			if(org.swiftsuspenders.utils.CallProxy.hasField(options,"ctrl")) ctrl = Reflect.getProperty(options,"ctrl");
			if(org.swiftsuspenders.utils.CallProxy.hasField(options,"alt")) alt = Reflect.getProperty(options,"alt");
			if(org.swiftsuspenders.utils.CallProxy.hasField(options,"shift")) shift = Reflect.getProperty(options,"shift");
			if(org.swiftsuspenders.utils.CallProxy.hasField(options,"action")) action = Reflect.getProperty(options,"action");
			if(org.swiftsuspenders.utils.CallProxy.hasField(options,"params")) params = Reflect.getProperty(options,"params");
		}
		var shortcut = new robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut(callback,chars,keys,type,ctrl,alt,shift,action,params);
		var _g = 0;
		while(_g < chars.length) {
			var $char = chars[_g];
			++_g;
			var v = this.addToList(this._charLookup,$char,shortcut);
			this._charLookup.set($char,v);
			v;
		}
		var _g1 = 0;
		while(_g1 < keys.length) {
			var key = keys[_g1];
			++_g1;
			var v1 = this.addToList(this._keyLookup,key,shortcut);
			this._keyLookup.set(key,v1);
			v1;
		}
	}
	,executeList: function(shortcuts,e) {
		if(shortcuts == null) return;
		var _g = 0;
		while(_g < shortcuts.length) {
			var shortcut = shortcuts[_g];
			++_g;
			if(shortcut.ctrl == e.ctrlKey && shortcut.shift == e.shiftKey && shortcut.alt == e.altKey && shortcut.action == e.type) {
				if(shortcut.params != null) shortcut.callback(shortcut.params); else shortcut.callback();
			}
		}
	}
	,addToList: function(lookup,key,shortcut) {
		var list = null;
		if(typeof(key) == "string") {
			var _lookupStr = lookup;
			if(_lookupStr != null) {
				var key1 = key;
				list = _lookupStr.get(key1);
			}
		} else if(((key | 0) === key)) {
			var _lookupInt = lookup;
			if(_lookupInt != null) {
				var key2 = key;
				list = _lookupInt.get(key2);
			}
		}
		if(list == null) list = new Array();
		list.push(shortcut);
		return list;
	}
	,get_traceKeyIDs: function() {
		return this._traceKeyIDs;
	}
	,set_traceKeyIDs: function(value) {
		this._traceKeyIDs = value;
		return value;
	}
	,__class__: robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap
	,__properties__: {set_traceKeyIDs:"set_traceKeyIDs",get_traceKeyIDs:"get_traceKeyIDs"}
});
robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut = function(callback,chars,keys,type,ctrl,alt,shift,action,params) {
	this.callback = callback;
	this.chars = chars;
	this.keys = keys;
	this.type = type;
	this.ctrl = ctrl;
	this.alt = alt;
	this.shift = shift;
	this.action = action;
	this.params = params;
};
$hxClasses["robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut"] = robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut;
robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut.__name__ = ["robotlegs","bender","extensions","imag","impl","services","keyboard","Shortcut"];
robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut.prototype = {
	type: null
	,callback: null
	,ctrl: null
	,shift: null
	,alt: null
	,action: null
	,params: null
	,chars: null
	,keys: null
	,__class__: robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut
};
robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardWord = function(keyboardMap,callback,charOrKeycode,options) {
	this.count = 0;
	if(options != null) this.params = Reflect.getProperty(options,"params"); else options = { };
	this.callback = callback;
	this.split = charOrKeycode.split("");
	var _g1 = 0;
	var _g = this.split.length;
	while(_g1 < _g) {
		var i = _g1++;
		Reflect.setProperty(options,"params",[i]);
		keyboardMap.map($bind(this,this.CountFunction),this.split[i],options);
	}
	keyboardMap.addEventListener(openfl.events.KeyboardEvent.KEY_UP,$bind(this,this.OnKeyUp));
};
$hxClasses["robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardWord"] = robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardWord;
robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardWord.__name__ = ["robotlegs","bender","extensions","imag","impl","services","keyboard","KeyboardWord"];
robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardWord.prototype = {
	count: null
	,split: null
	,callback: null
	,params: null
	,OnKeyUp: function(e) {
		var character = String.fromCharCode(e.charCode);
		var _g1 = 0;
		var _g = this.split.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.split[i] == character) return;
		}
		this.count = 0;
	}
	,CountFunction: function(index) {
		if(this.count == index) {
			this.count++;
			if(this.count == this.split.length) {
				this.count = 0;
				if(this.params != null) this.callback(this.params); else this.callback();
			}
		}
	}
	,__class__: robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardWord
};
robotlegs.bender.extensions.imag.impl.signals = {};
robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal = function() {
	msignal.Signal0.call(this);
};
$hxClasses["robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal"] = robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal;
robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal.__name__ = ["robotlegs","bender","extensions","imag","impl","signals","AppSetupCompleteSignal"];
robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal.__super__ = msignal.Signal0;
robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal.prototype = $extend(msignal.Signal0.prototype,{
	__class__: robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal
});
robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal = function() {
	msignal.Signal0.call(this);
};
$hxClasses["robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal"] = robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal;
robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal.__name__ = ["robotlegs","bender","extensions","imag","impl","signals","InitializeAppSignal"];
robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal.__super__ = msignal.Signal0;
robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal.prototype = $extend(msignal.Signal0.prototype,{
	__class__: robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal
});
robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal = function() {
	msignal.Signal0.call(this);
};
$hxClasses["robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal"] = robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal;
robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal.__name__ = ["robotlegs","bender","extensions","imag","impl","signals","LoadConfigSignal"];
robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal.__super__ = msignal.Signal0;
robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal.prototype = $extend(msignal.Signal0.prototype,{
	__class__: robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal
});
robotlegs.bender.extensions.imag.impl.utils = {};
robotlegs.bender.extensions.imag.impl.utils.loaders = {};
robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoaderService = function() {
};
$hxClasses["robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoaderService"] = robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoaderService;
robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoaderService.__name__ = ["robotlegs","bender","extensions","imag","impl","utils","loaders","XMLLoaderService"];
robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoaderService.prototype = {
	load: function(url) {
		var xmlLoader = new robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoader();
		xmlLoader.load(url);
		return xmlLoader;
	}
	,__class__: robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoaderService
};
robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoader = function() {
	this.onComplete = new msignal.Signal2(Xml,String);
	this.available = true;
};
$hxClasses["robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoader"] = robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoader;
robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoader.__name__ = ["robotlegs","bender","extensions","imag","impl","utils","loaders","XMLLoader"];
robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoader.prototype = {
	available: null
	,url: null
	,request: null
	,loader: null
	,onComplete: null
	,load: function(url) {
		this.url = url;
		if(this.loader == null) {
			this.loader = new openfl.net.URLLoader();
			this.loader.addEventListener(openfl.events.Event.COMPLETE,$bind(this,this.OnLoadComplete));
			this.loader.addEventListener(openfl.events.ErrorEvent.ERROR,$bind(this,this.OnError));
			this.loader.addEventListener(openfl.events.IOErrorEvent.IO_ERROR,$bind(this,this.OnError));
		}
		this.available = false;
		this.request = new openfl.net.URLRequest(url);
		this.loader.load(this.request);
	}
	,OnLoadComplete: function(e) {
		this.available = true;
		this.onComplete.dispatch(Xml.parse(this.loader.data),this.url);
		this.dispose();
	}
	,OnError: function(e) {
		haxe.Log.trace("Load Error: " + Std.string(e),{ fileName : "XMLLoaderService.hx", lineNumber : 74, className : "robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoader", methodName : "OnError"});
		this.available = true;
		this.onComplete.dispatch(null,this.url);
	}
	,dispose: function() {
		this.loader.removeEventListener(openfl.events.Event.COMPLETE,$bind(this,this.OnLoadComplete));
		this.loader.removeEventListener(openfl.events.ErrorEvent.ERROR,$bind(this,this.OnError));
		this.loader = null;
		this.request = null;
		this.onComplete = null;
	}
	,__class__: robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoader
};
robotlegs.bender.extensions.imag.impl.utils.parsers = {};
robotlegs.bender.extensions.imag.impl.utils.parsers.XMLToTypedObject = function() {
};
$hxClasses["robotlegs.bender.extensions.imag.impl.utils.parsers.XMLToTypedObject"] = robotlegs.bender.extensions.imag.impl.utils.parsers.XMLToTypedObject;
robotlegs.bender.extensions.imag.impl.utils.parsers.XMLToTypedObject.__name__ = ["robotlegs","bender","extensions","imag","impl","utils","parsers","XMLToTypedObject"];
robotlegs.bender.extensions.imag.impl.utils.parsers.XMLToTypedObject.prototype = {
	typedObject: null
	,xml: null
	,setObject: null
	,StaticRef: null
	,populate: function(typedObject,xml) {
		this.xml = xml;
		this.typedObject = typedObject;
		this.StaticRef = Type.getClass(typedObject);
		var classFields = Type.getClassFields(this.StaticRef);
		var $it0 = xml.elementsNamed("data");
		while( $it0.hasNext() ) {
			var data = $it0.next();
			var $it1 = data.elements();
			while( $it1.hasNext() ) {
				var element = $it1.next();
				if(org.swiftsuspenders.utils.CallProxy.hasField(typedObject,element.get_nodeName())) Reflect.setProperty(typedObject,element.get_nodeName(),element.firstChild());
				var _g1 = 0;
				var _g = classFields.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(classFields[i] == element.get_nodeName()) Reflect.setProperty(this.StaticRef,element.get_nodeName(),element.firstChild());
				}
			}
		}
	}
	,parseVars: function(typedObjectXML) {
	}
	,setVars: function(type,property,value) {
	}
	,setFrom: function(property,xml) {
		return "";
	}
	,__class__: robotlegs.bender.extensions.imag.impl.utils.parsers.XMLToTypedObject
};
robotlegs.bender.extensions.localEventMap = {};
robotlegs.bender.extensions.localEventMap.LocalEventMapExtension = function() { };
$hxClasses["robotlegs.bender.extensions.localEventMap.LocalEventMapExtension"] = robotlegs.bender.extensions.localEventMap.LocalEventMapExtension;
robotlegs.bender.extensions.localEventMap.LocalEventMapExtension.__name__ = ["robotlegs","bender","extensions","localEventMap","LocalEventMapExtension"];
robotlegs.bender.extensions.localEventMap.LocalEventMapExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.localEventMap.LocalEventMapExtension.prototype = {
	extend: function(context) {
		context.get_injector().map(robotlegs.bender.extensions.localEventMap.api.IEventMap).toType(robotlegs.bender.extensions.localEventMap.impl.EventMap);
	}
	,__class__: robotlegs.bender.extensions.localEventMap.LocalEventMapExtension
};
robotlegs.bender.extensions.localEventMap.api = {};
robotlegs.bender.extensions.localEventMap.api.IEventMap = function() { };
$hxClasses["robotlegs.bender.extensions.localEventMap.api.IEventMap"] = robotlegs.bender.extensions.localEventMap.api.IEventMap;
robotlegs.bender.extensions.localEventMap.api.IEventMap.__name__ = ["robotlegs","bender","extensions","localEventMap","api","IEventMap"];
robotlegs.bender.extensions.localEventMap.api.IEventMap.prototype = {
	mapListener: null
	,unmapListener: null
	,unmapListeners: null
	,__class__: robotlegs.bender.extensions.localEventMap.api.IEventMap
};
robotlegs.bender.extensions.localEventMap.impl = {};
robotlegs.bender.extensions.localEventMap.impl.EventMap = function() {
	this._suspended = false;
	this._suspendedListeners = new Array();
	this._listeners = new Array();
};
$hxClasses["robotlegs.bender.extensions.localEventMap.impl.EventMap"] = robotlegs.bender.extensions.localEventMap.impl.EventMap;
robotlegs.bender.extensions.localEventMap.impl.EventMap.__name__ = ["robotlegs","bender","extensions","localEventMap","impl","EventMap"];
robotlegs.bender.extensions.localEventMap.impl.EventMap.__interfaces__ = [robotlegs.bender.extensions.localEventMap.api.IEventMap];
robotlegs.bender.extensions.localEventMap.impl.EventMap.prototype = {
	_listeners: null
	,_suspendedListeners: null
	,_suspended: null
	,mapListener: function(dispatcher,eventString,listener,eventClass,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = true;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		var _g = this;
		if(eventClass == null) eventClass = openfl.events.Event;
		var currentListeners;
		if(this._suspended) currentListeners = this._suspendedListeners; else currentListeners = this._listeners;
		var config;
		var i = currentListeners.length;
		while(i-- > 0) {
			config = currentListeners[i];
			if(config.equalTo(dispatcher,eventString,listener,eventClass,useCapture)) return;
		}
		var callback;
		if(eventClass == openfl.events.Event) callback = listener; else callback = function(event) {
			_g.routeEventToListener(event,listener,eventClass);
		};
		config = new robotlegs.bender.extensions.localEventMap.impl.EventMapConfig(dispatcher,eventString,listener,eventClass,callback,useCapture);
		currentListeners.push(config);
		if(!this._suspended) dispatcher.addEventListener(eventString,callback,useCapture,priority,useWeakReference);
	}
	,unmapListener: function(dispatcher,eventString,listener,eventClass,useCapture) {
		if(useCapture == null) useCapture = false;
		if(eventClass == null) eventClass = openfl.events.Event;
		var currentListeners;
		if(this._suspended) currentListeners = this._suspendedListeners; else currentListeners = this._listeners;
		var i = currentListeners.length;
		while(i-- > 0) {
			var config = currentListeners[i];
			if(config.equalTo(dispatcher,eventString,listener,eventClass,useCapture)) {
				if(!this._suspended) dispatcher.removeEventListener(eventString,config.callback,useCapture);
				currentListeners.splice(i,1);
				return;
			}
		}
	}
	,unmapListeners: function() {
		var currentListeners;
		if(this._suspended) currentListeners = this._suspendedListeners; else currentListeners = this._listeners;
		var eventConfig;
		var dispatcher;
		while((eventConfig = currentListeners.pop()) != null) if(!this._suspended) {
			dispatcher = eventConfig.dispatcher;
			dispatcher.removeEventListener(eventConfig.eventString,eventConfig.callback,eventConfig.useCapture);
		}
	}
	,suspend: function() {
		if(this._suspended) return;
		this._suspended = true;
		var eventConfig;
		var dispatcher;
		while((eventConfig = this._listeners.pop()) != null) {
			dispatcher = eventConfig.dispatcher;
			dispatcher.removeEventListener(eventConfig.eventString,eventConfig.callback,eventConfig.useCapture);
			this._suspendedListeners.push(eventConfig);
		}
	}
	,resume: function() {
		if(!this._suspended) return;
		this._suspended = false;
		var eventConfig;
		var dispatcher;
		while((eventConfig = this._suspendedListeners.pop()) != null) {
			dispatcher = eventConfig.dispatcher;
			dispatcher.addEventListener(eventConfig.eventString,eventConfig.callback,eventConfig.useCapture);
			this._listeners.push(eventConfig);
		}
	}
	,routeEventToListener: function(event,listener,originalEventClass) {
		if(js.Boot.__instanceof(event,originalEventClass)) listener(event);
	}
	,__class__: robotlegs.bender.extensions.localEventMap.impl.EventMap
};
robotlegs.bender.extensions.localEventMap.impl.EventMapConfig = function(dispatcher,eventString,listener,eventClass,callback,useCapture) {
	this._useCapture = false;
	this._dispatcher = dispatcher;
	this._eventString = eventString;
	this._listener = listener;
	this._eventClass = eventClass;
	this._callback = callback;
	this._useCapture = useCapture;
};
$hxClasses["robotlegs.bender.extensions.localEventMap.impl.EventMapConfig"] = robotlegs.bender.extensions.localEventMap.impl.EventMapConfig;
robotlegs.bender.extensions.localEventMap.impl.EventMapConfig.__name__ = ["robotlegs","bender","extensions","localEventMap","impl","EventMapConfig"];
robotlegs.bender.extensions.localEventMap.impl.EventMapConfig.prototype = {
	_dispatcher: null
	,dispatcher: null
	,_eventString: null
	,eventString: null
	,_listener: null
	,listener: null
	,_eventClass: null
	,eventClass: null
	,_callback: null
	,callback: null
	,_useCapture: null
	,useCapture: null
	,equalTo: function(dispatcher,eventString,listener,eventClass,useCapture) {
		return this._eventString == eventString && this._eventClass == eventClass && this._dispatcher == dispatcher && this._listener == listener && this._useCapture == useCapture;
	}
	,__class__: robotlegs.bender.extensions.localEventMap.impl.EventMapConfig
};
robotlegs.bender.framework.api.IMatcher = function() { };
$hxClasses["robotlegs.bender.framework.api.IMatcher"] = robotlegs.bender.framework.api.IMatcher;
robotlegs.bender.framework.api.IMatcher.__name__ = ["robotlegs","bender","framework","api","IMatcher"];
robotlegs.bender.framework.api.IMatcher.prototype = {
	matches: null
	,__class__: robotlegs.bender.framework.api.IMatcher
};
robotlegs.bender.extensions.matching = {};
robotlegs.bender.extensions.matching.ITypeFilter = function() { };
$hxClasses["robotlegs.bender.extensions.matching.ITypeFilter"] = robotlegs.bender.extensions.matching.ITypeFilter;
robotlegs.bender.extensions.matching.ITypeFilter.__name__ = ["robotlegs","bender","extensions","matching","ITypeFilter"];
robotlegs.bender.extensions.matching.ITypeFilter.__interfaces__ = [robotlegs.bender.framework.api.IMatcher];
robotlegs.bender.extensions.matching.ITypeFilter.prototype = {
	allOfTypes: null
	,anyOfTypes: null
	,descriptor: null
	,__class__: robotlegs.bender.extensions.matching.ITypeFilter
};
robotlegs.bender.extensions.matching.ITypeMatcher = function() { };
$hxClasses["robotlegs.bender.extensions.matching.ITypeMatcher"] = robotlegs.bender.extensions.matching.ITypeMatcher;
robotlegs.bender.extensions.matching.ITypeMatcher.__name__ = ["robotlegs","bender","extensions","matching","ITypeMatcher"];
robotlegs.bender.extensions.matching.ITypeMatcher.prototype = {
	createTypeFilter: null
	,__class__: robotlegs.bender.extensions.matching.ITypeMatcher
};
robotlegs.bender.extensions.matching.ITypeMatcherFactory = function() { };
$hxClasses["robotlegs.bender.extensions.matching.ITypeMatcherFactory"] = robotlegs.bender.extensions.matching.ITypeMatcherFactory;
robotlegs.bender.extensions.matching.ITypeMatcherFactory.__name__ = ["robotlegs","bender","extensions","matching","ITypeMatcherFactory"];
robotlegs.bender.extensions.matching.ITypeMatcherFactory.__interfaces__ = [robotlegs.bender.extensions.matching.ITypeMatcher];
robotlegs.bender.extensions.matching.InstanceOfType = function() { };
$hxClasses["robotlegs.bender.extensions.matching.InstanceOfType"] = robotlegs.bender.extensions.matching.InstanceOfType;
robotlegs.bender.extensions.matching.InstanceOfType.__name__ = ["robotlegs","bender","extensions","matching","InstanceOfType"];
robotlegs.bender.extensions.matching.InstanceOfType.call = function(type) {
	return new robotlegs.bender.extensions.matching.InstanceOfMatcher(type);
};
robotlegs.bender.extensions.matching.InstanceOfMatcher = function(type) {
	this._type = type;
};
$hxClasses["robotlegs.bender.extensions.matching.InstanceOfMatcher"] = robotlegs.bender.extensions.matching.InstanceOfMatcher;
robotlegs.bender.extensions.matching.InstanceOfMatcher.__name__ = ["robotlegs","bender","extensions","matching","InstanceOfMatcher"];
robotlegs.bender.extensions.matching.InstanceOfMatcher.__interfaces__ = [robotlegs.bender.framework.api.IMatcher];
robotlegs.bender.extensions.matching.InstanceOfMatcher.prototype = {
	_type: null
	,matches: function(item) {
		return js.Boot.__instanceof(item,this._type);
	}
	,__class__: robotlegs.bender.extensions.matching.InstanceOfMatcher
};
robotlegs.bender.extensions.matching.TypeFilter = function(allOf,anyOf,noneOf) {
	if(allOf == null || anyOf == null || noneOf == null) throw new openfl.errors.ArgumentError("TypeFilter parameters can not be null");
	this.allOfTypes = allOf;
	this.anyOfTypes = anyOf;
	this.noneOfTypes = noneOf;
};
$hxClasses["robotlegs.bender.extensions.matching.TypeFilter"] = robotlegs.bender.extensions.matching.TypeFilter;
robotlegs.bender.extensions.matching.TypeFilter.__name__ = ["robotlegs","bender","extensions","matching","TypeFilter"];
robotlegs.bender.extensions.matching.TypeFilter.__interfaces__ = [robotlegs.bender.extensions.matching.ITypeFilter];
robotlegs.bender.extensions.matching.TypeFilter.prototype = {
	allOfTypes: null
	,get_allOfTypes: function() {
		return this.allOfTypes;
	}
	,anyOfTypes: null
	,get_anyOfTypes: function() {
		return this.anyOfTypes;
	}
	,noneOfTypes: null
	,get_noneOfTypes: function() {
		return this.noneOfTypes;
	}
	,descriptor: null
	,get_descriptor: function() {
		if(this.descriptor == null) this.descriptor = this.createDescriptor();
		return this.descriptor;
	}
	,matches: function(item) {
		var i = this.get_allOfTypes().length;
		while((function($this) {
			var $r;
			var a = i--;
			var aNeg = a < 0;
			var bNeg = 0 < 0;
			$r = aNeg != bNeg?aNeg:a > 0;
			return $r;
		}(this))) if(!Std["is"](item,this.get_allOfTypes()[i])) return false;
		i = this.get_noneOfTypes().length;
		while((function($this) {
			var $r;
			var a1 = i--;
			var aNeg1 = a1 < 0;
			var bNeg1 = 0 < 0;
			$r = aNeg1 != bNeg1?aNeg1:a1 > 0;
			return $r;
		}(this))) if(Std["is"](item,this.get_noneOfTypes()[i])) return false;
		if(this.get_anyOfTypes().length == 0 && (this.get_allOfTypes().length > 0 || this.get_noneOfTypes().length > 0)) return true;
		i = this.get_anyOfTypes().length;
		while((function($this) {
			var $r;
			var a2 = i--;
			var aNeg2 = a2 < 0;
			var bNeg2 = 0 < 0;
			$r = aNeg2 != bNeg2?aNeg2:a2 > 0;
			return $r;
		}(this))) if(Std["is"](item,this.get_anyOfTypes()[i])) return true;
		return false;
	}
	,alphabetiseCaseInsensitiveFCQNs: function(classVector) {
		var fqcn;
		var allFCQNs = new Array();
		var iLength = classVector.length;
		var _g = 0;
		while(_g < iLength) {
			var i = _g++;
			fqcn = org.swiftsuspenders.utils.CallProxy.replaceClassName(classVector[i]);
			allFCQNs[allFCQNs.length] = fqcn;
		}
		allFCQNs.sort($bind(this,this.stringSort));
		return allFCQNs;
	}
	,createDescriptor: function() {
		var allOf_FCQNs = this.alphabetiseCaseInsensitiveFCQNs(this.get_allOfTypes());
		var anyOf_FCQNs = this.alphabetiseCaseInsensitiveFCQNs(this.get_anyOfTypes());
		var noneOf_FQCNs = this.alphabetiseCaseInsensitiveFCQNs(this.get_noneOfTypes());
		return "all of: " + allOf_FCQNs.toString() + ", any of: " + anyOf_FCQNs.toString() + ", none of: " + noneOf_FQCNs.toString();
	}
	,stringSort: function(item1,item2) {
		if(item1 < item2) return 1;
		return -1;
	}
	,__class__: robotlegs.bender.extensions.matching.TypeFilter
	,__properties__: {get_descriptor:"get_descriptor",get_noneOfTypes:"get_noneOfTypes",get_anyOfTypes:"get_anyOfTypes",get_allOfTypes:"get_allOfTypes"}
};
robotlegs.bender.extensions.matching.TypeMatcher = function() {
	this._noneOfTypes = new Array();
	this._anyOfTypes = new Array();
	this._allOfTypes = new Array();
};
$hxClasses["robotlegs.bender.extensions.matching.TypeMatcher"] = robotlegs.bender.extensions.matching.TypeMatcher;
robotlegs.bender.extensions.matching.TypeMatcher.__name__ = ["robotlegs","bender","extensions","matching","TypeMatcher"];
robotlegs.bender.extensions.matching.TypeMatcher.__interfaces__ = [robotlegs.bender.extensions.matching.ITypeMatcherFactory,robotlegs.bender.extensions.matching.ITypeMatcher];
robotlegs.bender.extensions.matching.TypeMatcher.prototype = {
	_allOfTypes: null
	,_anyOfTypes: null
	,_noneOfTypes: null
	,_typeFilter: null
	,allOf: function(types) {
		this.pushAddedTypesTo(types,this._allOfTypes);
		return this;
	}
	,anyOf: function(types) {
		this.pushAddedTypesTo(types,this._anyOfTypes);
		return this;
	}
	,noneOf: function(types) {
		this.pushAddedTypesTo(types,this._noneOfTypes);
		return this;
	}
	,createTypeFilter: function() {
		if(this._typeFilter == null) this._typeFilter = this.buildTypeFilter();
		return this._typeFilter;
	}
	,lock: function() {
		this.createTypeFilter();
		return this;
	}
	,clone: function() {
		return new robotlegs.bender.extensions.matching.TypeMatcher().allOf(this._allOfTypes).anyOf(this._anyOfTypes).noneOf(this._noneOfTypes);
	}
	,buildTypeFilter: function() {
		if(this._allOfTypes.length == 0 && this._anyOfTypes.length == 0 && this._noneOfTypes.length == 0) throw new robotlegs.bender.extensions.matching.TypeMatcherError(robotlegs.bender.extensions.matching.TypeMatcherError.EMPTY_MATCHER);
		return new robotlegs.bender.extensions.matching.TypeFilter(this._allOfTypes,this._anyOfTypes,this._noneOfTypes);
	}
	,pushAddedTypesTo: function(types,targetSet) {
		if(this._typeFilter != null) this.throwSealedMatcherError();
		this.pushValuesToClassVector(types,targetSet);
	}
	,throwSealedMatcherError: function() {
		throw new robotlegs.bender.extensions.matching.TypeMatcherError(robotlegs.bender.extensions.matching.TypeMatcherError.SEALED_MATCHER);
	}
	,pushValuesToClassVector: function(values,vector) {
		var isArray = (values[0] instanceof Array) && values[0].__enum__ == null;
		if(values.length == 1 && isArray) {
			var array;
			array = js.Boot.__cast(values[0] , Array);
			var _g = 0;
			while(_g < array.length) {
				var type = array[_g];
				++_g;
				vector.push(type);
			}
		} else {
			var _g1 = 0;
			while(_g1 < values.length) {
				var type1 = values[_g1];
				++_g1;
				vector.push(type1);
			}
		}
	}
	,__class__: robotlegs.bender.extensions.matching.TypeMatcher
};
robotlegs.bender.extensions.matching.TypeMatcherError = function(message) {
	openfl.errors.Error.call(this,message);
};
$hxClasses["robotlegs.bender.extensions.matching.TypeMatcherError"] = robotlegs.bender.extensions.matching.TypeMatcherError;
robotlegs.bender.extensions.matching.TypeMatcherError.__name__ = ["robotlegs","bender","extensions","matching","TypeMatcherError"];
robotlegs.bender.extensions.matching.TypeMatcherError.__super__ = openfl.errors.Error;
robotlegs.bender.extensions.matching.TypeMatcherError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: robotlegs.bender.extensions.matching.TypeMatcherError
});
robotlegs.bender.extensions.mediatorMap.MediatorMapExtension = function() { };
$hxClasses["robotlegs.bender.extensions.mediatorMap.MediatorMapExtension"] = robotlegs.bender.extensions.mediatorMap.MediatorMapExtension;
robotlegs.bender.extensions.mediatorMap.MediatorMapExtension.__name__ = ["robotlegs","bender","extensions","mediatorMap","MediatorMapExtension"];
robotlegs.bender.extensions.mediatorMap.MediatorMapExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.mediatorMap.MediatorMapExtension.prototype = {
	_injector: null
	,_mediatorMap: null
	,_viewManager: null
	,extend: function(context) {
		context.beforeInitializing($bind(this,this.beforeInitializing)).beforeDestroying($bind(this,this.beforeDestroying)).whenDestroying($bind(this,this.whenDestroying));
		this._injector = context.get_injector();
		this._injector.map(robotlegs.bender.extensions.mediatorMap.api.IMediatorMap).toSingleton(robotlegs.bender.extensions.mediatorMap.impl.MediatorMap);
	}
	,beforeInitializing: function() {
		this._mediatorMap = this._injector.getInstance(robotlegs.bender.extensions.mediatorMap.api.IMediatorMap);
		if(this._injector.satisfiesDirectly(robotlegs.bender.extensions.viewManager.api.IViewManager)) {
			this._viewManager = this._injector.getInstance(robotlegs.bender.extensions.viewManager.api.IViewManager);
			this._viewManager.addViewHandler(this._mediatorMap);
		}
	}
	,beforeDestroying: function() {
		this._mediatorMap.unmediateAll();
		if(this._injector.satisfiesDirectly(robotlegs.bender.extensions.viewManager.api.IViewManager)) {
			this._viewManager = this._injector.getInstance(robotlegs.bender.extensions.viewManager.api.IViewManager);
			this._viewManager.removeViewHandler(this._mediatorMap);
		}
	}
	,whenDestroying: function() {
		if(this._injector.satisfiesDirectly(robotlegs.bender.extensions.mediatorMap.api.IMediatorMap)) this._injector.unmap(robotlegs.bender.extensions.mediatorMap.api.IMediatorMap);
	}
	,__class__: robotlegs.bender.extensions.mediatorMap.MediatorMapExtension
};
robotlegs.bender.extensions.mediatorMap.api.IMediatorMap = function() { };
$hxClasses["robotlegs.bender.extensions.mediatorMap.api.IMediatorMap"] = robotlegs.bender.extensions.mediatorMap.api.IMediatorMap;
robotlegs.bender.extensions.mediatorMap.api.IMediatorMap.__name__ = ["robotlegs","bender","extensions","mediatorMap","api","IMediatorMap"];
robotlegs.bender.extensions.mediatorMap.api.IMediatorMap.prototype = {
	map: null
	,__class__: robotlegs.bender.extensions.mediatorMap.api.IMediatorMap
};
robotlegs.bender.extensions.mediatorMap.api.IMediatorMapping = function() { };
$hxClasses["robotlegs.bender.extensions.mediatorMap.api.IMediatorMapping"] = robotlegs.bender.extensions.mediatorMap.api.IMediatorMapping;
robotlegs.bender.extensions.mediatorMap.api.IMediatorMapping.__name__ = ["robotlegs","bender","extensions","mediatorMap","api","IMediatorMapping"];
robotlegs.bender.extensions.mediatorMap.api.IMediatorMapping.prototype = {
	matcher: null
	,mediatorClass: null
	,guards: null
	,hooks: null
	,autoRemoveEnabled: null
	,__class__: robotlegs.bender.extensions.mediatorMap.api.IMediatorMapping
};
robotlegs.bender.extensions.mediatorMap.dsl = {};
robotlegs.bender.extensions.mediatorMap.dsl.IMediatorConfigurator = function() { };
$hxClasses["robotlegs.bender.extensions.mediatorMap.dsl.IMediatorConfigurator"] = robotlegs.bender.extensions.mediatorMap.dsl.IMediatorConfigurator;
robotlegs.bender.extensions.mediatorMap.dsl.IMediatorConfigurator.__name__ = ["robotlegs","bender","extensions","mediatorMap","dsl","IMediatorConfigurator"];
robotlegs.bender.extensions.mediatorMap.dsl.IMediatorMapper = function() { };
$hxClasses["robotlegs.bender.extensions.mediatorMap.dsl.IMediatorMapper"] = robotlegs.bender.extensions.mediatorMap.dsl.IMediatorMapper;
robotlegs.bender.extensions.mediatorMap.dsl.IMediatorMapper.__name__ = ["robotlegs","bender","extensions","mediatorMap","dsl","IMediatorMapper"];
robotlegs.bender.extensions.mediatorMap.dsl.IMediatorMapper.prototype = {
	toMediator: null
	,__class__: robotlegs.bender.extensions.mediatorMap.dsl.IMediatorMapper
};
robotlegs.bender.extensions.mediatorMap.dsl.IMediatorUnmapper = function() { };
$hxClasses["robotlegs.bender.extensions.mediatorMap.dsl.IMediatorUnmapper"] = robotlegs.bender.extensions.mediatorMap.dsl.IMediatorUnmapper;
robotlegs.bender.extensions.mediatorMap.dsl.IMediatorUnmapper.__name__ = ["robotlegs","bender","extensions","mediatorMap","dsl","IMediatorUnmapper"];
robotlegs.bender.extensions.mediatorMap.impl = {};
robotlegs.bender.extensions.mediatorMap.impl.MediatorFactory = function(injector,manager) {
	this._mediators = new haxe.ds.StringMap();
	this._injector = injector;
	if(manager != null) this._manager = manager; else this._manager = new robotlegs.bender.extensions.mediatorMap.impl.MediatorManager(this);
};
$hxClasses["robotlegs.bender.extensions.mediatorMap.impl.MediatorFactory"] = robotlegs.bender.extensions.mediatorMap.impl.MediatorFactory;
robotlegs.bender.extensions.mediatorMap.impl.MediatorFactory.__name__ = ["robotlegs","bender","extensions","mediatorMap","impl","MediatorFactory"];
robotlegs.bender.extensions.mediatorMap.impl.MediatorFactory.prototype = {
	_mediators: null
	,_injector: null
	,_manager: null
	,getMediator: function(item,mapping) {
		var id = org.swiftsuspenders.utils.UID.instanceID(item);
		var _mediatorsItem;
		if(this._mediators.get(id) != null) {
			var v = new haxe.ds.StringMap();
			this._mediators.set(id,v);
			v;
		}
		return this._mediators.get(id);
		if(this._mediators.get(id) != null) {
			_mediatorsItem = this._mediators.get(id);
			return _mediatorsItem.h[mapping.__id__];
		}
		return null;
	}
	,createMediators: function(item,type,mappings) {
		var createdMediators = [];
		var mediator;
		var _g = 0;
		while(_g < mappings.length) {
			var mapping = mappings[_g];
			++_g;
			mediator = this.getMediator(item,mapping);
			if(mediator == null) {
				this.mapTypeForFilterBinding(mapping.matcher,type,item);
				mediator = this.createMediator(item,mapping);
				this.unmapTypeForFilterBinding(mapping.matcher,type,item);
			}
			if(mediator) createdMediators.push(mediator);
		}
		return createdMediators;
	}
	,removeMediators: function(item) {
		var mediators;
		var key = org.swiftsuspenders.utils.UID.classID(item);
		mediators = this._mediators.get(key);
		if(mediators == null) return;
		var $it0 = mediators.iterator();
		while( $it0.hasNext() ) {
			var mapping = $it0.next();
			this._manager.removeMediator(mediators.get(mapping),item,js.Boot.__cast(mapping , robotlegs.bender.extensions.mediatorMap.api.IMediatorMapping));
		}
		var key1 = item;
		this._mediators.remove(key1);
	}
	,removeAllMediators: function() {
		var $it0 = this._mediators.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			this.removeMediators(item);
		}
	}
	,createMediator: function(item,mapping) {
		var mediator = this.getMediator(item,mapping);
		if(mediator) return mediator;
		if(mapping.get_guards().length == 0 || robotlegs.bender.framework.impl.GuardsApprove.call(mapping.get_guards(),this._injector)) {
			var mediatorClass = mapping.get_mediatorClass();
			mediator = this._injector.instantiateUnmapped(mediatorClass);
			if(mapping.get_hooks().length > 0) {
				this._injector.map(mediatorClass).toValue(mediator);
				robotlegs.bender.framework.impl.ApplyHooks.call(mapping.get_hooks(),this._injector);
				this._injector.unmap(mediatorClass);
			}
			this.addMediator(mediator,item,mapping);
		}
		return mediator;
	}
	,addMediator: function(mediator,item,mapping) {
		var id = org.swiftsuspenders.utils.UID.instanceID(item);
		var _mediatorsItem;
		if(this._mediators.get(id) == null) _mediatorsItem = new haxe.ds.ObjectMap(); else _mediatorsItem = this._mediators.get(id);
		var v = mediator;
		_mediatorsItem.set(mapping,v);
		v;
		var v1 = _mediatorsItem.h[mapping.__id__];
		this._mediators.set(id,v1);
		v1;
		this._manager.addMediator(mediator,item,mapping);
	}
	,mapTypeForFilterBinding: function(filter,type,item) {
		var _g = 0;
		var _g1 = this.requiredTypesFor(filter,type);
		while(_g < _g1.length) {
			var requiredType = _g1[_g];
			++_g;
			this._injector.map(requiredType).toValue(item);
		}
	}
	,unmapTypeForFilterBinding: function(filter,type,item) {
		var _g = 0;
		var _g1 = this.requiredTypesFor(filter,type);
		while(_g < _g1.length) {
			var requiredType = _g1[_g];
			++_g;
			if(this._injector.satisfiesDirectly(requiredType)) this._injector.unmap(requiredType);
		}
	}
	,requiredTypesFor: function(filter,type) {
		var requiredTypes = filter.get_allOfTypes().concat(filter.get_anyOfTypes());
		if(HxOverrides.indexOf(requiredTypes,type,0) == -1) requiredTypes.push(type);
		return requiredTypes;
	}
	,__class__: robotlegs.bender.extensions.mediatorMap.impl.MediatorFactory
};
robotlegs.bender.extensions.mediatorMap.impl.MediatorManager = function(factory) {
	this._factory = factory;
};
$hxClasses["robotlegs.bender.extensions.mediatorMap.impl.MediatorManager"] = robotlegs.bender.extensions.mediatorMap.impl.MediatorManager;
robotlegs.bender.extensions.mediatorMap.impl.MediatorManager.__name__ = ["robotlegs","bender","extensions","mediatorMap","impl","MediatorManager"];
robotlegs.bender.extensions.mediatorMap.impl.MediatorManager.UIComponentClass = null;
robotlegs.bender.extensions.mediatorMap.impl.MediatorManager.prototype = {
	_factory: null
	,addMediator: function(mediator,item,mapping) {
		var displayObject = null;
		if(js.Boot.__instanceof(item,openfl.display.DisplayObject)) displayObject = js.Boot.__cast(item , openfl.display.DisplayObject);
		if(displayObject != null && mapping.get_autoRemoveEnabled()) displayObject.addEventListener(openfl.events.Event.REMOVED_FROM_STAGE,$bind(this,this.onRemovedFromStage));
		if(this.itemInitialized(item)) this.initializeMediator(mediator,item); else {
			var mediatorManagerAddMediator = new robotlegs.bender.extensions.mediatorMap.impl.MediatorManagerAddMediator($bind(this,this.initializeMediator),this._factory,displayObject,mediator,item,mapping);
			displayObject.addEventListener(robotlegs.bender.extensions.mediatorMap.impl.MediatorManager.CREATION_COMPLETE,$bind(mediatorManagerAddMediator,mediatorManagerAddMediator.creationComplete));
		}
	}
	,removeMediator: function(mediator,item,mapping) {
		if(js.Boot.__instanceof(item,openfl.display.DisplayObject)) (js.Boot.__cast(item , openfl.display.DisplayObject)).removeEventListener(openfl.events.Event.REMOVED_FROM_STAGE,$bind(this,this.onRemovedFromStage));
		if(this.itemInitialized(item)) this.destroyMediator(mediator);
	}
	,onRemovedFromStage: function(event) {
		this._factory.removeMediators(event.target);
	}
	,itemInitialized: function(item) {
		if(robotlegs.bender.extensions.mediatorMap.impl.MediatorManager.flexAvailable && js.Boot.__instanceof(item,robotlegs.bender.extensions.mediatorMap.impl.MediatorManager.UIComponentClass) && !org.swiftsuspenders.utils.CallProxy.hasField(item,"initialized")) return false;
		return true;
	}
	,initializeMediator: function(mediator,mediatedItem) {
		if(org.swiftsuspenders.utils.CallProxy.hasField(mediator,"preInitialize")) mediator.preInitialize();
		if(org.swiftsuspenders.utils.CallProxy.hasField(mediator,"viewComponent")) mediator.viewComponent = mediatedItem;
		if(org.swiftsuspenders.utils.CallProxy.hasField(mediator,"initialize")) mediator.initialize();
		if(org.swiftsuspenders.utils.CallProxy.hasField(mediator,"postInitialize")) mediator.postInitialize();
	}
	,destroyMediator: function(mediator) {
		if(org.swiftsuspenders.utils.CallProxy.hasField(mediator,"preDestroy")) mediator.preDestroy();
		if(org.swiftsuspenders.utils.CallProxy.hasField(mediator,"destroy")) mediator.destroy();
		if(org.swiftsuspenders.utils.CallProxy.hasField(mediator,"viewComponent")) mediator.viewComponent = null;
		if(org.swiftsuspenders.utils.CallProxy.hasField(mediator,"postDestroy")) mediator.postDestroy();
	}
	,__class__: robotlegs.bender.extensions.mediatorMap.impl.MediatorManager
};
robotlegs.bender.extensions.mediatorMap.impl.MediatorManagerAddMediator = function(initializeMediator,_factory,displayObject,mediator,item,mapping) {
	this.initializeMediator = initializeMediator;
	this._factory = _factory;
	this.mapping = mapping;
	this.item = item;
	this.mediator = mediator;
	this.displayObject = displayObject;
};
$hxClasses["robotlegs.bender.extensions.mediatorMap.impl.MediatorManagerAddMediator"] = robotlegs.bender.extensions.mediatorMap.impl.MediatorManagerAddMediator;
robotlegs.bender.extensions.mediatorMap.impl.MediatorManagerAddMediator.__name__ = ["robotlegs","bender","extensions","mediatorMap","impl","MediatorManagerAddMediator"];
robotlegs.bender.extensions.mediatorMap.impl.MediatorManagerAddMediator.prototype = {
	displayObject: null
	,mediator: null
	,item: null
	,mapping: null
	,_factory: null
	,initializeMediator: null
	,creationComplete: function(e) {
		this.displayObject.removeEventListener(robotlegs.bender.extensions.mediatorMap.impl.MediatorManager.CREATION_COMPLETE,$bind(this,this.creationComplete));
		if(this._factory.getMediator(this.item,this.mapping) == this.mediator) this.initializeMediator(this.mediator,this.item);
	}
	,__class__: robotlegs.bender.extensions.mediatorMap.impl.MediatorManagerAddMediator
};
robotlegs.bender.extensions.viewManager = {};
robotlegs.bender.extensions.viewManager.api = {};
robotlegs.bender.extensions.viewManager.api.IViewHandler = function() { };
$hxClasses["robotlegs.bender.extensions.viewManager.api.IViewHandler"] = robotlegs.bender.extensions.viewManager.api.IViewHandler;
robotlegs.bender.extensions.viewManager.api.IViewHandler.__name__ = ["robotlegs","bender","extensions","viewManager","api","IViewHandler"];
robotlegs.bender.extensions.viewManager.api.IViewHandler.prototype = {
	handleView: null
	,__class__: robotlegs.bender.extensions.viewManager.api.IViewHandler
};
robotlegs.bender.extensions.mediatorMap.impl.MediatorMap = function(context) {
	this.NULL_UNMAPPER = new robotlegs.bender.extensions.mediatorMap.impl.NullMediatorUnmapper();
	this._mappers = new haxe.ds.StringMap();
	this._logger = context.getLogger(this);
	this._factory = new robotlegs.bender.extensions.mediatorMap.impl.MediatorFactory(context.get_injector());
	this._viewHandler = new robotlegs.bender.extensions.mediatorMap.impl.MediatorViewHandler(this._factory);
};
$hxClasses["robotlegs.bender.extensions.mediatorMap.impl.MediatorMap"] = robotlegs.bender.extensions.mediatorMap.impl.MediatorMap;
robotlegs.bender.extensions.mediatorMap.impl.MediatorMap.__name__ = ["robotlegs","bender","extensions","mediatorMap","impl","MediatorMap"];
robotlegs.bender.extensions.mediatorMap.impl.MediatorMap.__interfaces__ = [robotlegs.bender.extensions.viewManager.api.IViewHandler,robotlegs.bender.extensions.mediatorMap.api.IMediatorMap];
robotlegs.bender.extensions.mediatorMap.impl.MediatorMap.prototype = {
	_mappers: null
	,_logger: null
	,_factory: null
	,_viewHandler: null
	,NULL_UNMAPPER: null
	,mapMatcher: function(matcher) {
		if((function($this) {
			var $r;
			var key = matcher.createTypeFilter().get_descriptor();
			$r = $this._mappers.get(key);
			return $r;
		}(this)) == null) {
			var k = matcher.createTypeFilter().get_descriptor();
			var v = this.createMapper(matcher);
			this._mappers.set(k,v);
			v;
		}
		var key1 = matcher.createTypeFilter().get_descriptor();
		return this._mappers.get(key1);
	}
	,map: function(type) {
		return this.mapMatcher(new robotlegs.bender.extensions.matching.TypeMatcher().allOf([type]));
	}
	,unmapMatcher: function(matcher) {
		var val;
		var key = matcher.createTypeFilter().get_descriptor();
		val = this._mappers.get(key);
		if(val != null) return val; else return this.NULL_UNMAPPER;
	}
	,unmap: function(type) {
		return this.unmapMatcher(new robotlegs.bender.extensions.matching.TypeMatcher().allOf([type]));
	}
	,handleView: function(view,type) {
		this._viewHandler.handleView(view,type);
	}
	,mediate: function(item) {
		this._viewHandler.handleItem(item,Type.getClass(item));
	}
	,unmediate: function(item) {
		this._factory.removeMediators(item);
	}
	,unmediateAll: function() {
		this._factory.removeAllMediators();
	}
	,createMapper: function(matcher) {
		return new robotlegs.bender.extensions.mediatorMap.impl.MediatorMapper(matcher.createTypeFilter(),this._viewHandler,this._logger);
	}
	,__class__: robotlegs.bender.extensions.mediatorMap.impl.MediatorMap
};
robotlegs.bender.extensions.mediatorMap.impl.MediatorMapper = function(typeFilter,handler,logger) {
	this._mappings = new haxe.ds.StringMap();
	this._typeFilter = typeFilter;
	this._handler = handler;
	this._logger = logger;
};
$hxClasses["robotlegs.bender.extensions.mediatorMap.impl.MediatorMapper"] = robotlegs.bender.extensions.mediatorMap.impl.MediatorMapper;
robotlegs.bender.extensions.mediatorMap.impl.MediatorMapper.__name__ = ["robotlegs","bender","extensions","mediatorMap","impl","MediatorMapper"];
robotlegs.bender.extensions.mediatorMap.impl.MediatorMapper.__interfaces__ = [robotlegs.bender.extensions.mediatorMap.dsl.IMediatorUnmapper,robotlegs.bender.extensions.mediatorMap.dsl.IMediatorMapper];
robotlegs.bender.extensions.mediatorMap.impl.MediatorMapper.prototype = {
	_mappings: null
	,_typeFilter: null
	,_handler: null
	,_logger: null
	,toMediator: function(mediatorClass) {
		var mapping;
		var key = org.swiftsuspenders.utils.UID.classID(mediatorClass);
		mapping = this._mappings.get(key);
		if(mapping != null) return this.overwriteMapping(mapping); else return this.createMapping(mediatorClass);
	}
	,fromMediator: function(mediatorClass) {
		var mapping;
		var key = org.swiftsuspenders.utils.UID.classID(mediatorClass);
		mapping = this._mappings.get(key);
		if(mapping != null) this.deleteMapping(mapping);
	}
	,fromAll: function() {
		var $it0 = this._mappings.iterator();
		while( $it0.hasNext() ) {
			var mapping = $it0.next();
			this.deleteMapping(mapping);
		}
	}
	,createMapping: function(mediatorClass) {
		var mapping = new robotlegs.bender.extensions.mediatorMap.impl.MediatorMapping(this._typeFilter,mediatorClass);
		this._handler.addMapping(mapping);
		var k = org.swiftsuspenders.utils.UID.classID(mediatorClass);
		this._mappings.set(k,mapping);
		mapping;
		if(this._logger != null) this._logger.debug("{0} mapped to {1}",[this._typeFilter,mapping]);
		return mapping;
	}
	,deleteMapping: function(mapping) {
		this._handler.removeMapping(mapping);
		var key = org.swiftsuspenders.utils.UID.classID(mapping.get_mediatorClass());
		this._mappings.remove(key);
		if(this._logger != null) this._logger.debug("{0} unmapped from {1}",[this._typeFilter,mapping]);
	}
	,overwriteMapping: function(mapping) {
		if(this._logger != null) this._logger.warn("{0} already mapped to {1}\n" + "If you have overridden this mapping intentionally you can use \"unmap()\" " + "prior to your replacement mapping in order to avoid seeing this message.\n",[this._typeFilter,mapping]);
		this.deleteMapping(mapping);
		return this.createMapping(mapping.get_mediatorClass());
	}
	,__class__: robotlegs.bender.extensions.mediatorMap.impl.MediatorMapper
};
robotlegs.bender.extensions.mediatorMap.impl.MediatorMapping = function(matcher,mediatorClass) {
	this.hooks = new Array();
	this.guards = new Array();
	this.matcher = matcher;
	this.mediatorClass = mediatorClass;
};
$hxClasses["robotlegs.bender.extensions.mediatorMap.impl.MediatorMapping"] = robotlegs.bender.extensions.mediatorMap.impl.MediatorMapping;
robotlegs.bender.extensions.mediatorMap.impl.MediatorMapping.__name__ = ["robotlegs","bender","extensions","mediatorMap","impl","MediatorMapping"];
robotlegs.bender.extensions.mediatorMap.impl.MediatorMapping.__interfaces__ = [robotlegs.bender.extensions.mediatorMap.dsl.IMediatorConfigurator,robotlegs.bender.extensions.mediatorMap.api.IMediatorMapping];
robotlegs.bender.extensions.mediatorMap.impl.MediatorMapping.prototype = {
	matcher: null
	,get_matcher: function() {
		return this.matcher;
	}
	,mediatorClass: null
	,get_mediatorClass: function() {
		return this.mediatorClass;
	}
	,guards: null
	,get_guards: function() {
		return this.guards;
	}
	,hooks: null
	,get_hooks: function() {
		return this.hooks;
	}
	,autoRemoveEnabled: null
	,get_autoRemoveEnabled: function() {
		return this.autoRemoveEnabled;
	}
	,withGuards: function(guards) {
		var _g1 = 0;
		var _g = guards.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.get_guards().push(guards[i]);
		}
		return this;
	}
	,withHooks: function(hooks) {
		var _g1 = 0;
		var _g = hooks.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.get_hooks().push(hooks[i]);
		}
		return this;
	}
	,autoRemove: function(value) {
		if(value == null) value = true;
		this.autoRemoveEnabled = value;
		return this;
	}
	,__class__: robotlegs.bender.extensions.mediatorMap.impl.MediatorMapping
	,__properties__: {get_autoRemoveEnabled:"get_autoRemoveEnabled",get_hooks:"get_hooks",get_guards:"get_guards",get_mediatorClass:"get_mediatorClass",get_matcher:"get_matcher"}
};
robotlegs.bender.extensions.mediatorMap.impl.MediatorViewHandler = function(factory) {
	this._knownMappings = new haxe.ds.StringMap();
	this._mappings = [];
	this._factory = factory;
};
$hxClasses["robotlegs.bender.extensions.mediatorMap.impl.MediatorViewHandler"] = robotlegs.bender.extensions.mediatorMap.impl.MediatorViewHandler;
robotlegs.bender.extensions.mediatorMap.impl.MediatorViewHandler.__name__ = ["robotlegs","bender","extensions","mediatorMap","impl","MediatorViewHandler"];
robotlegs.bender.extensions.mediatorMap.impl.MediatorViewHandler.__interfaces__ = [robotlegs.bender.extensions.viewManager.api.IViewHandler];
robotlegs.bender.extensions.mediatorMap.impl.MediatorViewHandler.prototype = {
	_mappings: null
	,_knownMappings: null
	,_factory: null
	,addMapping: function(mapping) {
		var index = HxOverrides.indexOf(this._mappings,mapping,0);
		if(index > -1) return;
		this._mappings.push(mapping);
		this.flushCache();
	}
	,removeMapping: function(mapping) {
		var index = HxOverrides.indexOf(this._mappings,mapping,0);
		if(index == -1) return;
		this._mappings.splice(index,1);
		this.flushCache();
	}
	,handleView: function(view,type) {
		var interestedMappings = this.getInterestedMappingsFor(view,type);
		if(interestedMappings != null) this._factory.createMediators(view,type,interestedMappings);
	}
	,handleItem: function(item,type) {
		var interestedMappings = this.getInterestedMappingsFor(item,type);
		if(interestedMappings != null) this._factory.createMediators(item,type,interestedMappings);
	}
	,flushCache: function() {
		this._knownMappings = new haxe.ds.StringMap();
	}
	,getInterestedMappingsFor: function(item,type) {
		var mapping;
		var typeID = org.swiftsuspenders.utils.UID.classID(type);
		if(this._knownMappings.get(typeID) == false) return null;
		if(this._knownMappings.get(typeID) == null) {
			this._knownMappings.set(typeID,false);
			false;
			var _g1 = 0;
			var _g = this._mappings.length;
			while(_g1 < _g) {
				var i = _g1++;
				mapping = this._mappings[i];
				if(mapping.get_matcher().matches(item)) {
					if(this._knownMappings.get(typeID) == false) {
						var v = [];
						this._knownMappings.set(typeID,v);
						v;
					}
					this._knownMappings.get(typeID).push(mapping);
				}
			}
			if(this._knownMappings.get(typeID) == false) return null;
		}
		return js.Boot.__cast(this._knownMappings.get(typeID) , Array);
	}
	,__class__: robotlegs.bender.extensions.mediatorMap.impl.MediatorViewHandler
};
robotlegs.bender.extensions.mediatorMap.impl.NullMediatorUnmapper = function() {
};
$hxClasses["robotlegs.bender.extensions.mediatorMap.impl.NullMediatorUnmapper"] = robotlegs.bender.extensions.mediatorMap.impl.NullMediatorUnmapper;
robotlegs.bender.extensions.mediatorMap.impl.NullMediatorUnmapper.__name__ = ["robotlegs","bender","extensions","mediatorMap","impl","NullMediatorUnmapper"];
robotlegs.bender.extensions.mediatorMap.impl.NullMediatorUnmapper.__interfaces__ = [robotlegs.bender.extensions.mediatorMap.dsl.IMediatorUnmapper];
robotlegs.bender.extensions.mediatorMap.impl.NullMediatorUnmapper.prototype = {
	fromMediator: function(mediatorClass) {
	}
	,fromAll: function() {
	}
	,__class__: robotlegs.bender.extensions.mediatorMap.impl.NullMediatorUnmapper
};
robotlegs.bender.extensions.modularity = {};
robotlegs.bender.extensions.modularity.ModularityExtension = function(inherit,expose) {
	if(expose == null) expose = true;
	if(inherit == null) inherit = true;
	this._expose = false;
	this._inherit = false;
	this._inherit = inherit;
	this._expose = expose;
};
$hxClasses["robotlegs.bender.extensions.modularity.ModularityExtension"] = robotlegs.bender.extensions.modularity.ModularityExtension;
robotlegs.bender.extensions.modularity.ModularityExtension.__name__ = ["robotlegs","bender","extensions","modularity","ModularityExtension"];
robotlegs.bender.extensions.modularity.ModularityExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.modularity.ModularityExtension.prototype = {
	_context: null
	,_injector: null
	,_logger: null
	,_inherit: null
	,_expose: null
	,_contextView: null
	,extend: function(context) {
		context.beforeInitializing($bind(this,this.beforeInitializing));
		this._context = context;
		this._injector = context.get_injector();
		this._logger = context.getLogger(this);
		this._context.addConfigHandler(robotlegs.bender.extensions.matching.InstanceOfType.call(robotlegs.bender.extensions.contextView.ContextView),$bind(this,this.handleContextView));
		this._injector.map(robotlegs.bender.extensions.modularity.api.IModuleConnector).toSingleton(robotlegs.bender.extensions.modularity.impl.ModuleConnector);
	}
	,beforeInitializing: function() {
		if(this._contextView == null) this._logger.error("Context has no ContextView, and ModularityExtension doesn't allow this.");
	}
	,handleContextView: function(contextView) {
		this._contextView = contextView.view;
		if(this._expose) this.configureExistenceWatcher();
		if(this._inherit) this.configureExistenceBroadcaster();
	}
	,configureExistenceWatcher: function() {
		if(this._injector.hasDirectMapping(robotlegs.bender.extensions.viewManager.api.IViewManager)) {
			this._logger.debug("Context has a ViewManager. Configuring view manager based context existence watcher...");
			var viewManager = this._injector.getInstance(robotlegs.bender.extensions.viewManager.api.IViewManager);
			new robotlegs.bender.extensions.modularity.impl.ViewManagerBasedExistenceWatcher(this._context,viewManager);
		} else {
			this._logger.debug("Context has a ContextView. Configuring context view based context existence watcher...");
			new robotlegs.bender.extensions.modularity.impl.ContextViewBasedExistenceWatcher(this._context,this._contextView);
		}
	}
	,configureExistenceBroadcaster: function() {
		if(this._contextView.stage != null) this.broadcastContextExistence(); else {
			this._logger.debug("Context view is not yet on stage. Waiting...");
			this._contextView.addEventListener(openfl.events.Event.ADDED_TO_STAGE,$bind(this,this.onAddedToStage));
		}
	}
	,onAddedToStage: function(event) {
		this._logger.debug("Context view is now on stage. Continuing...");
		this._contextView.removeEventListener(openfl.events.Event.ADDED_TO_STAGE,$bind(this,this.onAddedToStage));
		this.broadcastContextExistence();
	}
	,broadcastContextExistence: function() {
		this._logger.debug("Context configured to inherit. Broadcasting existence event...");
		this._contextView.dispatchEvent(new robotlegs.bender.extensions.modularity.impl.ModularContextEvent(robotlegs.bender.extensions.modularity.impl.ModularContextEvent.CONTEXT_ADD,this._context));
	}
	,__class__: robotlegs.bender.extensions.modularity.ModularityExtension
};
robotlegs.bender.extensions.modularity.api = {};
robotlegs.bender.extensions.modularity.api.IModuleConnector = function() { };
$hxClasses["robotlegs.bender.extensions.modularity.api.IModuleConnector"] = robotlegs.bender.extensions.modularity.api.IModuleConnector;
robotlegs.bender.extensions.modularity.api.IModuleConnector.__name__ = ["robotlegs","bender","extensions","modularity","api","IModuleConnector"];
robotlegs.bender.extensions.modularity.dsl = {};
robotlegs.bender.extensions.modularity.dsl.IModuleConnectionAction = function() { };
$hxClasses["robotlegs.bender.extensions.modularity.dsl.IModuleConnectionAction"] = robotlegs.bender.extensions.modularity.dsl.IModuleConnectionAction;
robotlegs.bender.extensions.modularity.dsl.IModuleConnectionAction.__name__ = ["robotlegs","bender","extensions","modularity","dsl","IModuleConnectionAction"];
robotlegs.bender.extensions.modularity.impl = {};
robotlegs.bender.extensions.modularity.impl.ContextViewBasedExistenceWatcher = function(context,contextView) {
	this._logger = context.getLogger(this);
	this._contextView = contextView;
	this._context = context;
	this._context.whenDestroying($bind(this,this.destroy));
	this.init();
};
$hxClasses["robotlegs.bender.extensions.modularity.impl.ContextViewBasedExistenceWatcher"] = robotlegs.bender.extensions.modularity.impl.ContextViewBasedExistenceWatcher;
robotlegs.bender.extensions.modularity.impl.ContextViewBasedExistenceWatcher.__name__ = ["robotlegs","bender","extensions","modularity","impl","ContextViewBasedExistenceWatcher"];
robotlegs.bender.extensions.modularity.impl.ContextViewBasedExistenceWatcher.prototype = {
	_logger: null
	,_contextView: null
	,_context: null
	,init: function() {
		this._logger.debug("Listening for context existence events on contextView {0}",[this._contextView]);
		this._contextView.addEventListener(robotlegs.bender.extensions.modularity.impl.ModularContextEvent.CONTEXT_ADD,$bind(this,this.onContextAdd));
	}
	,destroy: function() {
		this._logger.debug("Removing modular context existence event listener from contextView {0}",[this._contextView]);
		this._contextView.removeEventListener(robotlegs.bender.extensions.modularity.impl.ModularContextEvent.CONTEXT_ADD,$bind(this,this.onContextAdd));
	}
	,onContextAdd: function(event) {
		if(event.context != this._context) {
			event.stopImmediatePropagation();
			this._logger.debug("Context existence event caught. Configuring child context {0}",[event.context]);
			this._context.addChild(event.context);
		}
	}
	,__class__: robotlegs.bender.extensions.modularity.impl.ContextViewBasedExistenceWatcher
};
robotlegs.bender.extensions.modularity.impl.ModularContextEvent = function(type,context) {
	openfl.events.Event.call(this,type,true,true);
	this._context = context;
};
$hxClasses["robotlegs.bender.extensions.modularity.impl.ModularContextEvent"] = robotlegs.bender.extensions.modularity.impl.ModularContextEvent;
robotlegs.bender.extensions.modularity.impl.ModularContextEvent.__name__ = ["robotlegs","bender","extensions","modularity","impl","ModularContextEvent"];
robotlegs.bender.extensions.modularity.impl.ModularContextEvent.__super__ = openfl.events.Event;
robotlegs.bender.extensions.modularity.impl.ModularContextEvent.prototype = $extend(openfl.events.Event.prototype,{
	_context: null
	,context: null
	,clone: function() {
		return new robotlegs.bender.extensions.modularity.impl.ModularContextEvent(this.type,this.context);
	}
	,toString: function() {
		return "[ModularContextEvent, context]";
	}
	,__class__: robotlegs.bender.extensions.modularity.impl.ModularContextEvent
});
robotlegs.bender.extensions.modularity.impl.ModuleConnectionConfigurator = function(localDispatcher,channelDispatcher) {
	this._localToChannelRelay = new robotlegs.bender.extensions.eventDispatcher.impl.EventRelay(localDispatcher,channelDispatcher).start();
	this._channelToLocalRelay = new robotlegs.bender.extensions.eventDispatcher.impl.EventRelay(channelDispatcher,localDispatcher).start();
};
$hxClasses["robotlegs.bender.extensions.modularity.impl.ModuleConnectionConfigurator"] = robotlegs.bender.extensions.modularity.impl.ModuleConnectionConfigurator;
robotlegs.bender.extensions.modularity.impl.ModuleConnectionConfigurator.__name__ = ["robotlegs","bender","extensions","modularity","impl","ModuleConnectionConfigurator"];
robotlegs.bender.extensions.modularity.impl.ModuleConnectionConfigurator.__interfaces__ = [robotlegs.bender.extensions.modularity.dsl.IModuleConnectionAction];
robotlegs.bender.extensions.modularity.impl.ModuleConnectionConfigurator.prototype = {
	_channelToLocalRelay: null
	,_localToChannelRelay: null
	,relayEvent: function(eventType) {
		this._localToChannelRelay.addType(eventType);
		return this;
	}
	,receiveEvent: function(eventType) {
		this._channelToLocalRelay.addType(eventType);
		return this;
	}
	,suspend: function() {
		this._channelToLocalRelay.stop();
		this._localToChannelRelay.stop();
	}
	,resume: function() {
		this._channelToLocalRelay.start();
		this._localToChannelRelay.start();
	}
	,destroy: function() {
		this._localToChannelRelay.stop();
		this._localToChannelRelay = null;
		this._channelToLocalRelay.stop();
		this._channelToLocalRelay = null;
	}
	,__class__: robotlegs.bender.extensions.modularity.impl.ModuleConnectionConfigurator
};
robotlegs.bender.extensions.modularity.impl.ModuleConnector = function(context) {
	var injector = context.get_injector();
	this._rootInjector = this.getRootInjector(injector);
	this._localDispatcher = injector.getInstance(openfl.events.IEventDispatcher);
	context.whenDestroying($bind(this,this.destroy));
};
$hxClasses["robotlegs.bender.extensions.modularity.impl.ModuleConnector"] = robotlegs.bender.extensions.modularity.impl.ModuleConnector;
robotlegs.bender.extensions.modularity.impl.ModuleConnector.__name__ = ["robotlegs","bender","extensions","modularity","impl","ModuleConnector"];
robotlegs.bender.extensions.modularity.impl.ModuleConnector.__interfaces__ = [robotlegs.bender.extensions.modularity.api.IModuleConnector];
robotlegs.bender.extensions.modularity.impl.ModuleConnector.prototype = {
	_rootInjector: null
	,_localDispatcher: null
	,_configuratorsByChannel: null
	,onChannel: function(channelId) {
		return this.getOrCreateConfigurator(channelId);
	}
	,onDefaultChannel: function() {
		return this.getOrCreateConfigurator("global");
	}
	,destroy: function() {
		var $it0 = this._configuratorsByChannel.iterator();
		while( $it0.hasNext() ) {
			var channelId = $it0.next();
			var id;
			id = js.Boot.__cast(channelId , String);
			var configurator = this._configuratorsByChannel.get(id);
			configurator.destroy();
			this._configuratorsByChannel.set(id,null);
			null;
		}
		this._configuratorsByChannel = null;
		this._localDispatcher = null;
		this._rootInjector = null;
	}
	,getOrCreateConfigurator: function(channelId) {
		if(!org.swiftsuspenders.utils.CallProxy.hasField(this._configuratorsByChannel,channelId)) Reflect.setField(this._configuratorsByChannel,channelId,this.createConfigurator(channelId));
		return Reflect.getProperty(this._configuratorsByChannel,channelId);
	}
	,createConfigurator: function(channelId) {
		if(this._rootInjector.hasMapping(openfl.events.IEventDispatcher,channelId)) this._rootInjector.map(openfl.events.IEventDispatcher,channelId).toValue(new openfl.events.EventDispatcher());
		return new robotlegs.bender.extensions.modularity.impl.ModuleConnectionConfigurator(this._localDispatcher,this._rootInjector.getInstance(openfl.events.IEventDispatcher,channelId));
	}
	,getRootInjector: function(injector) {
		while(injector.get_parent() != null) injector = injector.get_parent();
		return injector;
	}
	,__class__: robotlegs.bender.extensions.modularity.impl.ModuleConnector
};
robotlegs.bender.extensions.modularity.impl.ViewManagerBasedExistenceWatcher = function(context,viewManager) {
	this._logger = context.getLogger(this);
	this._viewManager = viewManager;
	this._context = context;
	this._context.whenDestroying($bind(this,this.destroy));
	this.init();
};
$hxClasses["robotlegs.bender.extensions.modularity.impl.ViewManagerBasedExistenceWatcher"] = robotlegs.bender.extensions.modularity.impl.ViewManagerBasedExistenceWatcher;
robotlegs.bender.extensions.modularity.impl.ViewManagerBasedExistenceWatcher.__name__ = ["robotlegs","bender","extensions","modularity","impl","ViewManagerBasedExistenceWatcher"];
robotlegs.bender.extensions.modularity.impl.ViewManagerBasedExistenceWatcher.prototype = {
	_logger: null
	,_viewManager: null
	,_context: null
	,init: function() {
		var _g = 0;
		var _g1 = this._viewManager.get_containers();
		while(_g < _g1.length) {
			var container = _g1[_g];
			++_g;
			this._logger.debug("Adding context existence event listener to container {0}",[container]);
			container.addEventListener(robotlegs.bender.extensions.modularity.impl.ModularContextEvent.CONTEXT_ADD,$bind(this,this.onContextAdd));
		}
		this._viewManager.addEventListener(robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.CONTAINER_ADD,$bind(this,this.onContainerAdd));
		this._viewManager.addEventListener(robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.CONTAINER_REMOVE,$bind(this,this.onContainerRemove));
	}
	,destroy: function() {
		var _g = 0;
		var _g1 = this._viewManager.get_containers();
		while(_g < _g1.length) {
			var container = _g1[_g];
			++_g;
			this._logger.debug("Removing context existence event listener from container {0}",[container]);
			container.removeEventListener(robotlegs.bender.extensions.modularity.impl.ModularContextEvent.CONTEXT_ADD,$bind(this,this.onContextAdd));
		}
		this._viewManager.removeEventListener(robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.CONTAINER_ADD,$bind(this,this.onContainerAdd));
		this._viewManager.removeEventListener(robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.CONTAINER_REMOVE,$bind(this,this.onContainerRemove));
	}
	,onContainerAdd: function(event) {
		this._logger.debug("Adding context existence event listener to container {0}",[event.container]);
		event.container.addEventListener(robotlegs.bender.extensions.modularity.impl.ModularContextEvent.CONTEXT_ADD,$bind(this,this.onContextAdd));
	}
	,onContainerRemove: function(event) {
		this._logger.debug("Removing context existence event listener from container {0}",[event.container]);
		event.container.removeEventListener(robotlegs.bender.extensions.modularity.impl.ModularContextEvent.CONTEXT_ADD,$bind(this,this.onContextAdd));
	}
	,onContextAdd: function(event) {
		if(event.context != this._context) {
			event.stopImmediatePropagation();
			this._logger.debug("Context existence event caught. Configuring child context {0}",[event.context]);
			this._context.addChild(event.context);
		}
	}
	,__class__: robotlegs.bender.extensions.modularity.impl.ViewManagerBasedExistenceWatcher
};
robotlegs.bender.extensions.signalCommandMap = {};
robotlegs.bender.extensions.signalCommandMap.SignalCommandMapExtension = function() { };
$hxClasses["robotlegs.bender.extensions.signalCommandMap.SignalCommandMapExtension"] = robotlegs.bender.extensions.signalCommandMap.SignalCommandMapExtension;
robotlegs.bender.extensions.signalCommandMap.SignalCommandMapExtension.__name__ = ["robotlegs","bender","extensions","signalCommandMap","SignalCommandMapExtension"];
robotlegs.bender.extensions.signalCommandMap.SignalCommandMapExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.signalCommandMap.SignalCommandMapExtension.prototype = {
	_uid: null
	,SignalCommandMapExtension: function() {
	}
	,extend: function(context) {
		this._uid = robotlegs.bender.framework.impl.UID.create($bind(this,this.SignalCommandMapExtension));
		context.get_injector().map(robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap).toSingleton(robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandMap);
	}
	,toString: function() {
		return this._uid;
	}
	,__class__: robotlegs.bender.extensions.signalCommandMap.SignalCommandMapExtension
};
robotlegs.bender.extensions.signalCommandMap.api = {};
robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap = function() { };
$hxClasses["robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap"] = robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap;
robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap.__name__ = ["robotlegs","bender","extensions","signalCommandMap","api","ISignalCommandMap"];
robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap.prototype = {
	map: null
	,__class__: robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap
};
robotlegs.bender.extensions.signalCommandMap.impl = {};
robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandMap = function(context) {
	this._mappingProcessors = [];
	this._injector = context.get_injector();
	this._logger = context.getLogger(this);
	this._triggerMap = new robotlegs.bender.extensions.commandCenter.impl.CommandTriggerMap($bind(this,this.getKey),$bind(this,this.createTrigger));
};
$hxClasses["robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandMap"] = robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandMap;
robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandMap.__name__ = ["robotlegs","bender","extensions","signalCommandMap","impl","SignalCommandMap"];
robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandMap.__interfaces__ = [robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap];
robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandMap.prototype = {
	_mappingProcessors: null
	,_injector: null
	,_triggerMap: null
	,_logger: null
	,map: function(signalClass) {
		return this.getTrigger(signalClass).createMapper();
	}
	,unmap: function(signalClass) {
		return this.getTrigger(signalClass).createMapper();
	}
	,addMappingProcessor: function(handler) {
		if((function($this) {
			var $r;
			var x = handler;
			$r = HxOverrides.indexOf($this._mappingProcessors,x,0);
			return $r;
		}(this)) == -1) this._mappingProcessors.push(handler);
		return this;
	}
	,getTrigger: function(signalClass) {
		return js.Boot.__cast(this._triggerMap.getTrigger([signalClass]) , robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandTrigger);
	}
	,getKey: function(signalClass) {
		return "" + Std.string(signalClass);
	}
	,createTrigger: function(signalClass) {
		return new robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandTrigger(this._injector,signalClass,this._mappingProcessors);
	}
	,__class__: robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandMap
};
robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandTrigger = function(injector,signalClass,processors,logger) {
	this._injector = injector;
	this._signalClass = signalClass;
	this._mappings = new robotlegs.bender.extensions.commandCenter.impl.CommandMappingList(this,processors,logger);
	this._executor = new robotlegs.bender.extensions.commandCenter.impl.CommandExecutor(injector,($_=this._mappings,$bind($_,$_.removeMapping)));
};
$hxClasses["robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandTrigger"] = robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandTrigger;
robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandTrigger.__name__ = ["robotlegs","bender","extensions","signalCommandMap","impl","SignalCommandTrigger"];
robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandTrigger.__interfaces__ = [robotlegs.bender.extensions.commandCenter.api.ICommandTrigger];
robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandTrigger.prototype = {
	_signalClass: null
	,_signal: null
	,_injector: null
	,_mappings: null
	,_executor: null
	,createMapper: function() {
		return new robotlegs.bender.extensions.commandCenter.impl.CommandMapper(this._mappings);
	}
	,activate: function() {
		if(!this._injector.hasMapping(this._signalClass)) this._injector.map(this._signalClass).asSingleton();
		this._signal = this._injector.getInstance(this._signalClass);
		this._signal.add($bind(this,this.routePayloadToCommands));
	}
	,deactivate: function() {
	}
	,toString: function() {
		return js.Boot.__cast(this._signalClass , String);
	}
	,routePayloadToCommands: function() {
		var payload = new robotlegs.bender.extensions.commandCenter.api.CommandPayload(null,this._signal.valueClasses);
		this._executor.executeCommands(this._mappings.getList(),payload);
	}
	,__class__: robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandTrigger
};
robotlegs.bender.extensions.stage3D = {};
robotlegs.bender.extensions.stage3D.away3d = {};
robotlegs.bender.extensions.stage3D.away3d.impl = {};
robotlegs.bender.extensions.stage3D.away3d.impl.Away3DInitializerAvailable = function() { };
$hxClasses["robotlegs.bender.extensions.stage3D.away3d.impl.Away3DInitializerAvailable"] = robotlegs.bender.extensions.stage3D.away3d.impl.Away3DInitializerAvailable;
robotlegs.bender.extensions.stage3D.away3d.impl.Away3DInitializerAvailable.__name__ = ["robotlegs","bender","extensions","stage3D","away3d","impl","Away3DInitializerAvailable"];
robotlegs.bender.extensions.stage3D.away3d.impl.Away3DInitializerAvailable.prototype = {
	Away3DInitializerAvailable: function() {
	}
	,__class__: robotlegs.bender.extensions.stage3D.away3d.impl.Away3DInitializerAvailable
};
robotlegs.bender.extensions.stage3D.base = {};
robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension = function() { };
$hxClasses["robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension"] = robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension;
robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension.__name__ = ["robotlegs","bender","extensions","stage3D","base","Stage3DStackExtension"];
robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension.prototype = {
	_uid: null
	,Stage3DStackExtension: function() {
	}
	,extend: function(context) {
		this._uid = robotlegs.bender.framework.impl.UID.create($bind(this,this.Stage3DStackExtension));
		context.get_injector().map(robotlegs.bender.extensions.stage3D.base.api.IStack).toSingleton(robotlegs.bender.extensions.stage3D.base.impl.Stack);
		context.get_injector().map(robotlegs.bender.extensions.stage3D.base.api.IRenderer).toSingleton(robotlegs.bender.extensions.stage3D.base.impl.Renderer);
		context.get_injector().map(robotlegs.bender.extensions.stage3D.base.api.IViewport).toSingleton(robotlegs.bender.extensions.stage3D.base.impl.Viewport);
	}
	,toString: function() {
		return this._uid;
	}
	,__class__: robotlegs.bender.extensions.stage3D.base.Stage3DStackExtension
};
robotlegs.bender.extensions.stage3D.base.api = {};
robotlegs.bender.extensions.stage3D.base.api.ILayer = function() { };
$hxClasses["robotlegs.bender.extensions.stage3D.base.api.ILayer"] = robotlegs.bender.extensions.stage3D.base.api.ILayer;
robotlegs.bender.extensions.stage3D.base.api.ILayer.__name__ = ["robotlegs","bender","extensions","stage3D","base","api","ILayer"];
robotlegs.bender.extensions.stage3D.base.api.ILayer.prototype = {
	process: null
	,rect: null
	,__class__: robotlegs.bender.extensions.stage3D.base.api.ILayer
};
robotlegs.bender.extensions.stage3D.base.api.IRenderer = function() { };
$hxClasses["robotlegs.bender.extensions.stage3D.base.api.IRenderer"] = robotlegs.bender.extensions.stage3D.base.api.IRenderer;
robotlegs.bender.extensions.stage3D.base.api.IRenderer.__name__ = ["robotlegs","bender","extensions","stage3D","base","api","IRenderer"];
robotlegs.bender.extensions.stage3D.base.api.IRenderer.prototype = {
	init: null
	,start: null
	,onReady: null
	,__class__: robotlegs.bender.extensions.stage3D.base.api.IRenderer
};
robotlegs.bender.extensions.stage3D.base.api.IStack = function() { };
$hxClasses["robotlegs.bender.extensions.stage3D.base.api.IStack"] = robotlegs.bender.extensions.stage3D.base.api.IStack;
robotlegs.bender.extensions.stage3D.base.api.IStack.__name__ = ["robotlegs","bender","extensions","stage3D","base","api","IStack"];
robotlegs.bender.extensions.stage3D.base.api.IViewport = function() { };
$hxClasses["robotlegs.bender.extensions.stage3D.base.api.IViewport"] = robotlegs.bender.extensions.stage3D.base.api.IViewport;
robotlegs.bender.extensions.stage3D.base.api.IViewport.__name__ = ["robotlegs","bender","extensions","stage3D","base","api","IViewport"];
robotlegs.bender.extensions.stage3D.base.api.IViewport.prototype = {
	init: null
	,onChange: null
	,__class__: robotlegs.bender.extensions.stage3D.base.api.IViewport
};
robotlegs.bender.extensions.stage3D.base.impl = {};
robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer = function() {
	this._debug = false;
};
$hxClasses["robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer"] = robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer;
robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer.__name__ = ["robotlegs","bender","extensions","stage3D","base","impl","BaseInitializer"];
robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer.prototype = {
	renderer: null
	,contextView: null
	,context: null
	,_debug: null
	,BaseInitializer: function() {
	}
	,init: function(renderer,contextView,context) {
		this.renderer = renderer;
		this.contextView = contextView;
		this.context = context;
	}
	,addLayer: function(ViewClass,index,id) {
	}
	,autoID: function(ClassName) {
		return "" + Math.random() * 1000;
	}
	,set_debug: function(value) {
		this._debug = value;
		return value;
	}
	,get_debug: function() {
		return this._debug;
	}
	,__class__: robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer
	,__properties__: {set_debug:"set_debug",get_debug:"get_debug"}
};
robotlegs.bender.extensions.stage3D.base.impl.Renderer = function() {
	this.freeFreeStage3DIndex = 0;
	this.layers = new Array();
	this._onReady = new msignal.Signal0();
};
$hxClasses["robotlegs.bender.extensions.stage3D.base.impl.Renderer"] = robotlegs.bender.extensions.stage3D.base.impl.Renderer;
robotlegs.bender.extensions.stage3D.base.impl.Renderer.__name__ = ["robotlegs","bender","extensions","stage3D","base","impl","Renderer"];
robotlegs.bender.extensions.stage3D.base.impl.Renderer.__interfaces__ = [robotlegs.bender.extensions.stage3D.base.api.IRenderer];
robotlegs.bender.extensions.stage3D.base.impl.Renderer.prototype = {
	_injector: null
	,_logger: null
	,_onReady: null
	,contextView: null
	,viewport: null
	,layers: null
	,_profile: null
	,freeFreeStage3DIndex: null
	,_stage3D: null
	,onReady: null
	,stage3D: null
	,profile: null
	,Renderer: function(context) {
		this._injector = context.get_injector();
		this._logger = context.getLogger(this);
	}
	,init: function(profile,antiAlias) {
		if(antiAlias == null) antiAlias = 0;
		this._profile = profile;
		this._onReady.dispatch();
		this._stage3D = this.contextView.view.stage.stage3Ds.data[this.freeFreeStage3DIndex];
		this.get_stage3D().addEventListener(openfl.events.Event.CONTEXT3D_CREATE,$bind(this,this.contextCreatedHandler));
		var renderMode = openfl.display3D.Context3DRenderMode.AUTO;
		this.get_stage3D().requestContext3D(Std.string(renderMode));
		this.freeFreeStage3DIndex++;
	}
	,contextCreatedHandler: function(e) {
		this.get_stage3D().context3D.configureBackBuffer(this.contextView.view.stage.stageWidth,this.contextView.view.stage.stageHeight,0,true);
		this._onReady.dispatch();
		this.viewport.init();
		this.viewport.get_onChange().add($bind(this,this.OnViewportChange));
		this.viewport.get_rect().setTo(0,0,this.contextView.view.stage.stageWidth,this.contextView.view.stage.stageHeight);
	}
	,OnViewportChange: function() {
		this.get_stage3D().x = this.viewport.get_rect().x;
		this.get_stage3D().y = this.viewport.get_rect().y;
		if(this.get_stage3D().context3D != null) this.get_stage3D().context3D.configureBackBuffer(js.Boot.__cast(this.viewport.get_rect().width , Int),js.Boot.__cast(this.viewport.get_rect().height , Int),0,true);
		var _g1 = 0;
		var _g = this.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.layers[i].set_rect(this.viewport.get_rect());
		}
	}
	,start: function() {
		this.contextView.view.stage.addEventListener(openfl.events.Event.ENTER_FRAME,$bind(this,this.Update));
	}
	,stop: function() {
		this.contextView.view.stage.removeEventListener(openfl.events.Event.ENTER_FRAME,$bind(this,this.Update));
	}
	,addLayer: function(layer) {
		this.layers.push(layer);
	}
	,addLayerAt: function(layer,index) {
		if(this.layers.length < index) {
			haxe.Log.trace("[Renderer, addLayerAt], index outside bounds, reverting to addLayer",{ fileName : "Renderer.hx", lineNumber : 112, className : "robotlegs.bender.extensions.stage3D.base.impl.Renderer", methodName : "addLayerAt"});
			this.addLayer(layer);
			return;
		}
		var copyLayers = this.layers.slice();
		this.layers = new Array();
		var _g1 = 0;
		var _g = copyLayers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(i == index) this.layers.push(layer);
			this.layers.push(copyLayers[i]);
		}
	}
	,removeLayer: function(layer) {
		var _g1 = 0;
		var _g = this.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.layers[i] == layer) this.layers.splice(i,1);
		}
	}
	,render: function() {
		this.Update(null);
	}
	,Update: function(e) {
		if(this.layers.length == 0) return;
		if(this._stage3D == null) return;
		if(this._stage3D.context3D == null) return;
		this.get_stage3D().context3D.clear();
		var _g1 = 0;
		var _g = this.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.layers[i].process();
		}
		this.get_stage3D().context3D.present();
	}
	,get_onReady: function() {
		return this._onReady;
	}
	,get_stage3D: function() {
		return this._stage3D;
	}
	,get_profile: function() {
		return this._profile;
	}
	,__class__: robotlegs.bender.extensions.stage3D.base.impl.Renderer
	,__properties__: {get_profile:"get_profile",get_stage3D:"get_stage3D",get_onReady:"get_onReady"}
};
robotlegs.bender.extensions.stage3D.base.impl.Stack = function(context) {
	this.initialized = false;
	this._debug = false;
	this.context = context;
	this._injector = context.get_injector();
	this._logger = context.getLogger(this);
	this.classIDs = new Array();
	this.classIDs.push(["robotlegs.bender.extensions.stage3D.alternativa3d.impl","AlternativaLayer"]);
	this.classIDs.push(["robotlegs.bender.extensions.stage3D.away3d.impl","AwayLayer"]);
	this.classIDs.push(["robotlegs.bender.extensions.stage3D.flare3d.impl","FlareLayer"]);
	this.classIDs.push(["robotlegs.bender.extensions.stage3D.genome.impl","GenomeLayer"]);
	this.classIDs.push(["robotlegs.bender.extensions.stage3D.starling.impl","StarlingLayer"]);
	this.classIDs.push(["robotlegs.bender.extensions.stage3D.zest3d.impl","ZestLayer"]);
};
$hxClasses["robotlegs.bender.extensions.stage3D.base.impl.Stack"] = robotlegs.bender.extensions.stage3D.base.impl.Stack;
robotlegs.bender.extensions.stage3D.base.impl.Stack.__name__ = ["robotlegs","bender","extensions","stage3D","base","impl","Stack"];
robotlegs.bender.extensions.stage3D.base.impl.Stack.__interfaces__ = [robotlegs.bender.extensions.stage3D.base.api.IStack];
robotlegs.bender.extensions.stage3D.base.impl.Stack.prototype = {
	_injector: null
	,_logger: null
	,context: null
	,_debug: null
	,classIDs: null
	,initialized: null
	,contextView: null
	,renderer: null
	,away3DInitializerAvailable: null
	,alternativa3DInitializer: null
	,away3DInitializer: null
	,flare3DInitializer: null
	,genomeInitializer: null
	,starlingInitializer: null
	,zest3DInitializer: null
	,initialize: function() {
		if(this.initialized) return;
		this.initialized = true;
		this.away3DInitializer = this.createInitializer("robotlegs.bender.extensions.stage3D.away3d.impl.Away3DInitializer");
	}
	,createInitializer: function(classAlias) {
		var initializer;
		try {
			var InitializerClass = Type.resolveClass(classAlias);
			if(InitializerClass != null) {
				initializer = org.swiftsuspenders.utils.CallProxy.createInstance(InitializerClass,[]);
				initializer.init(this.renderer,this.contextView,this.context);
				return initializer;
			}
		} catch( e ) {
			if( js.Boot.__instanceof(e,openfl.errors.Error) ) {
				haxe.Log.trace(e,{ fileName : "Stack.hx", lineNumber : 96, className : "robotlegs.bender.extensions.stage3D.base.impl.Stack", methodName : "createInitializer"});
			} else throw(e);
		}
		return null;
	}
	,addLayer: function(LayerClass,id) {
		if(id == null) id = "";
		this.addLayerAt(LayerClass,-1,id);
	}
	,addLayerAt: function(LayerClass,index,id) {
		if(id == null) id = "";
		this.initialize();
		this.addAway3DAt(LayerClass,index,id);
	}
	,addAway3DAt: function(AwayClass,index,id) {
		if(id == null) id = "";
		if(this.away3DInitializerAvailable == null) {
			throw new openfl.errors.Error(this.errorMsg(1));
			return;
		}
		this.away3DInitializer.addLayer(AwayClass,index,id);
	}
	,get_debug: function() {
		return this._debug;
	}
	,set_debug: function(value) {
		this._debug = value;
		this.away3DInitializer.set_debug(value);
		return value;
	}
	,errorMsg: function(index) {
		return "[" + this.classIDs[index][0] + "] needs to be installed before this method can be called, eg: context.install(" + this.classIDs[index][1] + ");";
	}
	,__class__: robotlegs.bender.extensions.stage3D.base.impl.Stack
	,__properties__: {set_debug:"set_debug",get_debug:"get_debug"}
};
robotlegs.bender.extensions.stage3D.base.impl.Viewport = function() {
	this._onChange = new msignal.Signal0();
	this.lastRect = new openfl.geom.Rectangle();
	this._rect = new openfl.geom.Rectangle();
};
$hxClasses["robotlegs.bender.extensions.stage3D.base.impl.Viewport"] = robotlegs.bender.extensions.stage3D.base.impl.Viewport;
robotlegs.bender.extensions.stage3D.base.impl.Viewport.__name__ = ["robotlegs","bender","extensions","stage3D","base","impl","Viewport"];
robotlegs.bender.extensions.stage3D.base.impl.Viewport.__interfaces__ = [robotlegs.bender.extensions.stage3D.base.api.IViewport];
robotlegs.bender.extensions.stage3D.base.impl.Viewport.prototype = {
	_injector: null
	,_logger: null
	,contextView: null
	,_rect: null
	,lastRect: null
	,_onChange: null
	,onChange: null
	,Viewport: function(context) {
		this._injector = context.get_injector();
		this._logger = context.getLogger(this);
	}
	,init: function() {
		this.contextView.view.stage.addEventListener(openfl.events.Event.ENTER_FRAME,$bind(this,this.CheckForChange));
	}
	,CheckForChange: function(e) {
		if(this._rect.x != this.lastRect.x) this.get_onChange().dispatch(); else if(this._rect.y != this.lastRect.y) this.get_onChange().dispatch(); else if(this._rect.width != this.lastRect.width) this.get_onChange().dispatch(); else if(this._rect.height != this.lastRect.height) this.get_onChange().dispatch();
		this.lastRect.setTo(this._rect.x,this._rect.y,this._rect.width,this._rect.height);
	}
	,get_rect: function() {
		return this._rect;
	}
	,set_rect: function(value) {
		this._rect = value;
		return value;
	}
	,get_onChange: function() {
		return this._onChange;
	}
	,__class__: robotlegs.bender.extensions.stage3D.base.impl.Viewport
	,__properties__: {get_onChange:"get_onChange",set_rect:"set_rect",get_rect:"get_rect"}
};
robotlegs.bender.extensions.viewManager.ManualStageObserverExtension = function() { };
$hxClasses["robotlegs.bender.extensions.viewManager.ManualStageObserverExtension"] = robotlegs.bender.extensions.viewManager.ManualStageObserverExtension;
robotlegs.bender.extensions.viewManager.ManualStageObserverExtension.__name__ = ["robotlegs","bender","extensions","viewManager","ManualStageObserverExtension"];
robotlegs.bender.extensions.viewManager.ManualStageObserverExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.viewManager.ManualStageObserverExtension._manualStageObserver = null;
robotlegs.bender.extensions.viewManager.ManualStageObserverExtension._installCount = null;
robotlegs.bender.extensions.viewManager.ManualStageObserverExtension.prototype = {
	_injector: null
	,_logger: null
	,extend: function(context) {
		context.whenInitializing($bind(this,this.whenInitializing));
		context.whenDestroying($bind(this,this.whenDestroying));
		robotlegs.bender.extensions.viewManager.ManualStageObserverExtension._installCount++;
		this._injector = context.get_injector();
		this._logger = context.getLogger(this);
	}
	,whenInitializing: function() {
		if(robotlegs.bender.extensions.viewManager.ManualStageObserverExtension._manualStageObserver == null) {
			var containerRegistry = this._injector.getInstance(robotlegs.bender.extensions.viewManager.impl.ContainerRegistry);
			this._logger.debug("Creating genuine ManualStageObserver Singleton");
			robotlegs.bender.extensions.viewManager.ManualStageObserverExtension._manualStageObserver = new robotlegs.bender.extensions.viewManager.impl.ManualStageObserver(containerRegistry);
		}
	}
	,whenDestroying: function() {
		robotlegs.bender.extensions.viewManager.ManualStageObserverExtension._installCount--;
		if((function($this) {
			var $r;
			var $int = robotlegs.bender.extensions.viewManager.ManualStageObserverExtension._installCount;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)) == 0) {
			this._logger.debug("Destroying genuine ManualStageObserver Singleton");
			robotlegs.bender.extensions.viewManager.ManualStageObserverExtension._manualStageObserver.destroy();
			robotlegs.bender.extensions.viewManager.ManualStageObserverExtension._manualStageObserver = null;
		}
	}
	,__class__: robotlegs.bender.extensions.viewManager.ManualStageObserverExtension
};
robotlegs.bender.extensions.viewManager.StageCrawlerExtension = function() { };
$hxClasses["robotlegs.bender.extensions.viewManager.StageCrawlerExtension"] = robotlegs.bender.extensions.viewManager.StageCrawlerExtension;
robotlegs.bender.extensions.viewManager.StageCrawlerExtension.__name__ = ["robotlegs","bender","extensions","viewManager","StageCrawlerExtension"];
robotlegs.bender.extensions.viewManager.StageCrawlerExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.viewManager.StageCrawlerExtension.prototype = {
	_logger: null
	,_injector: null
	,_containerRegistry: null
	,extend: function(context) {
		this._injector = context.get_injector();
		this._logger = context.getLogger(this);
		context.afterInitializing($bind(this,this.afterInitializing));
	}
	,afterInitializing: function() {
		this._containerRegistry = this._injector.getInstance(robotlegs.bender.extensions.viewManager.impl.ContainerRegistry);
		if(this._injector.hasDirectMapping(robotlegs.bender.extensions.viewManager.api.IViewManager)) this.scanViewManagedContainers(); else this.scanContextView();
	}
	,scanViewManagedContainers: function() {
		this._logger.debug("ViewManager is installed. Checking for managed containers...");
		var viewManager = this._injector.getInstance(robotlegs.bender.extensions.viewManager.api.IViewManager);
		var _g = 0;
		var _g1 = viewManager.get_containers();
		while(_g < _g1.length) {
			var container = _g1[_g];
			++_g;
			if(container.stage != null) this.scanContainer(container);
		}
	}
	,scanContextView: function() {
		this._logger.debug("ViewManager is not installed. Checking the ContextView...");
		var contextView = this._injector.getInstance(robotlegs.bender.extensions.contextView.ContextView);
		if(contextView.view.stage != null) this.scanContainer(contextView.view);
	}
	,scanContainer: function(container) {
		var binding = this._containerRegistry.getBinding(container);
		this._logger.debug("StageCrawler scanning container {0} ...",[container]);
		new robotlegs.bender.extensions.viewManager.impl.StageCrawler(binding).scan(container);
		this._logger.debug("StageCrawler finished scanning {0}",[container]);
	}
	,__class__: robotlegs.bender.extensions.viewManager.StageCrawlerExtension
};
robotlegs.bender.extensions.viewManager.StageObserverExtension = function() { };
$hxClasses["robotlegs.bender.extensions.viewManager.StageObserverExtension"] = robotlegs.bender.extensions.viewManager.StageObserverExtension;
robotlegs.bender.extensions.viewManager.StageObserverExtension.__name__ = ["robotlegs","bender","extensions","viewManager","StageObserverExtension"];
robotlegs.bender.extensions.viewManager.StageObserverExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.viewManager.StageObserverExtension._stageObserver = null;
robotlegs.bender.extensions.viewManager.StageObserverExtension._installCount = null;
robotlegs.bender.extensions.viewManager.StageObserverExtension.prototype = {
	_injector: null
	,_logger: null
	,extend: function(context) {
		context.whenInitializing($bind(this,this.whenInitializing));
		context.whenDestroying($bind(this,this.whenDestroying));
		robotlegs.bender.extensions.viewManager.StageObserverExtension._installCount++;
		this._injector = context.get_injector();
		this._logger = context.getLogger(this);
	}
	,whenInitializing: function() {
		if(robotlegs.bender.extensions.viewManager.StageObserverExtension._stageObserver == null) {
			var containerRegistry = this._injector.getInstance(robotlegs.bender.extensions.viewManager.impl.ContainerRegistry);
			this._logger.debug("Creating genuine StageObserver Singleton");
			robotlegs.bender.extensions.viewManager.StageObserverExtension._stageObserver = new robotlegs.bender.extensions.viewManager.impl.StageObserver(containerRegistry);
		}
	}
	,whenDestroying: function() {
		robotlegs.bender.extensions.viewManager.StageObserverExtension._installCount--;
		if((function($this) {
			var $r;
			var $int = robotlegs.bender.extensions.viewManager.StageObserverExtension._installCount;
			$r = $int < 0?4294967296.0 + $int:$int + 0.0;
			return $r;
		}(this)) == 0) {
			this._logger.debug("Destroying genuine StageObserver Singleton");
			robotlegs.bender.extensions.viewManager.StageObserverExtension._stageObserver.destroy();
			robotlegs.bender.extensions.viewManager.StageObserverExtension._stageObserver = null;
		}
	}
	,__class__: robotlegs.bender.extensions.viewManager.StageObserverExtension
};
robotlegs.bender.extensions.viewManager.ViewManagerExtension = function() { };
$hxClasses["robotlegs.bender.extensions.viewManager.ViewManagerExtension"] = robotlegs.bender.extensions.viewManager.ViewManagerExtension;
robotlegs.bender.extensions.viewManager.ViewManagerExtension.__name__ = ["robotlegs","bender","extensions","viewManager","ViewManagerExtension"];
robotlegs.bender.extensions.viewManager.ViewManagerExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.viewManager.ViewManagerExtension._containerRegistry = null;
robotlegs.bender.extensions.viewManager.ViewManagerExtension.prototype = {
	_injector: null
	,_viewManager: null
	,extend: function(context) {
		context.whenInitializing($bind(this,this.whenInitializing));
		context.whenDestroying($bind(this,this.whenDestroying));
		this._injector = context.get_injector();
		if(robotlegs.bender.extensions.viewManager.ViewManagerExtension._containerRegistry == null) robotlegs.bender.extensions.viewManager.ViewManagerExtension._containerRegistry = new robotlegs.bender.extensions.viewManager.impl.ContainerRegistry();
		this._injector.map(robotlegs.bender.extensions.viewManager.impl.ContainerRegistry).toValue(robotlegs.bender.extensions.viewManager.ViewManagerExtension._containerRegistry);
		this._injector.map(robotlegs.bender.extensions.viewManager.api.IViewManager).toSingleton(robotlegs.bender.extensions.viewManager.impl.ViewManager);
	}
	,whenInitializing: function() {
		this._viewManager = this._injector.getInstance(robotlegs.bender.extensions.viewManager.api.IViewManager);
	}
	,whenDestroying: function() {
		this._viewManager.removeAllHandlers();
		this._injector.unmap(robotlegs.bender.extensions.viewManager.api.IViewManager);
		this._injector.unmap(robotlegs.bender.extensions.viewManager.impl.ContainerRegistry);
	}
	,__class__: robotlegs.bender.extensions.viewManager.ViewManagerExtension
};
robotlegs.bender.extensions.viewManager.api.IViewManager = function() { };
$hxClasses["robotlegs.bender.extensions.viewManager.api.IViewManager"] = robotlegs.bender.extensions.viewManager.api.IViewManager;
robotlegs.bender.extensions.viewManager.api.IViewManager.__name__ = ["robotlegs","bender","extensions","viewManager","api","IViewManager"];
robotlegs.bender.extensions.viewManager.api.IViewManager.__interfaces__ = [openfl.events.IEventDispatcher];
robotlegs.bender.extensions.viewManager.api.IViewManager.prototype = {
	containers: null
	,addContainer: null
	,addViewHandler: null
	,removeViewHandler: null
	,removeAllHandlers: null
	,__class__: robotlegs.bender.extensions.viewManager.api.IViewManager
};
robotlegs.bender.extensions.viewManager.impl = {};
robotlegs.bender.extensions.viewManager.impl.ConfigureViewEvent = function(type,view) {
	openfl.events.Event.call(this,type,true,true);
	this._view = view;
};
$hxClasses["robotlegs.bender.extensions.viewManager.impl.ConfigureViewEvent"] = robotlegs.bender.extensions.viewManager.impl.ConfigureViewEvent;
robotlegs.bender.extensions.viewManager.impl.ConfigureViewEvent.__name__ = ["robotlegs","bender","extensions","viewManager","impl","ConfigureViewEvent"];
robotlegs.bender.extensions.viewManager.impl.ConfigureViewEvent.__super__ = openfl.events.Event;
robotlegs.bender.extensions.viewManager.impl.ConfigureViewEvent.prototype = $extend(openfl.events.Event.prototype,{
	_view: null
	,view: null
	,clone: function() {
		return new robotlegs.bender.extensions.viewManager.impl.ConfigureViewEvent(this.type,this._view);
	}
	,__class__: robotlegs.bender.extensions.viewManager.impl.ConfigureViewEvent
});
robotlegs.bender.extensions.viewManager.impl.ContainerBinding = function(container) {
	this._handlers = new Array();
	this._container = container;
	openfl.events.EventDispatcher.call(this,null);
};
$hxClasses["robotlegs.bender.extensions.viewManager.impl.ContainerBinding"] = robotlegs.bender.extensions.viewManager.impl.ContainerBinding;
robotlegs.bender.extensions.viewManager.impl.ContainerBinding.__name__ = ["robotlegs","bender","extensions","viewManager","impl","ContainerBinding"];
robotlegs.bender.extensions.viewManager.impl.ContainerBinding.__super__ = openfl.events.EventDispatcher;
robotlegs.bender.extensions.viewManager.impl.ContainerBinding.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	_parent: null
	,get_parent: function() {
		return this._parent;
	}
	,set_parent: function(value) {
		this._parent = value;
		return this._parent;
	}
	,_container: null
	,container: null
	,get_container: function() {
		return this._container;
	}
	,_handlers: null
	,addHandler: function(handler) {
		if(HxOverrides.indexOf(this._handlers,handler,0) > -1) return;
		this._handlers.push(handler);
	}
	,removeHandler: function(handler) {
		var index = HxOverrides.indexOf(this._handlers,handler,0);
		if(index > -1) {
			this._handlers.splice(index,1);
			if(this._handlers.length == 0) this.dispatchEvent(new robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent(robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent.BINDING_EMPTY));
		}
	}
	,handleView: function(view,type) {
		var length = this._handlers.length;
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			var handler;
			handler = js.Boot.__cast(this._handlers[i] , robotlegs.bender.extensions.viewManager.api.IViewHandler);
			handler.handleView(view,type);
		}
	}
	,__class__: robotlegs.bender.extensions.viewManager.impl.ContainerBinding
	,__properties__: {get_container:"get_container",set_parent:"set_parent",get_parent:"get_parent"}
});
robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent = function(type) {
	openfl.events.Event.call(this,type);
};
$hxClasses["robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent"] = robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent;
robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent.__name__ = ["robotlegs","bender","extensions","viewManager","impl","ContainerBindingEvent"];
robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent.__super__ = openfl.events.Event;
robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent.prototype = $extend(openfl.events.Event.prototype,{
	clone: function() {
		return new robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent(this.type);
	}
	,__class__: robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent
});
robotlegs.bender.extensions.viewManager.impl.ContainerRegistry = function(target) {
	this._bindingByContainer = new haxe.ds.ObjectMap();
	this.rootBindings = new Array();
	this.bindings = new Array();
	openfl.events.EventDispatcher.call(this,target);
};
$hxClasses["robotlegs.bender.extensions.viewManager.impl.ContainerRegistry"] = robotlegs.bender.extensions.viewManager.impl.ContainerRegistry;
robotlegs.bender.extensions.viewManager.impl.ContainerRegistry.__name__ = ["robotlegs","bender","extensions","viewManager","impl","ContainerRegistry"];
robotlegs.bender.extensions.viewManager.impl.ContainerRegistry.__super__ = openfl.events.EventDispatcher;
robotlegs.bender.extensions.viewManager.impl.ContainerRegistry.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	bindings: null
	,get_bindings: function() {
		return this.bindings;
	}
	,rootBindings: null
	,get_rootBindings: function() {
		return this.rootBindings;
	}
	,_bindingByContainer: null
	,addContainer: function(container) {
		if(this._bindingByContainer.h[container.__id__] == null) {
			var v = this.createBinding(container);
			this._bindingByContainer.set(container,v);
			v;
		}
		return this._bindingByContainer.h[container.__id__];
	}
	,removeContainer: function(container) {
		var binding = this._bindingByContainer.h[container.__id__];
		if(binding != null) this.removeBinding(binding);
		return binding;
	}
	,findParentBinding: function(target) {
		var parent = target.parent;
		while(parent != null) {
			var binding = this._bindingByContainer.h[parent.__id__];
			if(binding != null) return binding;
			parent = parent.parent;
		}
		return null;
	}
	,getBinding: function(container) {
		return this._bindingByContainer.h[container.__id__];
	}
	,createBinding: function(container) {
		var binding = new robotlegs.bender.extensions.viewManager.impl.ContainerBinding(container);
		this.get_bindings().push(binding);
		binding.addEventListener(robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent.BINDING_EMPTY,$bind(this,this.onBindingEmpty));
		binding.set_parent(this.findParentBinding(container));
		if(binding.get_parent() == null) this.addRootBinding(binding);
		var $it0 = this._bindingByContainer.iterator();
		while( $it0.hasNext() ) {
			var childBinding = $it0.next();
			if(container.contains(childBinding.container)) {
				if(childBinding.parent == null) {
					this.removeRootBinding(js.Boot.__cast(childBinding , robotlegs.bender.extensions.viewManager.impl.ContainerBinding));
					childBinding.parent = binding;
				} else if(container.contains(childBinding.parent.get_container())) childBinding.parent = binding;
			}
		}
		this.dispatchEvent(new robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent(robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.CONTAINER_ADD,binding.get_container()));
		return binding;
	}
	,removeBinding: function(binding) {
		var key = binding.get_container();
		this._bindingByContainer.remove(key);
		var index;
		var _this = this.get_bindings();
		index = HxOverrides.indexOf(_this,binding,0);
		this.get_bindings().splice(index,1);
		binding.removeEventListener(robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent.BINDING_EMPTY,$bind(this,this.onBindingEmpty));
		if(binding.get_parent() == null) this.removeRootBinding(binding);
		var $it0 = this._bindingByContainer.iterator();
		while( $it0.hasNext() ) {
			var childBinding = $it0.next();
			if(childBinding.parent == binding) {
				childBinding.parent = binding.get_parent();
				if(childBinding.parent == null) this.addRootBinding(js.Boot.__cast(childBinding , robotlegs.bender.extensions.viewManager.impl.ContainerBinding));
			}
		}
		this.dispatchEvent(new robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent(robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.CONTAINER_REMOVE,binding.get_container()));
	}
	,addRootBinding: function(binding) {
		this.get_rootBindings().push(binding);
		this.dispatchEvent(new robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent(robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.ROOT_CONTAINER_ADD,binding.get_container()));
	}
	,removeRootBinding: function(binding) {
		var index;
		var _this = this.get_rootBindings();
		index = HxOverrides.indexOf(_this,binding,0);
		this.get_rootBindings().splice(index,1);
		this.dispatchEvent(new robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent(robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.ROOT_CONTAINER_REMOVE,binding.get_container()));
	}
	,onBindingEmpty: function(event) {
		this.removeBinding(js.Boot.__cast(event.target , robotlegs.bender.extensions.viewManager.impl.ContainerBinding));
	}
	,__class__: robotlegs.bender.extensions.viewManager.impl.ContainerRegistry
	,__properties__: {get_rootBindings:"get_rootBindings",get_bindings:"get_bindings"}
});
robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent = function(type,container) {
	openfl.events.Event.call(this,type);
	this.container = container;
};
$hxClasses["robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent"] = robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent;
robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.__name__ = ["robotlegs","bender","extensions","viewManager","impl","ContainerRegistryEvent"];
robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.__super__ = openfl.events.Event;
robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.prototype = $extend(openfl.events.Event.prototype,{
	container: null
	,clone: function() {
		return new robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent(this.type,this.container);
	}
	,__class__: robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent
});
robotlegs.bender.extensions.viewManager.impl.ManualStageObserver = function(containerRegistry) {
	this._registry = containerRegistry;
	this._registry.addEventListener(robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.CONTAINER_ADD,$bind(this,this.onContainerAdd));
	this._registry.addEventListener(robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.CONTAINER_REMOVE,$bind(this,this.onContainerRemove));
	var _g = 0;
	var _g1 = this._registry.get_bindings();
	while(_g < _g1.length) {
		var binding = _g1[_g];
		++_g;
		this.addContainerListener(binding.get_container());
	}
};
$hxClasses["robotlegs.bender.extensions.viewManager.impl.ManualStageObserver"] = robotlegs.bender.extensions.viewManager.impl.ManualStageObserver;
robotlegs.bender.extensions.viewManager.impl.ManualStageObserver.__name__ = ["robotlegs","bender","extensions","viewManager","impl","ManualStageObserver"];
robotlegs.bender.extensions.viewManager.impl.ManualStageObserver.prototype = {
	_registry: null
	,destroy: function() {
		this._registry.removeEventListener(robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.CONTAINER_ADD,$bind(this,this.onContainerAdd));
		this._registry.removeEventListener(robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.CONTAINER_REMOVE,$bind(this,this.onContainerRemove));
		var _g = 0;
		var _g1 = this._registry.get_bindings();
		while(_g < _g1.length) {
			var binding = _g1[_g];
			++_g;
			this.removeContainerListener(binding.get_container());
		}
	}
	,onContainerAdd: function(event) {
		this.addContainerListener(event.container);
	}
	,onContainerRemove: function(event) {
		this.removeContainerListener(event.container);
	}
	,addContainerListener: function(container) {
		container.addEventListener(robotlegs.bender.extensions.viewManager.impl.ConfigureViewEvent.CONFIGURE_VIEW,$bind(this,this.onConfigureView));
	}
	,removeContainerListener: function(container) {
		container.removeEventListener(robotlegs.bender.extensions.viewManager.impl.ConfigureViewEvent.CONFIGURE_VIEW,$bind(this,this.onConfigureView));
	}
	,onConfigureView: function(event) {
		event.stopImmediatePropagation();
		var container;
		container = js.Boot.__cast(event.currentTarget , openfl.display.DisplayObjectContainer);
		var view;
		view = js.Boot.__cast(event.target , openfl.display.DisplayObject);
		var type = Type.getClass(view);
		this._registry.getBinding(container).handleView(view,type);
	}
	,__class__: robotlegs.bender.extensions.viewManager.impl.ManualStageObserver
};
robotlegs.bender.extensions.viewManager.impl.StageCrawler = function(containerBinding) {
	this._binding = containerBinding;
};
$hxClasses["robotlegs.bender.extensions.viewManager.impl.StageCrawler"] = robotlegs.bender.extensions.viewManager.impl.StageCrawler;
robotlegs.bender.extensions.viewManager.impl.StageCrawler.__name__ = ["robotlegs","bender","extensions","viewManager","impl","StageCrawler"];
robotlegs.bender.extensions.viewManager.impl.StageCrawler.prototype = {
	_binding: null
	,scan: function(view) {
		this.scanContainer(view);
	}
	,scanContainer: function(container) {
		this.processView(container);
		var numChildren = container.get_numChildren();
		var _g = 0;
		while(_g < numChildren) {
			var i = _g++;
			var child = container.getChildAt(i);
			if(js.Boot.__instanceof(child,openfl.display.DisplayObjectContainer)) this.scanContainer(js.Boot.__cast(child , openfl.display.DisplayObjectContainer)); else this.processView(child);
		}
	}
	,processView: function(view) {
		this._binding.handleView(view,Type.getClass(view));
	}
	,__class__: robotlegs.bender.extensions.viewManager.impl.StageCrawler
};
robotlegs.bender.extensions.viewManager.impl.StageObserver = function(containerRegistry) {
	this._filter = new EReg("^mx\\.|^spark\\.|^flash\\.","");
	this._registry = containerRegistry;
	this._registry.addEventListener(robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.ROOT_CONTAINER_ADD,$bind(this,this.onRootContainerAdd));
	this._registry.addEventListener(robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.ROOT_CONTAINER_REMOVE,$bind(this,this.onRootContainerRemove));
	var _g = 0;
	var _g1 = this._registry.get_rootBindings();
	while(_g < _g1.length) {
		var binding = _g1[_g];
		++_g;
		this.addRootListener(binding.get_container());
	}
};
$hxClasses["robotlegs.bender.extensions.viewManager.impl.StageObserver"] = robotlegs.bender.extensions.viewManager.impl.StageObserver;
robotlegs.bender.extensions.viewManager.impl.StageObserver.__name__ = ["robotlegs","bender","extensions","viewManager","impl","StageObserver"];
robotlegs.bender.extensions.viewManager.impl.StageObserver.prototype = {
	_filter: null
	,_registry: null
	,destroy: function() {
		this._registry.removeEventListener(robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.ROOT_CONTAINER_ADD,$bind(this,this.onRootContainerAdd));
		this._registry.removeEventListener(robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.ROOT_CONTAINER_REMOVE,$bind(this,this.onRootContainerRemove));
		var _g = 0;
		var _g1 = this._registry.get_rootBindings();
		while(_g < _g1.length) {
			var binding = _g1[_g];
			++_g;
			this.removeRootListener(binding.get_container());
		}
	}
	,onRootContainerAdd: function(event) {
		this.addRootListener(event.container);
	}
	,onRootContainerRemove: function(event) {
		this.removeRootListener(event.container);
	}
	,addRootListener: function(container) {
		container.addEventListener(openfl.events.Event.ADDED_TO_STAGE,$bind(this,this.onViewAddedToStage),true);
		container.addEventListener(openfl.events.Event.ADDED_TO_STAGE,$bind(this,this.onContainerRootAddedToStage));
	}
	,removeRootListener: function(container) {
		container.removeEventListener(openfl.events.Event.ADDED_TO_STAGE,$bind(this,this.onViewAddedToStage),true);
		container.removeEventListener(openfl.events.Event.ADDED_TO_STAGE,$bind(this,this.onContainerRootAddedToStage));
	}
	,onViewAddedToStage: function(event) {
		var view;
		view = js.Boot.__cast(event.target , openfl.display.DisplayObject);
		var qcn = org.swiftsuspenders.utils.CallProxy.replaceClassName(Type.getClass(view));
		var filtered = this._filter.match(qcn);
		if(filtered) return;
		var type = Type.getClass(view);
		var binding = this._registry.findParentBinding(view);
		while(binding != null) {
			binding.handleView(view,type);
			binding = binding.get_parent();
		}
	}
	,onContainerRootAddedToStage: function(event) {
		var container;
		container = js.Boot.__cast(event.target , openfl.display.DisplayObjectContainer);
		container.removeEventListener(openfl.events.Event.ADDED_TO_STAGE,$bind(this,this.onContainerRootAddedToStage));
		var type = Type.getClass(container);
		var binding = this._registry.getBinding(container);
		binding.handleView(container,type);
	}
	,__class__: robotlegs.bender.extensions.viewManager.impl.StageObserver
};
robotlegs.bender.extensions.viewManager.impl.ViewManager = function(containerRegistry) {
	this._handlers = new Array();
	this.containers = new Array();
	this._registry = containerRegistry;
	openfl.events.EventDispatcher.call(this);
};
$hxClasses["robotlegs.bender.extensions.viewManager.impl.ViewManager"] = robotlegs.bender.extensions.viewManager.impl.ViewManager;
robotlegs.bender.extensions.viewManager.impl.ViewManager.__name__ = ["robotlegs","bender","extensions","viewManager","impl","ViewManager"];
robotlegs.bender.extensions.viewManager.impl.ViewManager.__interfaces__ = [robotlegs.bender.extensions.viewManager.api.IViewManager];
robotlegs.bender.extensions.viewManager.impl.ViewManager.__super__ = openfl.events.EventDispatcher;
robotlegs.bender.extensions.viewManager.impl.ViewManager.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	containers: null
	,get_containers: function() {
		return this.containers;
	}
	,_handlers: null
	,_registry: null
	,addContainer: function(container) {
		if(this.validContainer(container) == false) return;
		this.get_containers().push(container);
		var _g = 0;
		var _g1 = this._handlers;
		while(_g < _g1.length) {
			var handler = _g1[_g];
			++_g;
			this._registry.addContainer(container).addHandler(handler);
		}
		this.dispatchEvent(new robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent(robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.CONTAINER_ADD,container));
	}
	,removeContainer: function(container) {
		var index;
		var _this = this.get_containers();
		index = HxOverrides.indexOf(_this,container,0);
		if(index == -1) return;
		this.get_containers().splice(index,1);
		var binding = this._registry.getBinding(container);
		var _g = 0;
		var _g1 = this._handlers;
		while(_g < _g1.length) {
			var handler = _g1[_g];
			++_g;
			binding.removeHandler(handler);
		}
		this.dispatchEvent(new robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent(robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.CONTAINER_REMOVE,container));
	}
	,addViewHandler: function(handler) {
		if(HxOverrides.indexOf(this._handlers,handler,0) != -1) return;
		this._handlers.push(handler);
		var _g = 0;
		var _g1 = this.get_containers();
		while(_g < _g1.length) {
			var container = _g1[_g];
			++_g;
			this._registry.addContainer(container).addHandler(handler);
		}
		this.dispatchEvent(new robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent(robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.HANDLER_ADD,null,handler));
	}
	,removeViewHandler: function(handler) {
		var index = HxOverrides.indexOf(this._handlers,handler,0);
		if(index == -1) return;
		this._handlers.splice(index,1);
		var _g = 0;
		var _g1 = this.get_containers();
		while(_g < _g1.length) {
			var container = _g1[_g];
			++_g;
			this._registry.getBinding(container).removeHandler(handler);
		}
		this.dispatchEvent(new robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent(robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.HANDLER_REMOVE,null,handler));
	}
	,removeAllHandlers: function() {
		var _g = 0;
		var _g1 = this.get_containers();
		while(_g < _g1.length) {
			var container = _g1[_g];
			++_g;
			var binding = this._registry.getBinding(container);
			var _g2 = 0;
			var _g3 = this._handlers;
			while(_g2 < _g3.length) {
				var handler = _g3[_g2];
				++_g2;
				binding.removeHandler(handler);
			}
		}
	}
	,validContainer: function(container) {
		var _g = 0;
		var _g1 = this.get_containers();
		while(_g < _g1.length) {
			var registeredContainer = _g1[_g];
			++_g;
			if(container == registeredContainer) return false;
			if(registeredContainer.contains(container) || container.contains(registeredContainer)) throw new openfl.errors.Error("Containers can not be nested");
		}
		return true;
	}
	,__class__: robotlegs.bender.extensions.viewManager.impl.ViewManager
	,__properties__: {get_containers:"get_containers"}
});
robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent = function(type,container,handler) {
	openfl.events.Event.call(this,type);
	this.container = container;
	this.handler = handler;
};
$hxClasses["robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent"] = robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent;
robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.__name__ = ["robotlegs","bender","extensions","viewManager","impl","ViewManagerEvent"];
robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.__super__ = openfl.events.Event;
robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.prototype = $extend(openfl.events.Event.prototype,{
	container: null
	,handler: null
	,clone: function() {
		return new robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent(this.type,this.container,this.handler);
	}
	,__class__: robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent
});
robotlegs.bender.extensions.viewProcessorMap = {};
robotlegs.bender.extensions.viewProcessorMap.ViewProcessorMapExtension = function() { };
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.ViewProcessorMapExtension"] = robotlegs.bender.extensions.viewProcessorMap.ViewProcessorMapExtension;
robotlegs.bender.extensions.viewProcessorMap.ViewProcessorMapExtension.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","ViewProcessorMapExtension"];
robotlegs.bender.extensions.viewProcessorMap.ViewProcessorMapExtension.__interfaces__ = [robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.viewProcessorMap.ViewProcessorMapExtension.prototype = {
	_injector: null
	,_viewProcessorMap: null
	,_viewManager: null
	,_viewProcessorFactory: null
	,extend: function(context) {
		context.beforeInitializing($bind(this,this.beforeInitializing));
		context.beforeDestroying($bind(this,this.beforeDestroying));
		context.whenDestroying($bind(this,this.whenDestroying));
		this._injector = context.get_injector();
		this._injector.map(robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorFactory).toValue(new robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactory(this._injector.createChild()));
		this._injector.map(robotlegs.bender.extensions.viewProcessorMap.api.IViewProcessorMap).toSingleton(robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMap);
	}
	,beforeInitializing: function() {
		this._viewProcessorMap = this._injector.getInstance(robotlegs.bender.extensions.viewProcessorMap.api.IViewProcessorMap);
		this._viewProcessorFactory = this._injector.getInstance(robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorFactory);
		if(this._injector.satisfiesDirectly(robotlegs.bender.extensions.viewManager.api.IViewManager)) {
			this._viewManager = this._injector.getInstance(robotlegs.bender.extensions.viewManager.api.IViewManager);
			this._viewManager.addViewHandler(js.Boot.__cast(this._viewProcessorMap , robotlegs.bender.extensions.viewManager.api.IViewHandler));
		}
	}
	,beforeDestroying: function() {
		this._viewProcessorFactory.runAllUnprocessors();
		if(this._injector.satisfiesDirectly(robotlegs.bender.extensions.viewManager.api.IViewManager)) {
			this._viewManager = this._injector.getInstance(robotlegs.bender.extensions.viewManager.api.IViewManager);
			this._viewManager.removeViewHandler(js.Boot.__cast(this._viewProcessorMap , robotlegs.bender.extensions.viewManager.api.IViewHandler));
		}
	}
	,whenDestroying: function() {
		if(this._injector.satisfiesDirectly(robotlegs.bender.extensions.viewProcessorMap.api.IViewProcessorMap)) this._injector.unmap(robotlegs.bender.extensions.viewProcessorMap.api.IViewProcessorMap);
		if(this._injector.satisfiesDirectly(robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorFactory)) this._injector.unmap(robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorFactory);
	}
	,__class__: robotlegs.bender.extensions.viewProcessorMap.ViewProcessorMapExtension
};
robotlegs.bender.extensions.viewProcessorMap.api = {};
robotlegs.bender.extensions.viewProcessorMap.api.IViewProcessorMap = function() { };
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.api.IViewProcessorMap"] = robotlegs.bender.extensions.viewProcessorMap.api.IViewProcessorMap;
robotlegs.bender.extensions.viewProcessorMap.api.IViewProcessorMap.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","api","IViewProcessorMap"];
robotlegs.bender.extensions.viewProcessorMap.api.ViewProcessorMapError = function(message) {
	openfl.errors.Error.call(this,message);
};
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.api.ViewProcessorMapError"] = robotlegs.bender.extensions.viewProcessorMap.api.ViewProcessorMapError;
robotlegs.bender.extensions.viewProcessorMap.api.ViewProcessorMapError.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","api","ViewProcessorMapError"];
robotlegs.bender.extensions.viewProcessorMap.api.ViewProcessorMapError.__super__ = openfl.errors.Error;
robotlegs.bender.extensions.viewProcessorMap.api.ViewProcessorMapError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: robotlegs.bender.extensions.viewProcessorMap.api.ViewProcessorMapError
});
robotlegs.bender.extensions.viewProcessorMap.dsl = {};
robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapper = function() { };
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapper"] = robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapper;
robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapper.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","dsl","IViewProcessorMapper"];
robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapping = function() { };
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapping"] = robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapping;
robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapping.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","dsl","IViewProcessorMapping"];
robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapping.prototype = {
	processorClass: null
	,guards: null
	,hooks: null
	,__class__: robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapping
};
robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMappingConfig = function() { };
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMappingConfig"] = robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMappingConfig;
robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMappingConfig.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","dsl","IViewProcessorMappingConfig"];
robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorUnmapper = function() { };
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorUnmapper"] = robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorUnmapper;
robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorUnmapper.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","dsl","IViewProcessorUnmapper"];
robotlegs.bender.extensions.viewProcessorMap.impl = {};
robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorFactory = function() { };
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorFactory"] = robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorFactory;
robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorFactory.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","impl","IViewProcessorFactory"];
robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorFactory.prototype = {
	runProcessors: null
	,runUnprocessors: null
	,runAllUnprocessors: null
	,__class__: robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorFactory
};
robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorViewHandler = function() { };
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorViewHandler"] = robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorViewHandler;
robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorViewHandler.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","impl","IViewProcessorViewHandler"];
robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorViewHandler.prototype = {
	addMapping: null
	,removeMapping: null
	,processItem: null
	,unprocessItem: null
	,__class__: robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorViewHandler
};
robotlegs.bender.extensions.viewProcessorMap.impl.NullProcessor = function() { };
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.impl.NullProcessor"] = robotlegs.bender.extensions.viewProcessorMap.impl.NullProcessor;
robotlegs.bender.extensions.viewProcessorMap.impl.NullProcessor.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","impl","NullProcessor"];
robotlegs.bender.extensions.viewProcessorMap.impl.NullProcessor.prototype = {
	process: function(view,type,injector) {
	}
	,unprocess: function(view,type,injector) {
	}
	,__class__: robotlegs.bender.extensions.viewProcessorMap.impl.NullProcessor
};
robotlegs.bender.extensions.viewProcessorMap.impl.NullViewProcessorUnmapper = function() {
};
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.impl.NullViewProcessorUnmapper"] = robotlegs.bender.extensions.viewProcessorMap.impl.NullViewProcessorUnmapper;
robotlegs.bender.extensions.viewProcessorMap.impl.NullViewProcessorUnmapper.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","impl","NullViewProcessorUnmapper"];
robotlegs.bender.extensions.viewProcessorMap.impl.NullViewProcessorUnmapper.__interfaces__ = [robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorUnmapper];
robotlegs.bender.extensions.viewProcessorMap.impl.NullViewProcessorUnmapper.prototype = {
	fromProcess: function(processorClassOrInstance) {
	}
	,fromAll: function() {
	}
	,fromNoProcess: function() {
	}
	,fromInjection: function() {
	}
	,__class__: robotlegs.bender.extensions.viewProcessorMap.impl.NullViewProcessorUnmapper
};
robotlegs.bender.extensions.viewProcessorMap.impl.ViewInjectionProcessor = function() {
	this._injectedObjects = new haxe.ds.StringMap();
};
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.impl.ViewInjectionProcessor"] = robotlegs.bender.extensions.viewProcessorMap.impl.ViewInjectionProcessor;
robotlegs.bender.extensions.viewProcessorMap.impl.ViewInjectionProcessor.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","impl","ViewInjectionProcessor"];
robotlegs.bender.extensions.viewProcessorMap.impl.ViewInjectionProcessor.prototype = {
	_injectedObjects: null
	,process: function(view,type,injector) {
		if(!(function($this) {
			var $r;
			var key = org.swiftsuspenders.utils.UID.instanceID(view);
			$r = $this._injectedObjects.get(key);
			return $r;
		}(this))) this.injectAndRemember(view,injector);
	}
	,unprocess: function(view,type,injector) {
	}
	,injectAndRemember: function(view,injector) {
		injector.injectInto(view);
		var k = org.swiftsuspenders.utils.UID.instanceID(view);
		var v = view;
		this._injectedObjects.set(k,v);
		v;
	}
	,__class__: robotlegs.bender.extensions.viewProcessorMap.impl.ViewInjectionProcessor
};
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactory = function(injector) {
	this._listenersByView = new haxe.ds.StringMap();
	this._injector = injector;
};
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactory"] = robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactory;
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactory.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","impl","ViewProcessorFactory"];
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactory.__interfaces__ = [robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorFactory];
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactory.prototype = {
	_injector: null
	,_listenersByView: null
	,runProcessors: function(view,type,processorMappings) {
		this.createRemovedListener(view,type,processorMappings);
		var filter;
		var _g = 0;
		while(_g < processorMappings.length) {
			var mapping = processorMappings[_g];
			++_g;
			filter = mapping.matcher;
			this.mapTypeForFilterBinding(filter,type,view);
			this.runProcess(view,type,mapping);
			this.unmapTypeForFilterBinding(filter,type,view);
		}
	}
	,runUnprocessors: function(view,type,processorMappings) {
		var _g = 0;
		while(_g < processorMappings.length) {
			var mapping = processorMappings[_g];
			++_g;
			if(mapping.processor == null) mapping.processor = this.createProcessor(mapping.processorClass);
			mapping.processor.unprocess(view,type,this._injector);
		}
	}
	,runAllUnprocessors: function() {
		var $it0 = this._listenersByView.iterator();
		while( $it0.hasNext() ) {
			var removalHandlers = $it0.next();
			var removalHandlers2;
			removalHandlers2 = js.Boot.__cast(removalHandlers , Array);
			var iLength = removalHandlers2.length;
			var _g = 0;
			while(_g < iLength) {
				var i = _g++;
				if(Reflect.isFunction(removalHandlers2[i])) {
					var removalHandler = removalHandlers2[i];
					removalHandler(null);
				}
			}
		}
	}
	,runProcess: function(view,type,mapping) {
		if(robotlegs.bender.framework.impl.GuardsApprove.call(mapping.get_guards(),this._injector)) {
			if(mapping.get_processor() == null) mapping.set_processor(this.createProcessor(mapping.get_processorClass()));
			robotlegs.bender.framework.impl.ApplyHooks.call(mapping.get_hooks(),this._injector);
			mapping.get_processor().process(view,type,this._injector);
		}
	}
	,createProcessor: function(processorClass) {
		if(this._injector.hasMapping(processorClass)) this._injector.map(processorClass).asSingleton();
		try {
			return this._injector.getInstance(processorClass);
		} catch( error ) {
			if( js.Boot.__instanceof(error,org.swiftsuspenders.errors.InjectorInterfaceConstructionError) ) {
				var errorMsg = "The view processor " + Std.string(processorClass) + " has not been mapped in the injector, " + "and it is not possible to instantiate an interface. " + "Please map a concrete type against this interface.";
				throw new robotlegs.bender.extensions.viewProcessorMap.api.ViewProcessorMapError(errorMsg);
			} else throw(error);
		}
		return null;
	}
	,mapTypeForFilterBinding: function(filter,type,view) {
		var requiredType;
		var requiredTypes = this.requiredTypesFor(filter,type);
		var _g = 0;
		while(_g < requiredTypes.length) {
			var requiredType1 = requiredTypes[_g];
			++_g;
			this._injector.map(requiredType1).toValue(view);
		}
	}
	,unmapTypeForFilterBinding: function(filter,type,view) {
		var requiredType;
		var requiredTypes = this.requiredTypesFor(filter,type);
		var _g = 0;
		while(_g < requiredTypes.length) {
			var requiredType1 = requiredTypes[_g];
			++_g;
			if(this._injector.hasDirectMapping(requiredType1)) this._injector.unmap(requiredType1);
		}
	}
	,requiredTypesFor: function(filter,type) {
		var requiredTypes = filter.get_allOfTypes().concat(filter.get_anyOfTypes());
		if(HxOverrides.indexOf(requiredTypes,type,0) == -1) requiredTypes.push(type);
		return requiredTypes;
	}
	,createRemovedListener: function(view,type,processorMappings) {
		var viewProcessorFactoryCreateRemovedListener = new robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactoryCreateRemovedListener();
		viewProcessorFactoryCreateRemovedListener.init(this._listenersByView,$bind(this,this.runUnprocessors),$bind(this,this.removeHandlerFromView),view,type,processorMappings);
	}
	,removeHandlerFromView: function(view,handler) {
		if((function($this) {
			var $r;
			var key = org.swiftsuspenders.utils.UID.instanceID(view);
			$r = $this._listenersByView.get(key);
			return $r;
		}(this)) && ((function($this) {
			var $r;
			var key1 = org.swiftsuspenders.utils.UID.instanceID(view);
			$r = $this._listenersByView.get(key1);
			return $r;
		}(this))).length > 0) {
			var handlerIndex = ((function($this) {
				var $r;
				var key2 = org.swiftsuspenders.utils.UID.instanceID(view);
				$r = $this._listenersByView.get(key2);
				return $r;
			}(this))).indexOf(handler);
			((function($this) {
				var $r;
				var key3 = org.swiftsuspenders.utils.UID.instanceID(view);
				$r = $this._listenersByView.get(key3);
				return $r;
			}(this))).splice(handlerIndex,1);
			if(((function($this) {
				var $r;
				var key4 = org.swiftsuspenders.utils.UID.instanceID(view);
				$r = $this._listenersByView.get(key4);
				return $r;
			}(this))).length == 0) {
				var key5 = org.swiftsuspenders.utils.UID.instanceID(view);
				this._listenersByView.remove(key5);
			}
		}
	}
	,__class__: robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactory
};
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactoryCreateRemovedListener = function() {
};
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactoryCreateRemovedListener"] = robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactoryCreateRemovedListener;
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactoryCreateRemovedListener.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","impl","ViewProcessorFactoryCreateRemovedListener"];
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactoryCreateRemovedListener.prototype = {
	_listenersByView: null
	,view: null
	,type: null
	,processorMappings: null
	,runUnprocessors: null
	,removeHandlerFromView: null
	,init: function(_listenersByView,runUnprocessors,removeHandlerFromView,view,type,processorMappings) {
		this.removeHandlerFromView = removeHandlerFromView;
		this.runUnprocessors = runUnprocessors;
		this.processorMappings = processorMappings;
		this.type = type;
		this.view = view;
		this._listenersByView = _listenersByView;
		if(js.Boot.__instanceof(view,openfl.display.DisplayObject)) {
			if((function($this) {
				var $r;
				var key = org.swiftsuspenders.utils.UID.instanceID(view);
				$r = _listenersByView.get(key);
				return $r;
			}(this)) == null) {
				var k = org.swiftsuspenders.utils.UID.instanceID(view);
				var v = [];
				_listenersByView.set(k,v);
				v;
			}
			((function($this) {
				var $r;
				var key1 = org.swiftsuspenders.utils.UID.instanceID(view);
				$r = _listenersByView.get(key1);
				return $r;
			}(this))).push($bind(this,this.handler));
			(js.Boot.__cast(view , openfl.display.DisplayObject)).addEventListener(openfl.events.Event.REMOVED_FROM_STAGE,$bind(this,this.handler),false,0,true);
		}
	}
	,handler: function(e) {
		this.runUnprocessors(this.view,this.type,this.processorMappings);
		(js.Boot.__cast(this.view , openfl.display.DisplayObject)).removeEventListener(openfl.events.Event.REMOVED_FROM_STAGE,$bind(this,this.handler));
		this.removeHandlerFromView(this.view,$bind(this,this.handler));
	}
	,__class__: robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorFactoryCreateRemovedListener
};
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMap = function(factory,handler) {
	this.NULL_UNMAPPER = new robotlegs.bender.extensions.viewProcessorMap.impl.NullViewProcessorUnmapper();
	this._mappers = new haxe.ds.StringMap();
	if(handler != null) this._handler = handler; else this._handler = new robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorViewHandler(factory);
};
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMap"] = robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMap;
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMap.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","impl","ViewProcessorMap"];
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMap.__interfaces__ = [robotlegs.bender.extensions.viewManager.api.IViewHandler,robotlegs.bender.extensions.viewProcessorMap.api.IViewProcessorMap];
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMap.prototype = {
	_mappers: null
	,_handler: null
	,NULL_UNMAPPER: null
	,mapMatcher: function(matcher) {
		if((function($this) {
			var $r;
			var key = matcher.createTypeFilter().get_descriptor();
			$r = $this._mappers.get(key);
			return $r;
		}(this)) == null) {
			var k = matcher.createTypeFilter().get_descriptor();
			var v = this.createMapper(matcher);
			this._mappers.set(k,v);
			v;
		}
		var key1 = matcher.createTypeFilter().get_descriptor();
		return this._mappers.get(key1);
	}
	,map: function(type) {
		var matcher = new robotlegs.bender.extensions.matching.TypeMatcher().allOf([type]);
		return this.mapMatcher(matcher);
	}
	,unmapMatcher: function(matcher) {
		if((function($this) {
			var $r;
			var key = matcher.createTypeFilter().get_descriptor();
			$r = $this._mappers.get(key);
			return $r;
		}(this)) != null) {
			var key1 = matcher.createTypeFilter().get_descriptor();
			return this._mappers.get(key1);
		} else return this.NULL_UNMAPPER;
	}
	,unmap: function(type) {
		var matcher = new robotlegs.bender.extensions.matching.TypeMatcher().allOf([type]);
		return this.unmapMatcher(matcher);
	}
	,process: function(item) {
		var type = Type.getClass(item);
		this._handler.processItem(item,type);
	}
	,unprocess: function(item) {
		var type = Type.getClass(item);
		this._handler.unprocessItem(item,type);
	}
	,handleView: function(view,type) {
		this._handler.processItem(view,type);
	}
	,createMapper: function(matcher) {
		return new robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapper(matcher.createTypeFilter(),this._handler);
	}
	,__class__: robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMap
};
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapper = function(matcher,handler,logger) {
	this._mappings = new haxe.ds.StringMap();
	this._handler = handler;
	this._matcher = matcher;
	this._logger = logger;
};
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapper"] = robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapper;
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapper.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","impl","ViewProcessorMapper"];
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapper.__interfaces__ = [robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorUnmapper,robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapper];
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapper.prototype = {
	_mappings: null
	,_handler: null
	,_matcher: null
	,_logger: null
	,toProcess: function(processClassOrInstance) {
		var mapping;
		var key = processClassOrInstance;
		mapping = this._mappings.get(key);
		if(mapping != null) return this.overwriteMapping(mapping,processClassOrInstance); else return this.createMapping(processClassOrInstance);
	}
	,toInjection: function() {
		return this.toProcess(robotlegs.bender.extensions.viewProcessorMap.impl.ViewInjectionProcessor);
	}
	,toNoProcess: function() {
		return this.toProcess(robotlegs.bender.extensions.viewProcessorMap.impl.NullProcessor);
	}
	,fromProcess: function(processorClassOrInstance) {
		var mapping;
		var key = processorClassOrInstance;
		mapping = this._mappings.get(key);
		if(mapping != null) this.deleteMapping(mapping);
	}
	,fromAll: function() {
		var $it0 = this._mappings.iterator();
		while( $it0.hasNext() ) {
			var processor = $it0.next();
			this.fromProcess(processor);
		}
	}
	,fromNoProcess: function() {
		this.fromProcess(robotlegs.bender.extensions.viewProcessorMap.impl.NullProcessor);
	}
	,fromInjection: function() {
		this.fromProcess(robotlegs.bender.extensions.viewProcessorMap.impl.ViewInjectionProcessor);
	}
	,createMapping: function(processor) {
		var mapping = new robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapping(this._matcher,processor);
		this._handler.addMapping(mapping);
		var k = processor;
		this._mappings.set(k,mapping);
		mapping;
		if(this._logger != null) this._logger.debug("{0} mapped to {1}",[this._matcher,mapping]);
		return mapping;
	}
	,deleteMapping: function(mapping) {
		this._handler.removeMapping(mapping);
		var key = mapping.get_processor();
		this._mappings.remove(key);
		if(this._logger != null) this._logger.debug("{0} unmapped from {1}",[this._matcher,mapping]);
	}
	,overwriteMapping: function(mapping,processClassOrInstance) {
		if(this._logger != null) this._logger.warn("{0} is already mapped to {1}.\n" + "If you have overridden this mapping intentionally you can use \"unmap()\" " + "prior to your replacement mapping in order to avoid seeing this message.\n",[this._matcher,mapping]);
		this.deleteMapping(mapping);
		return this.createMapping(processClassOrInstance);
	}
	,__class__: robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapper
};
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapping = function(matcher,processor) {
	this._hooks = [];
	this._guards = [];
	this._matcher = matcher;
	this.setProcessor(processor);
};
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapping"] = robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapping;
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapping.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","impl","ViewProcessorMapping"];
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapping.__interfaces__ = [robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMappingConfig,robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapping];
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapping.prototype = {
	_matcher: null
	,matcher: null
	,get_matcher: function() {
		return this._matcher;
	}
	,_processor: null
	,get_processor: function() {
		return this._processor;
	}
	,set_processor: function(value) {
		this._processor = value;
		return this._processor;
	}
	,_processorClass: null
	,processorClass: null
	,get_processorClass: function() {
		return this._processorClass;
	}
	,_guards: null
	,guards: null
	,get_guards: function() {
		return this._guards;
	}
	,_hooks: null
	,hooks: null
	,get_hooks: function() {
		return this._hooks;
	}
	,withGuards: function(guards) {
		var _g1 = 0;
		var _g = guards.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._guards.push(guards[i]);
		}
		return this;
	}
	,withHooks: function(hooks) {
		var _g1 = 0;
		var _g = hooks.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._hooks.push(hooks[i]);
		}
		return this;
	}
	,toString: function() {
		return "Processor " + Std.string(this._processor);
	}
	,setProcessor: function(processor) {
		if(js.Boot.__instanceof(processor,Class)) this._processorClass = js.Boot.__cast(processor , Class); else {
			this._processor = processor;
			this._processorClass = Type.getClass(this._processor);
		}
	}
	,__class__: robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMapping
	,__properties__: {get_hooks:"get_hooks",get_guards:"get_guards",get_processorClass:"get_processorClass",set_processor:"set_processor",get_processor:"get_processor",get_matcher:"get_matcher"}
};
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorViewHandler = function(factory) {
	this._knownMappings = new haxe.ds.StringMap();
	this._mappings = [];
	this._factory = factory;
};
$hxClasses["robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorViewHandler"] = robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorViewHandler;
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorViewHandler.__name__ = ["robotlegs","bender","extensions","viewProcessorMap","impl","ViewProcessorViewHandler"];
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorViewHandler.__interfaces__ = [robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorViewHandler];
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorViewHandler.prototype = {
	_mappings: null
	,_knownMappings: null
	,_factory: null
	,addMapping: function(mapping) {
		var index = HxOverrides.indexOf(this._mappings,mapping,0);
		if(index > -1) return;
		this._mappings.push(mapping);
		this.flushCache();
	}
	,removeMapping: function(mapping) {
		var index = HxOverrides.indexOf(this._mappings,mapping,0);
		if(index == -1) return;
		this._mappings.splice(index,1);
		this.flushCache();
	}
	,processItem: function(item,type) {
		var interestedMappings = this.getInterestedMappingsFor(item,type);
		if(interestedMappings != null) this._factory.runProcessors(item,type,interestedMappings);
	}
	,unprocessItem: function(item,type) {
		var interestedMappings = this.getInterestedMappingsFor(item,type);
		if(interestedMappings != null) this._factory.runUnprocessors(item,type,interestedMappings);
	}
	,flushCache: function() {
		this._knownMappings = new haxe.ds.StringMap();
	}
	,getInterestedMappingsFor: function(view,type) {
		var mapping;
		var id = org.swiftsuspenders.utils.UID.classID(type);
		if(this._knownMappings.get(id) == false) return null;
		if(this._knownMappings.get(id) == null) {
			this._knownMappings.set(id,false);
			false;
			var _g = 0;
			var _g1 = this._mappings;
			while(_g < _g1.length) {
				var mapping1 = _g1[_g];
				++_g;
				if(mapping1.matcher.matches(view)) {
					if(this._knownMappings.get(id) == null) {
						var v = [];
						this._knownMappings.set(id,v);
						v;
					}
					this._knownMappings.get(id).push(mapping1);
				}
			}
			if(this._knownMappings.get(id) == false) return null;
		}
		return js.Boot.__cast(this._knownMappings.get(id) , Array);
	}
	,__class__: robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorViewHandler
};
robotlegs.bender.extensions.vigilance = {};
robotlegs.bender.extensions.vigilance.VigilanceExtension = function() {
	this._messageParser = new robotlegs.bender.extensions.enhancedLogging.impl.LogMessageParser();
};
$hxClasses["robotlegs.bender.extensions.vigilance.VigilanceExtension"] = robotlegs.bender.extensions.vigilance.VigilanceExtension;
robotlegs.bender.extensions.vigilance.VigilanceExtension.__name__ = ["robotlegs","bender","extensions","vigilance","VigilanceExtension"];
robotlegs.bender.extensions.vigilance.VigilanceExtension.__interfaces__ = [robotlegs.bender.framework.api.ILogTarget,robotlegs.bender.framework.api.IExtension];
robotlegs.bender.extensions.vigilance.VigilanceExtension.prototype = {
	_messageParser: null
	,extend: function(context) {
		context.get_injector().instantiateUnmapped(robotlegs.bender.extensions.vigilance.MetadataChecker).check();
		context.addLogTarget(this);
		context.get_injector().addEventListener(org.swiftsuspenders.mapping.MappingEvent.MAPPING_OVERRIDE,$bind(this,this.mappingOverrideHandler));
	}
	,log: function(source,level,timestamp,message,params) {
		if((function($this) {
			var $r;
			var b = robotlegs.bender.framework.api.LogLevel.WARN;
			$r = (function($this) {
				var $r;
				var aNeg = b < 0;
				var bNeg = level < 0;
				$r = aNeg != bNeg?aNeg:b >= level;
				return $r;
			}($this));
			return $r;
		}(this))) throw new robotlegs.bender.extensions.vigilance.VigilantError(this._messageParser.parseMessage(message,params));
	}
	,mappingOverrideHandler: function(event) {
		throw new org.swiftsuspenders.errors.InjectorError("Injector mapping override for type " + Std.string(event.mappedType) + " with name " + event.mappedName);
	}
	,__class__: robotlegs.bender.extensions.vigilance.VigilanceExtension
};
robotlegs.bender.extensions.vigilance.MetadataChecker = function() { };
$hxClasses["robotlegs.bender.extensions.vigilance.MetadataChecker"] = robotlegs.bender.extensions.vigilance.MetadataChecker;
robotlegs.bender.extensions.vigilance.MetadataChecker.__name__ = ["robotlegs","bender","extensions","vigilance","MetadataChecker"];
robotlegs.bender.extensions.vigilance.MetadataChecker.prototype = {
	context: null
	,check: function() {
		if(this.context == null) throw new robotlegs.bender.extensions.vigilance.VigilantError("It looks like custom metadata is being ignored by your compiler. " + "If you're compiling with the Flash IDE you need to open your " + "\"Publish Settings\" and select \"Publish SWC\". " + "See: https://github.com/robotlegs/robotlegs-framework/wiki/Common-Problems");
	}
	,__class__: robotlegs.bender.extensions.vigilance.MetadataChecker
};
robotlegs.bender.extensions.vigilance.VigilantError = function(message) {
	openfl.errors.Error.call(this,message);
};
$hxClasses["robotlegs.bender.extensions.vigilance.VigilantError"] = robotlegs.bender.extensions.vigilance.VigilantError;
robotlegs.bender.extensions.vigilance.VigilantError.__name__ = ["robotlegs","bender","extensions","vigilance","VigilantError"];
robotlegs.bender.extensions.vigilance.VigilantError.__super__ = openfl.errors.Error;
robotlegs.bender.extensions.vigilance.VigilantError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: robotlegs.bender.extensions.vigilance.VigilantError
});
robotlegs.bender.framework.api.IContext = function() { };
$hxClasses["robotlegs.bender.framework.api.IContext"] = robotlegs.bender.framework.api.IContext;
robotlegs.bender.framework.api.IContext.__name__ = ["robotlegs","bender","framework","api","IContext"];
robotlegs.bender.framework.api.IContext.__interfaces__ = [openfl.events.IEventDispatcher];
robotlegs.bender.framework.api.IContext.prototype = {
	injector: null
	,uninitialized: null
	,install: null
	,configure: null
	,addChild: null
	,addConfigHandler: null
	,getLogger: null
	,addLogTarget: null
	,detain: null
	,release: null
	,initialize: null
	,destroy: null
	,beforeInitializing: null
	,whenInitializing: null
	,afterInitializing: null
	,beforeDestroying: null
	,whenDestroying: null
	,afterDestroying: null
	,__class__: robotlegs.bender.framework.api.IContext
};
robotlegs.bender.framework.api.IInjector = function() { };
$hxClasses["robotlegs.bender.framework.api.IInjector"] = robotlegs.bender.framework.api.IInjector;
robotlegs.bender.framework.api.IInjector.__name__ = ["robotlegs","bender","framework","api","IInjector"];
robotlegs.bender.framework.api.IInjector.__interfaces__ = [openfl.events.IEventDispatcher];
robotlegs.bender.framework.api.IInjector.prototype = {
	hasMapping: null
	,hasDirectMapping: null
	,map: null
	,unmap: null
	,satisfiesDirectly: null
	,injectInto: null
	,getInstance: null
	,getOrCreateNewInstance: null
	,instantiateUnmapped: null
	,teardown: null
	,createChild: null
	,__class__: robotlegs.bender.framework.api.IInjector
};
robotlegs.bender.framework.api.ILifecycle = function() { };
$hxClasses["robotlegs.bender.framework.api.ILifecycle"] = robotlegs.bender.framework.api.ILifecycle;
robotlegs.bender.framework.api.ILifecycle.__name__ = ["robotlegs","bender","framework","api","ILifecycle"];
robotlegs.bender.framework.api.ILifecycle.__interfaces__ = [openfl.events.IEventDispatcher];
robotlegs.bender.framework.api.ILogger = function() { };
$hxClasses["robotlegs.bender.framework.api.ILogger"] = robotlegs.bender.framework.api.ILogger;
robotlegs.bender.framework.api.ILogger.__name__ = ["robotlegs","bender","framework","api","ILogger"];
robotlegs.bender.framework.api.ILogger.prototype = {
	debug: null
	,info: null
	,warn: null
	,error: null
	,__class__: robotlegs.bender.framework.api.ILogger
};
robotlegs.bender.framework.api.LifecycleError = function(message) {
	openfl.errors.Error.call(this,message);
};
$hxClasses["robotlegs.bender.framework.api.LifecycleError"] = robotlegs.bender.framework.api.LifecycleError;
robotlegs.bender.framework.api.LifecycleError.__name__ = ["robotlegs","bender","framework","api","LifecycleError"];
robotlegs.bender.framework.api.LifecycleError.__super__ = openfl.errors.Error;
robotlegs.bender.framework.api.LifecycleError.prototype = $extend(openfl.errors.Error.prototype,{
	__class__: robotlegs.bender.framework.api.LifecycleError
});
robotlegs.bender.framework.api.LifecycleState = function() { };
$hxClasses["robotlegs.bender.framework.api.LifecycleState"] = robotlegs.bender.framework.api.LifecycleState;
robotlegs.bender.framework.api.LifecycleState.__name__ = ["robotlegs","bender","framework","api","LifecycleState"];
robotlegs.bender.framework.api.LogLevel = function() { };
$hxClasses["robotlegs.bender.framework.api.LogLevel"] = robotlegs.bender.framework.api.LogLevel;
robotlegs.bender.framework.api.LogLevel.__name__ = ["robotlegs","bender","framework","api","LogLevel"];
robotlegs.bender.framework.api.PinEvent = function(type,instance) {
	openfl.events.Event.call(this,type);
	this._instance = instance;
};
$hxClasses["robotlegs.bender.framework.api.PinEvent"] = robotlegs.bender.framework.api.PinEvent;
robotlegs.bender.framework.api.PinEvent.__name__ = ["robotlegs","bender","framework","api","PinEvent"];
robotlegs.bender.framework.api.PinEvent.__super__ = openfl.events.Event;
robotlegs.bender.framework.api.PinEvent.prototype = $extend(openfl.events.Event.prototype,{
	_instance: null
	,instance: null
	,clone: function() {
		return new robotlegs.bender.framework.api.PinEvent(this.type,this._instance);
	}
	,__class__: robotlegs.bender.framework.api.PinEvent
});
robotlegs.bender.framework.impl = {};
robotlegs.bender.framework.impl.ApplyHooks = function() { };
$hxClasses["robotlegs.bender.framework.impl.ApplyHooks"] = robotlegs.bender.framework.impl.ApplyHooks;
robotlegs.bender.framework.impl.ApplyHooks.__name__ = ["robotlegs","bender","framework","impl","ApplyHooks"];
robotlegs.bender.framework.impl.ApplyHooks.call = function(hooks,injector) {
	var _g = 0;
	while(_g < hooks.length) {
		var hook = hooks[_g];
		++_g;
		if(Reflect.isFunction(hook)) {
			hook();
			continue;
		}
		if(js.Boot.__instanceof(hook,Class)) if(injector != null) hook = injector.instantiateUnmapped(js.Boot.__cast(hook , Class)); else hook = org.swiftsuspenders.utils.CallProxy.createInstance(hook,[]);
		hook.hook();
	}
};
robotlegs.bender.framework.impl.ClassMatcher = function() {
};
$hxClasses["robotlegs.bender.framework.impl.ClassMatcher"] = robotlegs.bender.framework.impl.ClassMatcher;
robotlegs.bender.framework.impl.ClassMatcher.__name__ = ["robotlegs","bender","framework","impl","ClassMatcher"];
robotlegs.bender.framework.impl.ClassMatcher.__interfaces__ = [robotlegs.bender.framework.api.IMatcher];
robotlegs.bender.framework.impl.ClassMatcher.prototype = {
	matches: function(item) {
		return js.Boot.__instanceof(item,Class);
	}
	,__class__: robotlegs.bender.framework.impl.ClassMatcher
};
robotlegs.bender.framework.impl.ConfigManager = function(context) {
	this._initialized = false;
	this._queue = [];
	this._configs = new haxe.ds.StringMap();
	this._objectProcessor = new robotlegs.bender.framework.impl.ObjectProcessor();
	this._context = context;
	this._injector = context.get_injector();
	this._logger = context.getLogger(this);
	this.addConfigHandler(new robotlegs.bender.framework.impl.ClassMatcher(),$bind(this,this.handleClass));
	this.addConfigHandler(new robotlegs.bender.framework.impl.ObjectMatcher(),$bind(this,this.handleObject));
	context.addEventListener(robotlegs.bender.framework.api.LifecycleEvent.INITIALIZE,$bind(this,this.initialize),false,-100);
};
$hxClasses["robotlegs.bender.framework.impl.ConfigManager"] = robotlegs.bender.framework.impl.ConfigManager;
robotlegs.bender.framework.impl.ConfigManager.__name__ = ["robotlegs","bender","framework","impl","ConfigManager"];
robotlegs.bender.framework.impl.ConfigManager.prototype = {
	_objectProcessor: null
	,_configs: null
	,_queue: null
	,_injector: null
	,_logger: null
	,_initialized: null
	,_context: null
	,addConfig: function(config) {
		var id = org.swiftsuspenders.utils.UID.instanceID(config);
		if(this._configs.get(id) == null) {
			this._configs.set(id,true);
			true;
			this._objectProcessor.processObject(config);
		}
	}
	,addConfigHandler: function(matcher,handler) {
		this._objectProcessor.addObjectHandler(matcher,handler);
	}
	,destroy: function() {
		this._context.removeEventListener(robotlegs.bender.framework.api.LifecycleEvent.INITIALIZE,$bind(this,this.initialize));
		this._objectProcessor.removeAllHandlers();
		this._queue = [];
		var $it0 = this._configs.iterator();
		while( $it0.hasNext() ) {
			var config = $it0.next();
			var key = org.swiftsuspenders.utils.UID.clearInstanceID(config);
			this._configs.remove(key);
		}
	}
	,initialize: function(event) {
		if(this._initialized == false) {
			this._initialized = true;
			this.processQueue();
		}
	}
	,handleClass: function(type) {
		if(this._initialized) {
			this._logger.debug("Already initialized. Instantiating config class {0}",[type]);
			this.processClass(type);
		} else {
			this._logger.debug("Not yet initialized. Queuing config class {0}",[type]);
			this._queue.push(type);
		}
	}
	,handleObject: function(object) {
		if(this._initialized) {
			this._logger.debug("Already initialized. Injecting into config object {0}",[object]);
			this.processObject(object);
		} else {
			this._logger.debug("Not yet initialized. Queuing config object {0}",[object]);
			this._queue.push(object);
		}
	}
	,processQueue: function() {
		var _g = 0;
		var _g1 = this._queue;
		while(_g < _g1.length) {
			var config = _g1[_g];
			++_g;
			if(js.Boot.__instanceof(config,Class)) {
				this._logger.debug("Now initializing. Instantiating config class {0}",[org.swiftsuspenders.utils.CallProxy.getClassName(config)]);
				this.processClass(js.Boot.__cast(config , Class));
			} else {
				this._logger.debug("Now initializing. Injecting into config object {0}",[org.swiftsuspenders.utils.CallProxy.getClassName(Type.getClass(config))]);
				this.processObject(config);
			}
		}
		this._queue = [];
	}
	,processClass: function(type) {
		var object;
		try {
			object = js.Boot.__cast(this._injector.getOrCreateNewInstance(type) , robotlegs.bender.framework.api.IConfig);
		} catch( e ) {
			if( js.Boot.__instanceof(e,openfl.errors.Error) ) {
				throw new openfl.errors.Error("Can't cast to IConfig, check you are using the @:keepSub meta tag");
			} else throw(e);
		}
		if(object != null) {
			var className = org.swiftsuspenders.utils.CallProxy.getClassName(type);
			var hasFeild = org.swiftsuspenders.utils.CallProxy.hasField(object,"configure");
			if(hasFeild) {
				object['configure']();;
			}
		}
	}
	,processObject: function(object) {
		this._injector.injectInto(object);
		var hasFeild = org.swiftsuspenders.utils.CallProxy.hasField(object,"configure");
		if(hasFeild) {
			object['configure']();;
		}
	}
	,__class__: robotlegs.bender.framework.impl.ConfigManager
};
robotlegs.bender.framework.impl.Context = function() {
	this._children = [];
	this._logManager = new robotlegs.bender.framework.impl.LogManager();
	this._uid = org.swiftsuspenders.utils.UID.create(robotlegs.bender.framework.impl.Context);
	this._injector = new robotlegs.bender.framework.impl.RobotlegsInjector();
	this.setup();
	openfl.events.EventDispatcher.call(this);
};
$hxClasses["robotlegs.bender.framework.impl.Context"] = robotlegs.bender.framework.impl.Context;
robotlegs.bender.framework.impl.Context.__name__ = ["robotlegs","bender","framework","impl","Context"];
robotlegs.bender.framework.impl.Context.__interfaces__ = [robotlegs.bender.framework.api.IContext];
robotlegs.bender.framework.impl.Context.__super__ = openfl.events.EventDispatcher;
robotlegs.bender.framework.impl.Context.prototype = $extend(openfl.events.EventDispatcher.prototype,{
	_injector: null
	,injector: null
	,get_injector: function() {
		return this._injector;
	}
	,get_logLevel: function() {
		return this._logManager.get_logLevel();
	}
	,set_logLevel: function(value) {
		this._logManager.set_logLevel(value);
		return value;
	}
	,state: null
	,get_state: function() {
		return this._lifecycle.get_state();
	}
	,uninitialized: null
	,get_uninitialized: function() {
		return this._lifecycle.get_uninitialized();
	}
	,initialized: null
	,get_initialized: function() {
		return this._lifecycle.get_initialized();
	}
	,active: null
	,get_active: function() {
		return this._lifecycle.get_active();
	}
	,suspended: null
	,get_suspended: function() {
		return this._lifecycle.get_suspended();
	}
	,destroyed: null
	,get_destroyed: function() {
		return this._lifecycle.get_destroyed();
	}
	,_uid: null
	,_logManager: null
	,_children: null
	,_pin: null
	,_lifecycle: null
	,_configManager: null
	,_extensionInstaller: null
	,_logger: null
	,initialize: function(callback) {
		this._lifecycle.initialize(callback);
	}
	,suspend: function(callback) {
		this._lifecycle.suspend(callback);
	}
	,resume: function(callback) {
		this._lifecycle.resume(callback);
	}
	,destroy: function(callback) {
		this._lifecycle.destroy(callback);
	}
	,beforeInitializing: function(handler) {
		this._lifecycle.beforeInitializing(handler);
		return this;
	}
	,whenInitializing: function(handler) {
		this._lifecycle.whenInitializing(handler);
		return this;
	}
	,afterInitializing: function(handler) {
		this._lifecycle.afterInitializing(handler);
		return this;
	}
	,beforeSuspending: function(handler) {
		this._lifecycle.beforeSuspending(handler);
		return this;
	}
	,whenSuspending: function(handler) {
		this._lifecycle.whenSuspending(handler);
		return this;
	}
	,afterSuspending: function(handler) {
		this._lifecycle.afterSuspending(handler);
		return this;
	}
	,beforeResuming: function(handler) {
		this._lifecycle.beforeResuming(handler);
		return this;
	}
	,whenResuming: function(handler) {
		this._lifecycle.whenResuming(handler);
		return this;
	}
	,afterResuming: function(handler) {
		this._lifecycle.afterResuming(handler);
		return this;
	}
	,beforeDestroying: function(handler) {
		this._lifecycle.beforeDestroying(handler);
		return this;
	}
	,whenDestroying: function(handler) {
		this._lifecycle.whenDestroying(handler);
		return this;
	}
	,afterDestroying: function(handler) {
		this._lifecycle.afterDestroying(handler);
		return this;
	}
	,install: function(extensions) {
		var _g = 0;
		while(_g < extensions.length) {
			var extension = extensions[_g];
			++_g;
			this._extensionInstaller.install(extension);
		}
		return this;
	}
	,configure: function(configs) {
		var _g = 0;
		while(_g < configs.length) {
			var config = configs[_g];
			++_g;
			if(!js.Boot.__instanceof(config,Class)) Reflect.setProperty(config,"constructor",Type.getClass(config));
			this._configManager.addConfig(config);
		}
		return this;
	}
	,addChild: function(child) {
		if(HxOverrides.indexOf(this._children,child,0) == -1) {
			this._logger.info("Adding child context {0}",[child]);
			if(child.get_uninitialized()) this._logger.warn("Child context {0} must be uninitialized",[child]);
			if(child.get_injector().get_parent() != null) this._logger.warn("Child context {0} must not have a parent Injector",[child]);
			this._children.push(child);
			child.get_injector().set_parent(this.get_injector());
			child.addEventListener(robotlegs.bender.framework.api.LifecycleEvent.POST_DESTROY,$bind(this,this.onChildDestroy));
		}
		return this;
	}
	,removeChild: function(child) {
		var childIndex = HxOverrides.indexOf(this._children,child,0);
		if(childIndex > -1) {
			this._logger.info("Removing child context {0}",[child]);
			this._children.splice(childIndex,1);
			child.get_injector().set_parent(null);
			child.removeEventListener(robotlegs.bender.framework.api.LifecycleEvent.POST_DESTROY,$bind(this,this.onChildDestroy));
		} else this._logger.warn("Child context {0} must be a child of {1}",[child,this]);
		return this;
	}
	,addConfigHandler: function(matcher,handler) {
		this._configManager.addConfigHandler(matcher,handler);
		return this;
	}
	,getLogger: function(source) {
		var returnVal = this._logManager.getLogger(source);
		return returnVal;
	}
	,addLogTarget: function(target) {
		this._logManager.addLogTarget(target);
		return this;
	}
	,detain: function(instance) {
		this._pin.detain(instance);
		return this;
	}
	,release: function(instance) {
		this._pin.release(instance);
		return this;
	}
	,toString: function() {
		return this._uid;
	}
	,setup: function() {
		this._injector.map(robotlegs.bender.framework.api.IInjector).toValue(this._injector);
		this._injector.map(robotlegs.bender.framework.api.IContext).toValue(this);
		this._logger = this._logManager.getLogger(this);
		this._pin = new robotlegs.bender.framework.impl.Pin(this);
		this._lifecycle = new robotlegs.bender.framework.impl.Lifecycle(this);
		this._configManager = new robotlegs.bender.framework.impl.ConfigManager(this);
		this._extensionInstaller = new robotlegs.bender.framework.impl.ExtensionInstaller(this);
		this.beforeInitializing($bind(this,this.beforeInitializingCallback));
		this.afterInitializing($bind(this,this.afterInitializingCallback));
		this.beforeDestroying($bind(this,this.beforeDestroyingCallback));
		this.afterDestroying($bind(this,this.afterDestroyingCallback));
	}
	,beforeInitializingCallback: function() {
		this._logger.info("Initializing...");
	}
	,afterInitializingCallback: function() {
		this._logger.info("Initialize complete");
	}
	,beforeDestroyingCallback: function() {
		this._logger.info("Destroying...");
	}
	,afterDestroyingCallback: function() {
		this._extensionInstaller.destroy();
		this._configManager.destroy();
		this._pin.releaseAll();
		this._injector.teardown();
		this.removeChildren();
		this._logger.info("Destroy complete");
		this._logManager.removeAllTargets();
	}
	,onChildDestroy: function(event) {
		this.removeChild(js.Boot.__cast(event.target , robotlegs.bender.framework.api.IContext));
	}
	,removeChildren: function() {
		var _g = 0;
		var _g1 = this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			this.removeChild(child);
		}
		this._children = [];
	}
	,__class__: robotlegs.bender.framework.impl.Context
	,__properties__: {get_destroyed:"get_destroyed",get_suspended:"get_suspended",get_active:"get_active",get_initialized:"get_initialized",get_uninitialized:"get_uninitialized",get_state:"get_state",set_logLevel:"set_logLevel",get_logLevel:"get_logLevel",get_injector:"get_injector"}
});
robotlegs.bender.framework.impl.ExtensionInstaller = function(context) {
	this._classes = new haxe.ds.StringMap();
	this._context = context;
	this._logger = this._context.getLogger(this);
};
$hxClasses["robotlegs.bender.framework.impl.ExtensionInstaller"] = robotlegs.bender.framework.impl.ExtensionInstaller;
robotlegs.bender.framework.impl.ExtensionInstaller.__name__ = ["robotlegs","bender","framework","impl","ExtensionInstaller"];
robotlegs.bender.framework.impl.ExtensionInstaller.prototype = {
	_classes: null
	,_context: null
	,_logger: null
	,install: function(extension) {
		if(js.Boot.__instanceof(extension,Class)) {
			var extensionInstance = org.swiftsuspenders.utils.CallProxy.createInstance(extension,[]);
			this.install(extensionInstance);
		} else {
			var id = org.swiftsuspenders.utils.UID.instanceID(extension);
			var extensionClass = Type.getClass(extension);
			if(this._classes.get(id) == true) return;
			this._logger.debug("Installing extension {0}",[id]);
			this._classes.set(id,true);
			true;
			var hasExtendField = org.swiftsuspenders.utils.CallProxy.hasField(extension,"extend");
			if(hasExtendField == true) extension.extend(this._context);
		}
	}
	,destroy: function() {
		var fields = Reflect.fields(this._classes);
		var _g = 0;
		while(_g < fields.length) {
			var propertyName = fields[_g];
			++_g;
			this._classes.remove(propertyName);
		}
	}
	,__class__: robotlegs.bender.framework.impl.ExtensionInstaller
};
robotlegs.bender.framework.impl.GuardsApprove = function() { };
$hxClasses["robotlegs.bender.framework.impl.GuardsApprove"] = robotlegs.bender.framework.impl.GuardsApprove;
robotlegs.bender.framework.impl.GuardsApprove.__name__ = ["robotlegs","bender","framework","impl","GuardsApprove"];
robotlegs.bender.framework.impl.GuardsApprove.call = function(guards,injector) {
	var _g = 0;
	while(_g < guards.length) {
		var guard = guards[_g];
		++_g;
		if(Reflect.isFunction(guard)) {
			if(guard()) continue;
			return false;
		}
		if(js.Boot.__instanceof(guard,Class)) if(injector != null) guard = injector.instantiateUnmapped(js.Boot.__cast(guard , Class)); else guard = org.swiftsuspenders.utils.CallProxy.createInstance(guard,[]);
		if(guard.approve() == false) return false;
	}
	return true;
};
robotlegs.bender.framework.impl.Lifecycle = function(target) {
	this._reversedEventTypes = new haxe.ds.StringMap();
	this._state = robotlegs.bender.framework.api.LifecycleState.UNINITIALIZED;
	this._target = target;
	if(js.Boot.__cast(target , openfl.events.IEventDispatcher) != null) this._dispatcher = js.Boot.__cast(target , openfl.events.IEventDispatcher); else this._dispatcher = new openfl.events.EventDispatcher(this);
	this.configureTransitions();
};
$hxClasses["robotlegs.bender.framework.impl.Lifecycle"] = robotlegs.bender.framework.impl.Lifecycle;
robotlegs.bender.framework.impl.Lifecycle.__name__ = ["robotlegs","bender","framework","impl","Lifecycle"];
robotlegs.bender.framework.impl.Lifecycle.__interfaces__ = [robotlegs.bender.framework.api.ILifecycle];
robotlegs.bender.framework.impl.Lifecycle.prototype = {
	_state: null
	,state: null
	,get_state: function() {
		return this._state;
	}
	,_target: null
	,target: null
	,get_target: function() {
		return this._target;
	}
	,uninitialized: null
	,get_uninitialized: function() {
		return this._state == robotlegs.bender.framework.api.LifecycleState.UNINITIALIZED;
	}
	,initialized: null
	,get_initialized: function() {
		return this._state != robotlegs.bender.framework.api.LifecycleState.UNINITIALIZED && this._state != robotlegs.bender.framework.api.LifecycleState.INITIALIZING;
	}
	,active: null
	,get_active: function() {
		return this._state == robotlegs.bender.framework.api.LifecycleState.ACTIVE;
	}
	,suspended: null
	,get_suspended: function() {
		return this._state == robotlegs.bender.framework.api.LifecycleState.SUSPENDED;
	}
	,destroyed: null
	,get_destroyed: function() {
		return this._state == robotlegs.bender.framework.api.LifecycleState.DESTROYED;
	}
	,_reversedEventTypes: null
	,_reversePriority: null
	,_initialize: null
	,_suspend: null
	,_resume: null
	,_destroy: null
	,_dispatcher: null
	,initialize: function(callback) {
		this._initialize.enter(callback);
	}
	,suspend: function(callback) {
		this._suspend.enter(callback);
	}
	,resume: function(callback) {
		this._resume.enter(callback);
	}
	,destroy: function(callback) {
		this._destroy.enter(callback);
	}
	,beforeInitializing: function(handler) {
		if(!this.get_uninitialized()) this.reportError(robotlegs.bender.framework.api.LifecycleError.LATE_HANDLER_ERROR_MESSAGE);
		this._initialize.addBeforeHandler(handler);
		return this;
	}
	,whenInitializing: function(handler) {
		if(this.get_initialized()) this.reportError(robotlegs.bender.framework.api.LifecycleError.LATE_HANDLER_ERROR_MESSAGE);
		this.addEventListener(robotlegs.bender.framework.api.LifecycleEvent.INITIALIZE,this.createSyncLifecycleListener(handler,true));
		return this;
	}
	,afterInitializing: function(handler) {
		if(this.get_initialized()) this.reportError(robotlegs.bender.framework.api.LifecycleError.LATE_HANDLER_ERROR_MESSAGE);
		this.addEventListener(robotlegs.bender.framework.api.LifecycleEvent.POST_INITIALIZE,this.createSyncLifecycleListener(handler,true));
		return this;
	}
	,beforeSuspending: function(handler) {
		this._suspend.addBeforeHandler(handler);
		return this;
	}
	,whenSuspending: function(handler) {
		this.addEventListener(robotlegs.bender.framework.api.LifecycleEvent.SUSPEND,this.createSyncLifecycleListener(handler));
		return this;
	}
	,afterSuspending: function(handler) {
		this.addEventListener(robotlegs.bender.framework.api.LifecycleEvent.POST_SUSPEND,this.createSyncLifecycleListener(handler));
		return this;
	}
	,beforeResuming: function(handler) {
		this._resume.addBeforeHandler(handler);
		return this;
	}
	,whenResuming: function(handler) {
		this.addEventListener(robotlegs.bender.framework.api.LifecycleEvent.RESUME,this.createSyncLifecycleListener(handler));
		return this;
	}
	,afterResuming: function(handler) {
		this.addEventListener(robotlegs.bender.framework.api.LifecycleEvent.POST_RESUME,this.createSyncLifecycleListener(handler));
		return this;
	}
	,beforeDestroying: function(handler) {
		this._destroy.addBeforeHandler(handler);
		return this;
	}
	,whenDestroying: function(handler) {
		this.addEventListener(robotlegs.bender.framework.api.LifecycleEvent.DESTROY,this.createSyncLifecycleListener(handler,true));
		return this;
	}
	,afterDestroying: function(handler) {
		this.addEventListener(robotlegs.bender.framework.api.LifecycleEvent.POST_DESTROY,this.createSyncLifecycleListener(handler,true));
		return this;
	}
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		priority = this.flipPriority(type,priority);
		this._dispatcher.addEventListener(type,listener,useCapture,priority,useWeakReference);
	}
	,removeEventListener: function(type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		this._dispatcher.removeEventListener(type,listener,useCapture);
	}
	,dispatchEvent: function(event) {
		return this._dispatcher.dispatchEvent(event);
	}
	,hasEventListener: function(type) {
		return this._dispatcher.hasEventListener(type);
	}
	,willTrigger: function(type) {
		return this._dispatcher.willTrigger(type);
	}
	,setCurrentState: function(state) {
		if(this._state == state) return;
		this._state = state;
		this.dispatchEvent(new robotlegs.bender.framework.api.LifecycleEvent(robotlegs.bender.framework.api.LifecycleEvent.STATE_CHANGE));
	}
	,addReversedEventTypes: function(types) {
		var _g1 = 0;
		var _g = types.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._reversedEventTypes.set(types[i],true);
			true;
		}
	}
	,configureTransitions: function() {
		this._initialize = new robotlegs.bender.framework.impl.LifecycleTransition(robotlegs.bender.framework.api.LifecycleEvent.PRE_INITIALIZE,this).fromStates([robotlegs.bender.framework.api.LifecycleState.UNINITIALIZED]).toStates(robotlegs.bender.framework.api.LifecycleState.INITIALIZING,robotlegs.bender.framework.api.LifecycleState.ACTIVE).withEvents(robotlegs.bender.framework.api.LifecycleEvent.PRE_INITIALIZE,robotlegs.bender.framework.api.LifecycleEvent.INITIALIZE,robotlegs.bender.framework.api.LifecycleEvent.POST_INITIALIZE);
		this._suspend = new robotlegs.bender.framework.impl.LifecycleTransition(robotlegs.bender.framework.api.LifecycleEvent.PRE_SUSPEND,this).fromStates([robotlegs.bender.framework.api.LifecycleState.ACTIVE]).toStates(robotlegs.bender.framework.api.LifecycleState.SUSPENDING,robotlegs.bender.framework.api.LifecycleState.SUSPENDED).withEvents(robotlegs.bender.framework.api.LifecycleEvent.PRE_SUSPEND,robotlegs.bender.framework.api.LifecycleEvent.SUSPEND,robotlegs.bender.framework.api.LifecycleEvent.POST_SUSPEND).inReverse();
		this._resume = new robotlegs.bender.framework.impl.LifecycleTransition(robotlegs.bender.framework.api.LifecycleEvent.PRE_RESUME,this).fromStates([robotlegs.bender.framework.api.LifecycleState.SUSPENDED]).toStates(robotlegs.bender.framework.api.LifecycleState.RESUMING,robotlegs.bender.framework.api.LifecycleState.ACTIVE).withEvents(robotlegs.bender.framework.api.LifecycleEvent.PRE_RESUME,robotlegs.bender.framework.api.LifecycleEvent.RESUME,robotlegs.bender.framework.api.LifecycleEvent.POST_RESUME);
		this._destroy = new robotlegs.bender.framework.impl.LifecycleTransition(robotlegs.bender.framework.api.LifecycleEvent.PRE_DESTROY,this).fromStates([robotlegs.bender.framework.api.LifecycleState.SUSPENDED,robotlegs.bender.framework.api.LifecycleState.ACTIVE]).toStates(robotlegs.bender.framework.api.LifecycleState.DESTROYING,robotlegs.bender.framework.api.LifecycleState.DESTROYED).withEvents(robotlegs.bender.framework.api.LifecycleEvent.PRE_DESTROY,robotlegs.bender.framework.api.LifecycleEvent.DESTROY,robotlegs.bender.framework.api.LifecycleEvent.POST_DESTROY).inReverse();
	}
	,flipPriority: function(type,priority) {
		if(priority == 0 && this._reversedEventTypes.get(type)) return this._reversePriority++; else return priority;
	}
	,createSyncLifecycleListener: function(handler,once) {
		if(once == null) once = false;
		if(handler.length > 1) throw new robotlegs.bender.framework.api.LifecycleError(robotlegs.bender.framework.api.LifecycleError.SYNC_HANDLER_ARG_MISMATCH);
		var syncLifecycleListener = new robotlegs.bender.framework.impl.SyncLifecycleListener();
		return syncLifecycleListener.init(handler,once,handler.length);
	}
	,reportError: function(message) {
		var error = new robotlegs.bender.framework.api.LifecycleError(message);
		if(this.hasEventListener(robotlegs.bender.framework.api.LifecycleEvent.ERROR)) {
			var event = new robotlegs.bender.framework.api.LifecycleEvent(robotlegs.bender.framework.api.LifecycleEvent.ERROR,error);
			this.dispatchEvent(event);
		} else throw error;
	}
	,__class__: robotlegs.bender.framework.impl.Lifecycle
	,__properties__: {get_destroyed:"get_destroyed",get_suspended:"get_suspended",get_active:"get_active",get_initialized:"get_initialized",get_uninitialized:"get_uninitialized",get_target:"get_target",get_state:"get_state"}
};
robotlegs.bender.framework.impl.SyncLifecycleListener = function() {
};
$hxClasses["robotlegs.bender.framework.impl.SyncLifecycleListener"] = robotlegs.bender.framework.impl.SyncLifecycleListener;
robotlegs.bender.framework.impl.SyncLifecycleListener.__name__ = ["robotlegs","bender","framework","impl","SyncLifecycleListener"];
robotlegs.bender.framework.impl.SyncLifecycleListener.prototype = {
	once: null
	,handler: null
	,init: function(handler,once,handlerLength) {
		this.handler = handler;
		this.once = once;
		if(handlerLength == 1) return $bind(this,this.createSyncLifecycleListenerFunction);
		return $bind(this,this.createSyncLifecycleListenerFunction2);
	}
	,createSyncLifecycleListenerFunction: function(event) {
		if(this.once) (js.Boot.__cast(event.target , openfl.events.IEventDispatcher)).removeEventListener(event.type,$bind(this,this.createSyncLifecycleListenerFunction));
		this.handler(event.type);
	}
	,createSyncLifecycleListenerFunction2: function(event) {
		if(this.once) (js.Boot.__cast(event.target , openfl.events.IEventDispatcher)).removeEventListener(event.type,$bind(this,this.createSyncLifecycleListenerFunction2));
		this.handler();
	}
	,__class__: robotlegs.bender.framework.impl.SyncLifecycleListener
};
robotlegs.bender.framework.impl.LifecycleTransition = function(name,lifecycle) {
	this._reverse = false;
	this._callbacks = [];
	this._dispatcher = new robotlegs.bender.framework.impl.MessageDispatcher();
	this._fromStates = [];
	this._name = name;
	this._lifecycle = lifecycle;
};
$hxClasses["robotlegs.bender.framework.impl.LifecycleTransition"] = robotlegs.bender.framework.impl.LifecycleTransition;
robotlegs.bender.framework.impl.LifecycleTransition.__name__ = ["robotlegs","bender","framework","impl","LifecycleTransition"];
robotlegs.bender.framework.impl.LifecycleTransition.prototype = {
	_fromStates: null
	,_dispatcher: null
	,_callbacks: null
	,_name: null
	,_lifecycle: null
	,_transitionState: null
	,_finalState: null
	,_preTransitionEvent: null
	,_transitionEvent: null
	,_postTransitionEvent: null
	,_reverse: null
	,fromStates: function(states) {
		var _g = 0;
		while(_g < states.length) {
			var state = states[_g];
			++_g;
			this._fromStates.push(state);
		}
		return this;
	}
	,toStates: function(transitionState,finalState) {
		this._transitionState = transitionState;
		this._finalState = finalState;
		return this;
	}
	,withEvents: function(preTransitionEvent,transitionEvent,postTransitionEvent) {
		this._preTransitionEvent = preTransitionEvent;
		this._transitionEvent = transitionEvent;
		this._postTransitionEvent = postTransitionEvent;
		if(this._reverse) this._lifecycle.addReversedEventTypes([preTransitionEvent,transitionEvent,postTransitionEvent]);
		return this;
	}
	,inReverse: function() {
		this._reverse = true;
		this._lifecycle.addReversedEventTypes([this._preTransitionEvent,this._transitionEvent,this._postTransitionEvent]);
		return this;
	}
	,addBeforeHandler: function(handler) {
		this._dispatcher.addMessageHandler(this._name,handler);
		return this;
	}
	,enter: function(callback) {
		var _g = this;
		if(this._lifecycle.get_state() == this._finalState) {
			if(callback != null) robotlegs.bender.framework.impl.SafelyCallBack.call(callback,null,this._name);
			return;
		}
		if(this._lifecycle.get_state() == this._transitionState) {
			if(callback != null) this._callbacks.push(callback);
			return;
		}
		if(this.invalidTransition()) {
			this.reportError("Invalid transition",[callback]);
			return;
		}
		var initialState = this._lifecycle.get_state();
		if(callback != null) this._callbacks.push(callback);
		this.setState(this._transitionState);
		this._dispatcher.dispatchMessage(this._name,function(error) {
			if(error) {
				_g.setState(initialState);
				_g.reportError(error,_g._callbacks);
				return;
			}
			_g.dispatch(_g._preTransitionEvent);
			_g.dispatch(_g._transitionEvent);
			_g.setState(_g._finalState);
			var callbacks = _g._callbacks.concat([]);
			_g._callbacks = [];
			var _g1 = 0;
			while(_g1 < callbacks.length) {
				var callback1 = callbacks[_g1];
				++_g1;
				robotlegs.bender.framework.impl.SafelyCallBack.call(callback1,null,_g._name);
			}
			_g.dispatch(_g._postTransitionEvent);
		},this._reverse);
	}
	,invalidTransition: function() {
		return this._fromStates.length > 0 && (function($this) {
			var $r;
			var x = $this._lifecycle.get_state();
			$r = HxOverrides.indexOf($this._fromStates,x,0);
			return $r;
		}(this)) == -1;
	}
	,setState: function(state) {
		if(state != null && state != "") this._lifecycle.setCurrentState(state);
	}
	,dispatch: function(type) {
		if(type != null && type != "" && this._lifecycle.hasEventListener(type)) this._lifecycle.dispatchEvent(new robotlegs.bender.framework.api.LifecycleEvent(type));
	}
	,reportError: function(message,callbacks) {
		var error;
		if(js.Boot.__instanceof(message,openfl.errors.Error)) error = js.Boot.__cast(message , openfl.errors.Error); else error = new openfl.errors.Error(message);
		if(this._lifecycle.hasEventListener(robotlegs.bender.framework.api.LifecycleEvent.ERROR)) {
			var event = new robotlegs.bender.framework.api.LifecycleEvent(robotlegs.bender.framework.api.LifecycleEvent.ERROR,error);
			this._lifecycle.dispatchEvent(event);
			if(callbacks != null) {
				var _g = 0;
				while(_g < callbacks.length) {
					var callback = callbacks[_g];
					++_g;
					if(callback != null) robotlegs.bender.framework.impl.SafelyCallBack.call(callback,error,this._name);
				}
				callbacks = [];
			}
		} else throw error;
	}
	,__class__: robotlegs.bender.framework.impl.LifecycleTransition
};
robotlegs.bender.framework.impl.LogManager = function() {
	this._targets = [];
	this._logLevel = robotlegs.bender.framework.api.LogLevel.INFO;
};
$hxClasses["robotlegs.bender.framework.impl.LogManager"] = robotlegs.bender.framework.impl.LogManager;
robotlegs.bender.framework.impl.LogManager.__name__ = ["robotlegs","bender","framework","impl","LogManager"];
robotlegs.bender.framework.impl.LogManager.__interfaces__ = [robotlegs.bender.framework.api.ILogTarget];
robotlegs.bender.framework.impl.LogManager.prototype = {
	_logLevel: null
	,get_logLevel: function() {
		return this._logLevel;
	}
	,set_logLevel: function(value) {
		this._logLevel = value;
		return this._logLevel;
	}
	,_targets: null
	,getLogger: function(source) {
		return new robotlegs.bender.framework.impl.Logger(source,this);
	}
	,addLogTarget: function(target) {
		this._targets.push(target);
	}
	,log: function(source,level,timestamp,message,params) {
		if((function($this) {
			var $r;
			var b = $this._logLevel;
			var aNeg = level < 0;
			var bNeg = b < 0;
			$r = aNeg != bNeg?aNeg:level > b;
			return $r;
		}(this))) return;
		var _g = 0;
		var _g1 = this._targets;
		while(_g < _g1.length) {
			var target = _g1[_g];
			++_g;
			target.log(source,level,timestamp,message,params);
		}
	}
	,removeAllTargets: function() {
		this._targets = [];
	}
	,__class__: robotlegs.bender.framework.impl.LogManager
	,__properties__: {set_logLevel:"set_logLevel",get_logLevel:"get_logLevel"}
};
robotlegs.bender.framework.impl.Logger = function(source,target) {
	this._source = source;
	this._target = target;
};
$hxClasses["robotlegs.bender.framework.impl.Logger"] = robotlegs.bender.framework.impl.Logger;
robotlegs.bender.framework.impl.Logger.__name__ = ["robotlegs","bender","framework","impl","Logger"];
robotlegs.bender.framework.impl.Logger.__interfaces__ = [robotlegs.bender.framework.api.ILogger];
robotlegs.bender.framework.impl.Logger.prototype = {
	_source: null
	,_target: null
	,debug: function(message,params) {
		this._target.log(this._source,32,openfl.Lib.getTimer(),message,params);
	}
	,info: function(message,params) {
		this._target.log(this._source,16,openfl.Lib.getTimer(),message,params);
	}
	,warn: function(message,params) {
		this._target.log(this._source,8,openfl.Lib.getTimer(),message,params);
	}
	,error: function(message,params) {
		this._target.log(this._source,4,openfl.Lib.getTimer(),message,params);
	}
	,fatal: function(message,params) {
		this._target.log(this._source,2,openfl.Lib.getTimer(),message,params);
	}
	,__class__: robotlegs.bender.framework.impl.Logger
};
robotlegs.bender.framework.impl.MessageDispatcher = function() {
	this._handlers = new haxe.ds.StringMap();
};
$hxClasses["robotlegs.bender.framework.impl.MessageDispatcher"] = robotlegs.bender.framework.impl.MessageDispatcher;
robotlegs.bender.framework.impl.MessageDispatcher.__name__ = ["robotlegs","bender","framework","impl","MessageDispatcher"];
robotlegs.bender.framework.impl.MessageDispatcher.prototype = {
	_handlers: null
	,addMessageHandler: function(message,handler) {
		var messageHandlers;
		var key = message;
		messageHandlers = this._handlers.get(key);
		if(messageHandlers != null) {
			if(HxOverrides.indexOf(messageHandlers,handler,0) == -1) messageHandlers.push(handler);
		} else {
			var k = message;
			var v = [handler];
			this._handlers.set(k,v);
			v;
		}
	}
	,hasMessageHandler: function(message) {
		var key = message;
		return this._handlers.get(key);
	}
	,removeMessageHandler: function(message,handler) {
		var messageHandlers;
		var key = message;
		messageHandlers = this._handlers.get(key);
		var index;
		if(messageHandlers != null) index = HxOverrides.indexOf(messageHandlers,handler,0); else index = -1;
		if(index != -1) {
			messageHandlers.splice(index,1);
			if(messageHandlers.length == 0) {
				var key1 = message;
				this._handlers.remove(key1);
			}
		}
	}
	,dispatchMessage: function(message,callback,reverse) {
		if(reverse == null) reverse = false;
		var handlers;
		var key = message;
		handlers = this._handlers.get(key);
		if(handlers.length > 0) {
			handlers = handlers.concat([]);
			if(!reverse) handlers.reverse();
			new robotlegs.bender.framework.impl.MessageRunner(message,handlers,callback).run();
		} else if(callback != null) robotlegs.bender.framework.impl.SafelyCallBack.call(callback);
	}
	,__class__: robotlegs.bender.framework.impl.MessageDispatcher
};
robotlegs.bender.framework.impl.MessageRunner = function(message,handlers,callback) {
	this._message = message;
	this._handlers = handlers;
	this._callback = callback;
};
$hxClasses["robotlegs.bender.framework.impl.MessageRunner"] = robotlegs.bender.framework.impl.MessageRunner;
robotlegs.bender.framework.impl.MessageRunner.__name__ = ["robotlegs","bender","framework","impl","MessageRunner"];
robotlegs.bender.framework.impl.MessageRunner.prototype = {
	_message: null
	,_handlers: null
	,_callback: null
	,run: function() {
		this.next();
	}
	,next: function() {
		var _g = this;
		var handler;
		while((handler = this._handlers.pop()) != null) if(handler.length == 0) handler(); else if(handler.length == 1) handler(this._message); else if(handler.length == 2) {
			var handled = [false];
			handler(this._message,(function(handled) {
				return function(error,msg) {
					if(handled[0]) return;
					handled[0] = true;
					if(error != null || _g._handlers.length == 0) {
						if(_g._callback != null) robotlegs.bender.framework.impl.SafelyCallBack.call(_g._callback,error,_g._message);
					} else _g.next();
				};
			})(handled));
			return;
		} else throw new openfl.errors.Error("Bad handler signature");
		if(this._callback != null) robotlegs.bender.framework.impl.SafelyCallBack.call(this._callback,null,this._message);
	}
	,__class__: robotlegs.bender.framework.impl.MessageRunner
};
robotlegs.bender.framework.impl.ObjectMatcher = function() {
};
$hxClasses["robotlegs.bender.framework.impl.ObjectMatcher"] = robotlegs.bender.framework.impl.ObjectMatcher;
robotlegs.bender.framework.impl.ObjectMatcher.__name__ = ["robotlegs","bender","framework","impl","ObjectMatcher"];
robotlegs.bender.framework.impl.ObjectMatcher.__interfaces__ = [robotlegs.bender.framework.api.IMatcher];
robotlegs.bender.framework.impl.ObjectMatcher.prototype = {
	matches: function(item) {
		return js.Boot.__instanceof(item,Class) == false;
	}
	,__class__: robotlegs.bender.framework.impl.ObjectMatcher
};
robotlegs.bender.framework.impl.ObjectProcessor = function() {
	this._handlers = [];
};
$hxClasses["robotlegs.bender.framework.impl.ObjectProcessor"] = robotlegs.bender.framework.impl.ObjectProcessor;
robotlegs.bender.framework.impl.ObjectProcessor.__name__ = ["robotlegs","bender","framework","impl","ObjectProcessor"];
robotlegs.bender.framework.impl.ObjectProcessor.prototype = {
	_handlers: null
	,addObjectHandler: function(matcher,handler) {
		this._handlers.push(new robotlegs.bender.framework.impl.ObjectHandler(matcher,handler));
	}
	,processObject: function(object) {
		var _g = 0;
		var _g1 = this._handlers;
		while(_g < _g1.length) {
			var handler = _g1[_g];
			++_g;
			handler.handle(object);
		}
	}
	,removeAllHandlers: function() {
		this._handlers = [];
	}
	,__class__: robotlegs.bender.framework.impl.ObjectProcessor
};
robotlegs.bender.framework.impl.ObjectHandler = function(matcher,handler) {
	this._matcher = matcher;
	this._handler = handler;
};
$hxClasses["robotlegs.bender.framework.impl.ObjectHandler"] = robotlegs.bender.framework.impl.ObjectHandler;
robotlegs.bender.framework.impl.ObjectHandler.__name__ = ["robotlegs","bender","framework","impl","ObjectHandler"];
robotlegs.bender.framework.impl.ObjectHandler.prototype = {
	_matcher: null
	,_handler: null
	,handle: function(object) {
		if(this._matcher.matches(object)) this._handler(object);
	}
	,__class__: robotlegs.bender.framework.impl.ObjectHandler
};
robotlegs.bender.framework.impl.Pin = function(dispatcher) {
	this._instances = new haxe.ds.StringMap();
	this._dispatcher = dispatcher;
};
$hxClasses["robotlegs.bender.framework.impl.Pin"] = robotlegs.bender.framework.impl.Pin;
robotlegs.bender.framework.impl.Pin.__name__ = ["robotlegs","bender","framework","impl","Pin"];
robotlegs.bender.framework.impl.Pin.prototype = {
	_instances: null
	,_dispatcher: null
	,detain: function(instance) {
		if((function($this) {
			var $r;
			var key = instance;
			$r = $this._instances.get(key);
			return $r;
		}(this)) == null) {
			var k = instance;
			this._instances.set(k,true);
			true;
			this._dispatcher.dispatchEvent(new robotlegs.bender.framework.api.PinEvent(robotlegs.bender.framework.api.PinEvent.DETAIN,instance));
		}
	}
	,release: function(instance) {
		if((function($this) {
			var $r;
			var key = instance;
			$r = $this._instances.get(key);
			return $r;
		}(this))) {
			var key1 = instance;
			this._instances.remove(key1);
			this._dispatcher.dispatchEvent(new robotlegs.bender.framework.api.PinEvent(robotlegs.bender.framework.api.PinEvent.RELEASE,instance));
		}
	}
	,releaseAll: function() {
		var $it0 = this._instances.iterator();
		while( $it0.hasNext() ) {
			var instance = $it0.next();
			this.release(instance);
		}
	}
	,__class__: robotlegs.bender.framework.impl.Pin
};
robotlegs.bender.framework.impl.RobotlegsInjector = function() {
	org.swiftsuspenders.Injector.call(this);
};
$hxClasses["robotlegs.bender.framework.impl.RobotlegsInjector"] = robotlegs.bender.framework.impl.RobotlegsInjector;
robotlegs.bender.framework.impl.RobotlegsInjector.__name__ = ["robotlegs","bender","framework","impl","RobotlegsInjector"];
robotlegs.bender.framework.impl.RobotlegsInjector.__interfaces__ = [robotlegs.bender.framework.api.IInjector];
robotlegs.bender.framework.impl.RobotlegsInjector.__super__ = org.swiftsuspenders.Injector;
robotlegs.bender.framework.impl.RobotlegsInjector.prototype = $extend(org.swiftsuspenders.Injector.prototype,{
	set_parent: function(parentInjector) {
		this.set_parentInjector(js.Boot.__cast(parentInjector , robotlegs.bender.framework.impl.RobotlegsInjector));
		return js.Boot.__cast(parentInjector , robotlegs.bender.framework.api.IInjector);
	}
	,get_parent: function() {
		return js.Boot.__cast(this.get_parentInjector() , robotlegs.bender.framework.impl.RobotlegsInjector);
	}
	,createChild: function(applicationDomain) {
		var childInjector = new robotlegs.bender.framework.impl.RobotlegsInjector();
		if(applicationDomain != null) childInjector.set_applicationDomain(applicationDomain); else childInjector.set_applicationDomain(this.get_applicationDomain());
		childInjector.set_parent(this);
		return childInjector;
	}
	,__class__: robotlegs.bender.framework.impl.RobotlegsInjector
	,__properties__: $extend(org.swiftsuspenders.Injector.prototype.__properties__,{set_parent:"set_parent",get_parent:"get_parent"})
});
robotlegs.bender.framework.impl.SafelyCallBack = function() { };
$hxClasses["robotlegs.bender.framework.impl.SafelyCallBack"] = robotlegs.bender.framework.impl.SafelyCallBack;
robotlegs.bender.framework.impl.SafelyCallBack.__name__ = ["robotlegs","bender","framework","impl","SafelyCallBack"];
robotlegs.bender.framework.impl.SafelyCallBack.call = function(callback,errorMsg,message) {
	callback(errorMsg,message);
};
robotlegs.bender.framework.impl.UID = function() { };
$hxClasses["robotlegs.bender.framework.impl.UID"] = robotlegs.bender.framework.impl.UID;
robotlegs.bender.framework.impl.UID.__name__ = ["robotlegs","bender","framework","impl","UID"];
robotlegs.bender.framework.impl.UID._i = null;
robotlegs.bender.framework.impl.UID.create = function(source) {
	var className = robotlegs.bender.framework.impl.UID.classID(source);
	return (source?Std.string(source) + "-":"") + StringTools.hex(robotlegs.bender.framework.impl.UID._i++,16) + "-" + StringTools.hex(Math.floor(Math.random() * 255),16);
};
robotlegs.bender.framework.impl.UID.classID = function(source) {
	var className = "";
	if(Type.getClass(source) != null) className = org.swiftsuspenders.utils.CallProxy.getClassName(Type.getClass(source));
	return className;
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
var this1;
this1 = new Array(256);
lime.graphics.utils.ImageDataUtil.__alpha16 = this1;
var _g = 0;
while(_g < 256) {
	var i = _g++;
	lime.graphics.utils.ImageDataUtil.__alpha16[i] = i * 65536 / 255 | 0;
}
var this2;
this2 = new Array(510);
lime.graphics.utils.ImageDataUtil.__clamp = this2;
var _g1 = 0;
while(_g1 < 255) {
	var i1 = _g1++;
	lime.graphics.utils.ImageDataUtil.__clamp[i1] = i1;
}
var _g11 = 255;
var _g2 = 511;
while(_g11 < _g2) {
	var i2 = _g11++;
	lime.graphics.utils.ImageDataUtil.__clamp[i2] = 255;
}
msignal.SlotList.NIL = new msignal.SlotList(null,null);
if(window.createjs != null) createjs.Sound.alternateExtensions = ["ogg","mp3","wav"];
openfl.display.DisplayObject.__instanceCount = 0;
openfl.display.DisplayObject.__worldRenderDirty = 0;
openfl.display.DisplayObject.__worldTransformDirty = 0;
com.imagination.core.model.scene.SceneModel.__rtti = "<class path=\"com.imagination.core.model.scene.SceneModel\" params=\"\"><meta>\n\t<m n=\":keep\"/>\n\t<m n=\":rtti\"/>\n</meta></class>";
com.imagination.robotlegs.imagBasic.commands.CommandConfig.__meta__ = { fields : { commandMap : { inject : null}, injector : { inject : null}}};
com.imagination.robotlegs.imagBasic.commands.CommandConfig.__rtti = "<class path=\"com.imagination.robotlegs.imagBasic.commands.CommandConfig\" params=\"\">\n\t<implements path=\"robotlegs.bender.framework.api.IConfig\"/>\n\t<commandMap public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</commandMap>\n\t<injector public=\"1\">\n\t\t<c path=\"robotlegs.bender.framework.api.IInjector\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</injector>\n\t<configure public=\"1\" set=\"method\" line=\"23\"><f a=\"\"><x path=\"Void\"/></f></configure>\n\t<new public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.bundles.mvcs.Command.__rtti = "<class path=\"robotlegs.bender.bundles.mvcs.Command\" params=\"\">\n\t<implements path=\"robotlegs.bender.extensions.commandCenter.api.ICommand\"/>\n\t<execute public=\"1\" set=\"method\" line=\"31\"><f a=\"\"><x path=\"Void\"/></f></execute>\n\t<meta>\n\t\t<m n=\":keepSub\"/>\n\t\t<m n=\":rtti\"/>\n\t</meta>\n</class>";
com.imagination.robotlegs.imagBasic.commands.example.ExampleCommand.__rtti = "<class path=\"com.imagination.robotlegs.imagBasic.commands.example.ExampleCommand\" params=\"\">\n\t<extends path=\"robotlegs.bender.bundles.mvcs.Command\"/>\n\t<execute public=\"1\" set=\"method\" line=\"18\" override=\"1\"><f a=\"\"><x path=\"Void\"/></f></execute>\n\t<new public=\"1\" set=\"method\" line=\"16\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
openfl.events.Event.ACTIVATE = "activate";
openfl.events.Event.ADDED = "added";
openfl.events.Event.ADDED_TO_STAGE = "addedToStage";
openfl.events.Event.COMPLETE = "complete";
openfl.events.Event.CONTEXT3D_CREATE = "context3DCreate";
openfl.events.Event.DEACTIVATE = "deactivate";
openfl.events.Event.ENTER_FRAME = "enterFrame";
openfl.events.Event.OPEN = "open";
openfl.events.Event.REMOVED = "removed";
openfl.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
openfl.events.Event.RENDER = "render";
openfl.events.Event.RESIZE = "resize";
com.imagination.robotlegs.imagBasic.events.AppEvent.INIT = "init";
com.imagination.robotlegs.imagBasic.model.ModelConfig.__meta__ = { fields : { injector : { inject : null}, configModel : { inject : null}}};
com.imagination.robotlegs.imagBasic.model.ModelConfig.__rtti = "<class path=\"com.imagination.robotlegs.imagBasic.model.ModelConfig\" params=\"\">\n\t<implements path=\"robotlegs.bender.framework.api.IConfig\"/>\n\t<injector public=\"1\">\n\t\t<c path=\"robotlegs.bender.framework.api.IInjector\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</injector>\n\t<configModel public=\"1\">\n\t\t<c path=\"com.imagination.robotlegs.imagBasic.model.config.ConfigModel\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</configModel>\n\t<configure public=\"1\" set=\"method\" line=\"23\"><f a=\"\"><x path=\"Void\"/></f></configure>\n\t<new public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel.__rtti = "<class path=\"robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel\" params=\"\">\n\t<_configURL line=\"11\" static=\"1\"><c path=\"String\"/></_configURL>\n\t<configURL public=\"1\" get=\"accessor\" set=\"accessor\"><c path=\"String\"/></configURL>\n\t<get_configURL public=\"1\" set=\"method\" line=\"16\"><f a=\"\"><c path=\"String\"/></f></get_configURL>\n\t<set_configURL public=\"1\" set=\"method\" line=\"21\"><f a=\"value\">\n\t<c path=\"String\"/>\n\t<c path=\"String\"/>\n</f></set_configURL>\n\t<new public=\"1\" set=\"method\" line=\"14\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel._configURL = "xml/config.xml";
com.imagination.robotlegs.imagBasic.model.config.ConfigModel.__rtti = "<class path=\"com.imagination.robotlegs.imagBasic.model.config.ConfigModel\" params=\"\">\n\t<extends path=\"robotlegs.bender.extensions.imag.impl.model.config.BaseConfigModel\"/>\n\t<implements path=\"robotlegs.bender.extensions.imag.api.model.config.IConfigModel\"/>\n\t<new public=\"1\" set=\"method\" line=\"16\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
com.imagination.robotlegs.imagBasic.model.example.ExampleModel.__rtti = "<class path=\"com.imagination.robotlegs.imagBasic.model.example.ExampleModel\" params=\"\">\n\t<_value><x path=\"Int\"/></_value>\n\t<change public=\"1\" line=\"14\"><c path=\"msignal.Signal0\"/></change>\n\t<value public=\"1\" get=\"accessor\" set=\"accessor\"><x path=\"Int\"/></value>\n\t<get_value public=\"1\" set=\"method\" line=\"22\"><f a=\"\"><x path=\"Int\"/></f></get_value>\n\t<set_value public=\"1\" set=\"method\" line=\"27\"><f a=\"value\">\n\t<x path=\"Int\"/>\n\t<x path=\"Int\"/>\n</f></set_value>\n\t<new public=\"1\" set=\"method\" line=\"17\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
com.imagination.robotlegs.imagBasic.services.ServiceConfig.__meta__ = { fields : { injector : { inject : null}}};
com.imagination.robotlegs.imagBasic.services.ServiceConfig.__rtti = "<class path=\"com.imagination.robotlegs.imagBasic.services.ServiceConfig\" params=\"\">\n\t<implements path=\"robotlegs.bender.framework.api.IConfig\"/>\n\t<injector public=\"1\">\n\t\t<c path=\"robotlegs.bender.framework.api.IInjector\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</injector>\n\t<configure public=\"1\" set=\"method\" line=\"20\"><f a=\"\"><x path=\"Void\"/></f></configure>\n\t<new public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
com.imagination.robotlegs.imagBasic.services.example.ExampleService.__rtti = "<class path=\"com.imagination.robotlegs.imagBasic.services.example.ExampleService\" params=\"\">\n\t<new public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
com.imagination.robotlegs.imagBasic.view.ViewConfig.__meta__ = { fields : { context : { inject : null}, commandMap : { inject : null}, mediatorMap : { inject : null}, stack : { inject : null}, renderer : { inject : null}, contextView : { inject : null}}};
com.imagination.robotlegs.imagBasic.view.ViewConfig.__rtti = "<class path=\"com.imagination.robotlegs.imagBasic.view.ViewConfig\" params=\"\">\n\t<implements path=\"robotlegs.bender.framework.api.IConfig\"/>\n\t<context public=\"1\">\n\t\t<c path=\"robotlegs.bender.framework.api.IContext\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</context>\n\t<commandMap public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</commandMap>\n\t<mediatorMap public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.mediatorMap.api.IMediatorMap\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</mediatorMap>\n\t<stack public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.stage3D.base.api.IStack\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</stack>\n\t<renderer public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.stage3D.base.api.IRenderer\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</renderer>\n\t<contextView public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.contextView.ContextView\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</contextView>\n\t<configure public=\"1\" set=\"method\" line=\"34\"><f a=\"\"><x path=\"Void\"/></f></configure>\n\t<init set=\"method\" line=\"39\"><f a=\"\"><x path=\"Void\"/></f></init>\n\t<OnContext3DReady set=\"method\" line=\"46\"><f a=\"\"><x path=\"Void\"/></f></OnContext3DReady>\n\t<mapMediators set=\"method\" line=\"53\"><f a=\"\"><x path=\"Void\"/></f></mapMediators>\n\t<initView set=\"method\" line=\"58\"><f a=\"\"><x path=\"Void\"/></f></initView>\n\t<new public=\"1\" set=\"method\" line=\"29\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
com.imagination.robotlegs.imagBasic.view.openfl.MainView.__rtti = "<class path=\"com.imagination.robotlegs.imagBasic.view.openfl.MainView\" params=\"\">\n\t<extends path=\"openfl.display.Sprite\"/>\n\t<initialize public=\"1\" set=\"method\" line=\"22\"><f a=\"\"><x path=\"Void\"/></f></initialize>\n\t<new public=\"1\" set=\"method\" line=\"16\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.bundles.mvcs.Mediator.__meta__ = { fields : { eventMap : { inject : null}, eventDispatcher : { inject : null}}};
robotlegs.bender.bundles.mvcs.Mediator.__rtti = "<class path=\"robotlegs.bender.bundles.mvcs.Mediator\" params=\"\">\n\t<implements path=\"robotlegs.bender.extensions.mediatorMap.api.IMediator\"/>\n\t<eventMap public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.localEventMap.api.IEventMap\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</eventMap>\n\t<eventDispatcher public=\"1\">\n\t\t<c path=\"openfl.events.IEventDispatcher\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</eventDispatcher>\n\t<_viewComponent><d/></_viewComponent>\n\t<set_viewComponent public=\"1\" set=\"method\" line=\"39\"><f a=\"view\">\n\t<d/>\n\t<x path=\"Void\"/>\n</f></set_viewComponent>\n\t<initialize public=\"1\" set=\"method\" line=\"51\"><f a=\"\"><x path=\"Void\"/></f></initialize>\n\t<destroy public=\"1\" set=\"method\" line=\"58\"><f a=\"\"><x path=\"Void\"/></f></destroy>\n\t<postDestroy public=\"1\" set=\"method\" line=\"66\"><f a=\"\"><x path=\"Void\"/></f></postDestroy>\n\t<addViewListener set=\"method\" line=\"75\"><f a=\"eventString:listener:?eventClass\" v=\"::null\">\n\t<c path=\"String\"/>\n\t<d/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></addViewListener>\n\t<addContextListener set=\"method\" line=\"80\"><f a=\"eventString:listener:?eventClass\" v=\"::null\">\n\t<c path=\"String\"/>\n\t<d/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></addContextListener>\n\t<removeViewListener set=\"method\" line=\"85\"><f a=\"eventString:listener:?eventClass\" v=\"::null\">\n\t<c path=\"String\"/>\n\t<d/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></removeViewListener>\n\t<removeContextListener set=\"method\" line=\"90\"><f a=\"eventString:listener:?eventClass\" v=\"::null\">\n\t<c path=\"String\"/>\n\t<d/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></removeContextListener>\n\t<dispatch set=\"method\" line=\"95\"><f a=\"event\">\n\t<c path=\"openfl.events.Event\"/>\n\t<x path=\"Void\"/>\n</f></dispatch>\n\t<meta>\n\t\t<m n=\":keepSub\"/>\n\t\t<m n=\":rtti\"/>\n\t</meta>\n</class>";
com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator.__meta__ = { fields : { view : { inject : null}, exampleService : { inject : null}, dispatcher : { inject : null}}};
com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator.__rtti = "<class path=\"com.imagination.robotlegs.imagBasic.view.openfl.MainViewMediator\" params=\"\">\n\t<extends path=\"robotlegs.bender.bundles.mvcs.Mediator\"/>\n\t<view public=\"1\">\n\t\t<c path=\"com.imagination.robotlegs.imagBasic.view.openfl.MainView\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</view>\n\t<exampleService public=\"1\">\n\t\t<c path=\"com.imagination.robotlegs.imagBasic.services.example.ExampleService\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</exampleService>\n\t<dispatcher public=\"1\">\n\t\t<c path=\"openfl.events.IEventDispatcher\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</dispatcher>\n\t<initialize public=\"1\" set=\"method\" line=\"27\" override=\"1\"><f a=\"\"><x path=\"Void\"/></f></initialize>\n\t<new public=\"1\" set=\"method\" line=\"22\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
com.imagination.robotlegs.imagBasic.view.openfl.display.SubView.__rtti = "<class path=\"com.imagination.robotlegs.imagBasic.view.openfl.display.SubView\" params=\"\">\n\t<extends path=\"openfl.display.Sprite\"/>\n\t<initialize public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><x path=\"Void\"/></f></initialize>\n\t<new public=\"1\" set=\"method\" line=\"15\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
haxe.ds.ObjectMap.count = 0;
haxe.xml.Parser.escapes = (function($this) {
	var $r;
	var h = new haxe.ds.StringMap();
	h.set("lt","<");
	h.set("gt",">");
	h.set("amp","&");
	h.set("quot","\"");
	h.set("apos","'");
	h.set("nbsp",String.fromCharCode(160));
	$r = h;
	return $r;
}(this));
js.Boot.__toStr = {}.toString;
lime.Assets.cache = new lime.AssetCache();
lime.Assets.libraries = new haxe.ds.StringMap();
lime.Assets.initialized = false;
lime.app.Application.onUpdate = new lime.app.Event();
lime.app.Preloader.images = new haxe.ds.StringMap();
lime.app.Preloader.loaders = new haxe.ds.StringMap();
lime.graphics.Renderer.onRenderContextLost = new lime.app.Event();
lime.graphics.Renderer.onRenderContextRestored = new lime.app.Event();
lime.graphics.Renderer.onRender = new lime.app.Event();
lime.ui.KeyEventManager.onKeyDown = new lime.app.Event();
lime.ui.KeyEventManager.onKeyUp = new lime.app.Event();
lime.ui.MouseEventManager.onMouseDown = new lime.app.Event();
lime.ui.MouseEventManager.onMouseMove = new lime.app.Event();
lime.ui.MouseEventManager.onMouseUp = new lime.app.Event();
lime.ui.MouseEventManager.onMouseWheel = new lime.app.Event();
lime.ui.TouchEventManager.onTouchEnd = new lime.app.Event();
lime.ui.TouchEventManager.onTouchMove = new lime.app.Event();
lime.ui.TouchEventManager.onTouchStart = new lime.app.Event();
lime.ui.Window.onWindowActivate = new lime.app.Event();
lime.ui.Window.onWindowClose = new lime.app.Event();
lime.ui.Window.onWindowDeactivate = new lime.app.Event();
lime.ui.Window.onWindowFocusIn = new lime.app.Event();
lime.ui.Window.onWindowFocusOut = new lime.app.Event();
lime.ui.Window.onWindowMove = new lime.app.Event();
lime.ui.Window.onWindowResize = new lime.app.Event();
openfl.system.ApplicationDomain.currentDomain = new openfl.system.ApplicationDomain(null);
openfl.geom.Matrix.__identity = new openfl.geom.Matrix();
openfl.Lib.current = new openfl.display.MovieClip();
openfl.Lib.__startTime = haxe.Timer.stamp();
openfl._internal.renderer.canvas.CanvasGraphics.SIN45 = 0.70710678118654752440084436210485;
openfl._internal.renderer.canvas.CanvasGraphics.TAN22 = 0.4142135623730950488016887242097;
openfl._internal.renderer.opengl.GLRenderer.blendModesWebGL = null;
openfl._internal.renderer.opengl.GLRenderer.glContextId = 0;
openfl._internal.renderer.opengl.GLRenderer.glContexts = [];
openfl._internal.renderer.opengl.shaders.AbstractShader.__UID = 0;
openfl._internal.renderer.opengl.shaders.DefaultShader.defaultVertexSrc = ["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec2 aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","varying vec4 vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;","   vColor = vec4(color * aColor.x, aColor.x);","}"];
openfl._internal.renderer.opengl.utils.PathBuiler.__fillIndex = 0;
openfl._internal.renderer.opengl.utils.GraphicsRenderer.bucketPool = [];
openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectPosition = new openfl.geom.Point();
openfl._internal.renderer.opengl.utils.GraphicsRenderer.objectBounds = new openfl.geom.Rectangle();
openfl.display3D.Context3D.MAX_SAMPLERS = 8;
openfl.events.ErrorEvent.ERROR = "error";
openfl.events.FocusEvent.FOCUS_IN = "focusIn";
openfl.events.FocusEvent.FOCUS_OUT = "focusOut";
openfl.events.HTTPStatusEvent.HTTP_STATUS = "httpStatus";
openfl.events.IOErrorEvent.IO_ERROR = "ioError";
openfl.events.KeyboardEvent.KEY_DOWN = "keyDown";
openfl.events.KeyboardEvent.KEY_UP = "keyUp";
openfl.events.MouseEvent.CLICK = "click";
openfl.events.MouseEvent.DOUBLE_CLICK = "doubleClick";
openfl.events.MouseEvent.MIDDLE_CLICK = "middleClick";
openfl.events.MouseEvent.MIDDLE_MOUSE_DOWN = "middleMouseDown";
openfl.events.MouseEvent.MIDDLE_MOUSE_UP = "middleMouseUp";
openfl.events.MouseEvent.MOUSE_DOWN = "mouseDown";
openfl.events.MouseEvent.MOUSE_MOVE = "mouseMove";
openfl.events.MouseEvent.MOUSE_UP = "mouseUp";
openfl.events.MouseEvent.MOUSE_WHEEL = "mouseWheel";
openfl.events.MouseEvent.RIGHT_CLICK = "rightClick";
openfl.events.MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
openfl.events.MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
openfl.events.MouseEvent.__buttonDown = [false,false,false];
openfl.events.ProgressEvent.PROGRESS = "progress";
openfl.events.SecurityErrorEvent.SECURITY_ERROR = "securityError";
openfl.media.Sound.__registeredSounds = new haxe.ds.StringMap();
openfl.net.URLRequestMethod.GET = "GET";
org.swiftsuspenders.InjectionEvent.POST_INSTANTIATE = "postInstantiate";
org.swiftsuspenders.InjectionEvent.PRE_CONSTRUCT = "preConstruct";
org.swiftsuspenders.InjectionEvent.POST_CONSTRUCT = "postConstruct";
org.swiftsuspenders.Injector.INJECTION_POINTS_CACHE = new haxe.ds.StringMap();
org.swiftsuspenders.Injector._baseTypes = org.swiftsuspenders.Injector.initBaseTypeMappingIds([Dynamic,Array,Class,Float,Int,_UInt.UInt_Impl_,String]);
org.swiftsuspenders.mapping.MappingEvent.PRE_MAPPING_CREATE = "preMappingCreate";
org.swiftsuspenders.mapping.MappingEvent.POST_MAPPING_CREATE = "postMappingCreate";
org.swiftsuspenders.mapping.MappingEvent.PRE_MAPPING_CHANGE = "preMappingChange";
org.swiftsuspenders.mapping.MappingEvent.POST_MAPPING_CHANGE = "postMappingChange";
org.swiftsuspenders.mapping.MappingEvent.POST_MAPPING_REMOVE = "postMappingRemove";
org.swiftsuspenders.mapping.MappingEvent.MAPPING_OVERRIDE = "mappingOverride";
org.swiftsuspenders.reflection.DescribeTypeRTTIReflector.__rtti = "<class path=\"org.swiftsuspenders.reflection.DescribeTypeRTTIReflector\" params=\"\">\n\t<extends path=\"org.swiftsuspenders.reflection.ReflectorBase\"/>\n\t<implements path=\"org.swiftsuspenders.reflection.Reflector\"/>\n\t<_currentFactoryXML><c path=\"Xml\"/></_currentFactoryXML>\n\t<_currentFactoryXMLFast><c path=\"haxe.xml.Fast\"/></_currentFactoryXMLFast>\n\t<constructorElem><c path=\"haxe.xml.Fast\"/></constructorElem>\n\t<rtti><c path=\"String\"/></rtti>\n\t<extendPath><c path=\"String\"/></extendPath>\n\t<extendDescribeTypeReflector><c path=\"org.swiftsuspenders.reflection.DescribeTypeRTTIReflector\"/></extendDescribeTypeReflector>\n\t<extendTypeDescription><c path=\"org.swiftsuspenders.typedescriptions.TypeDescription\"/></extendTypeDescription>\n\t<typeImplements public=\"1\" set=\"method\" line=\"46\"><f a=\"type:superType\">\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Bool\"/>\n</f></typeImplements>\n\t<classExtendsOrImplements public=\"1\" set=\"method\" line=\"56\"><f a=\"classOrClassName:superClass\">\n\t<d/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Bool\"/>\n</f></classExtendsOrImplements>\n\t<describeInjections public=\"1\" set=\"method\" line=\"89\"><f a=\"_type\">\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"org.swiftsuspenders.typedescriptions.TypeDescription\"/>\n</f></describeInjections>\n\t<isInterface set=\"method\" line=\"140\"><f a=\"type\">\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Bool\"/>\n</f></isInterface>\n\t<addCtorInjectionPoint set=\"method\" line=\"160\"><f a=\"description:type\">\n\t<c path=\"org.swiftsuspenders.typedescriptions.TypeDescription\"/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></addCtorInjectionPoint>\n\t<parametersFromXml set=\"method\" line=\"191\"><f a=\"x\">\n\t<c path=\"Xml\"/>\n\t<c path=\"Array\"><c path=\"String\"/></c>\n</f></parametersFromXml>\n\t<addFieldInjectionPoints set=\"method\" line=\"221\"><f a=\"description:type\">\n\t<c path=\"org.swiftsuspenders.typedescriptions.TypeDescription\"/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></addFieldInjectionPoints>\n\t<addMethodInjectionPoints set=\"method\" line=\"301\"><f a=\"description:type\">\n\t<c path=\"org.swiftsuspenders.typedescriptions.TypeDescription\"/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></addMethodInjectionPoints>\n\t<addPostConstructMethodPoints set=\"method\" line=\"319\"><f a=\"description:type\">\n\t<c path=\"org.swiftsuspenders.typedescriptions.TypeDescription\"/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></addPostConstructMethodPoints>\n\t<addPreDestroyMethodPoints set=\"method\" line=\"330\"><f a=\"description:type\">\n\t<c path=\"org.swiftsuspenders.typedescriptions.TypeDescription\"/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></addPreDestroyMethodPoints>\n\t<gatherOrderedInjectionPointsForTag set=\"method\" line=\"348\"><f a=\"injectionPointType:tag:type\">\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"String\"/>\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"Array\"><d/></c>\n</f></gatherOrderedInjectionPointsForTag>\n\t<createDummyInstance set=\"method\" line=\"408\"><f a=\"constructorNode:clazz\">\n\t<c path=\"Xml\"/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></createDummyInstance>\n\t<new public=\"1\" set=\"method\" line=\"41\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":keepSub\"/>\n\t\t<m n=\":rtti\"/>\n\t</meta>\n</class>";
org.swiftsuspenders.utils.UID.classRefs = new haxe.ds.StringMap();
robotlegs.bender.bundles.ImagBundle.VERSION = "1.2";
robotlegs.bender.extensions.contextView.ContextView.__rtti = "<class path=\"robotlegs.bender.extensions.contextView.ContextView\" params=\"\">\n\t<view public=\"1\"><c path=\"openfl.display.DisplayObjectContainer\"/></view>\n\t<new public=\"1\" set=\"method\" line=\"43\"><f a=\"view\">\n\t<c path=\"openfl.display.DisplayObjectContainer\"/>\n\t<x path=\"Void\"/>\n</f></new>\n\t<meta>\n\t\t<m n=\":keepSub\"/>\n\t\t<m n=\":rtti\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.contextView.ContextViewListenerConfig.__meta__ = { fields : { contextView : { inject : null}, viewManager : { inject : null}}};
robotlegs.bender.extensions.contextView.ContextViewListenerConfig.__rtti = "<class path=\"robotlegs.bender.extensions.contextView.ContextViewListenerConfig\" params=\"\">\n\t<implements path=\"robotlegs.bender.framework.api.IConfig\"/>\n\t<contextView public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.contextView.ContextView\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</contextView>\n\t<viewManager public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.viewManager.api.IViewManager\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</viewManager>\n\t<configure public=\"1\" set=\"method\" line=\"44\"><f a=\"\"><x path=\"Void\"/></f></configure>\n\t<new public=\"1\" set=\"method\" line=\"33\">\n\t\t<f a=\"\"><x path=\"Void\"/></f>\n\t\t<meta><m n=\":keep\"/></meta>\n\t</new>\n\t<meta>\n\t\t<m n=\":keepSub\"/>\n\t\t<m n=\":rtti\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.eventCommandMap.impl.EventCommandMap.__rtti = "<class path=\"robotlegs.bender.extensions.eventCommandMap.impl.EventCommandMap\" params=\"\">\n\t<implements path=\"robotlegs.bender.extensions.eventCommandMap.api.IEventCommandMap\"/>\n\t<_mappingProcessors line=\"32\"><c path=\"Array\"><d/></c></_mappingProcessors>\n\t<_injector><c path=\"robotlegs.bender.framework.api.IInjector\"/></_injector>\n\t<_dispatcher><c path=\"openfl.events.IEventDispatcher\"/></_dispatcher>\n\t<_triggerMap><c path=\"robotlegs.bender.extensions.commandCenter.impl.CommandTriggerMap\"/></_triggerMap>\n\t<_logger><c path=\"robotlegs.bender.framework.api.ILogger\"/></_logger>\n\t<map public=\"1\" set=\"method\" line=\"64\"><f a=\"type:?eventClass\" v=\":null\">\n\t<c path=\"String\"/>\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"robotlegs.bender.extensions.commandCenter.dsl.ICommandMapper\"/>\n</f></map>\n\t<unmap public=\"1\" set=\"method\" line=\"72\"><f a=\"type:?eventClass\" v=\":null\">\n\t<c path=\"String\"/>\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"robotlegs.bender.extensions.commandCenter.dsl.ICommandUnmapper\"/>\n</f></unmap>\n\t<addMappingProcessor public=\"1\" set=\"method\" line=\"80\"><f a=\"handler\">\n\t<f a=\"\"><x path=\"Void\"/></f>\n\t<c path=\"robotlegs.bender.extensions.eventCommandMap.api.IEventCommandMap\"/>\n</f></addMappingProcessor>\n\t<getKey set=\"method\" line=\"91\"><f a=\"type:eventClass\">\n\t<c path=\"String\"/>\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"String\"/>\n</f></getKey>\n\t<getTrigger set=\"method\" line=\"96\"><f a=\"type:eventClass\">\n\t<c path=\"String\"/>\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"robotlegs.bender.extensions.eventCommandMap.impl.EventCommandTrigger\"/>\n</f></getTrigger>\n\t<createTrigger set=\"method\" line=\"101\"><f a=\"type:eventClass\">\n\t<c path=\"String\"/>\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"robotlegs.bender.extensions.eventCommandMap.impl.EventCommandTrigger\"/>\n</f></createTrigger>\n\t<new public=\"1\" set=\"method\" line=\"49\"><f a=\"context:dispatcher\">\n\t<c path=\"robotlegs.bender.framework.api.IContext\"/>\n\t<c path=\"openfl.events.IEventDispatcher\"/>\n\t<x path=\"Void\"/>\n</f></new>\n\t<meta>\n\t\t<m n=\":keepSub\"/>\n\t\t<m n=\":rtti\"/>\n\t</meta>\n</class>";
robotlegs.bender.framework.api.LifecycleEvent.ERROR = "_error";
robotlegs.bender.framework.api.LifecycleEvent.STATE_CHANGE = "stateChange";
robotlegs.bender.framework.api.LifecycleEvent.PRE_INITIALIZE = "preInitialize";
robotlegs.bender.framework.api.LifecycleEvent.INITIALIZE = "initialize";
robotlegs.bender.framework.api.LifecycleEvent.POST_INITIALIZE = "postInitialize";
robotlegs.bender.framework.api.LifecycleEvent.PRE_SUSPEND = "preSuspend";
robotlegs.bender.framework.api.LifecycleEvent.SUSPEND = "suspend";
robotlegs.bender.framework.api.LifecycleEvent.POST_SUSPEND = "postSuspend";
robotlegs.bender.framework.api.LifecycleEvent.PRE_RESUME = "preResume";
robotlegs.bender.framework.api.LifecycleEvent.RESUME = "resume";
robotlegs.bender.framework.api.LifecycleEvent.POST_RESUME = "postResume";
robotlegs.bender.framework.api.LifecycleEvent.PRE_DESTROY = "preDestroy";
robotlegs.bender.framework.api.LifecycleEvent.DESTROY = "destroy";
robotlegs.bender.framework.api.LifecycleEvent.POST_DESTROY = "postDestroy";
robotlegs.bender.extensions.eventDispatcher.impl.LifecycleEventRelay.TYPES = [robotlegs.bender.framework.api.LifecycleEvent.STATE_CHANGE,robotlegs.bender.framework.api.LifecycleEvent.PRE_INITIALIZE,robotlegs.bender.framework.api.LifecycleEvent.INITIALIZE,robotlegs.bender.framework.api.LifecycleEvent.POST_INITIALIZE,robotlegs.bender.framework.api.LifecycleEvent.PRE_SUSPEND,robotlegs.bender.framework.api.LifecycleEvent.SUSPEND,robotlegs.bender.framework.api.LifecycleEvent.POST_SUSPEND,robotlegs.bender.framework.api.LifecycleEvent.PRE_RESUME,robotlegs.bender.framework.api.LifecycleEvent.RESUME,robotlegs.bender.framework.api.LifecycleEvent.POST_RESUME,robotlegs.bender.framework.api.LifecycleEvent.PRE_DESTROY,robotlegs.bender.framework.api.LifecycleEvent.DESTROY,robotlegs.bender.framework.api.LifecycleEvent.POST_DESTROY];
robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands.__meta__ = { fields : { commandMap : { inject : null}, injector : { inject : null}, configModel : { inject : null}, initializeAppSignal : { inject : null}, loadConfigSignal : { inject : null}}};
robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands.__rtti = "<class path=\"robotlegs.bender.extensions.imag.impl.commands.ExecuteImagCommands\" params=\"\">\n\t<implements path=\"robotlegs.bender.framework.api.IConfig\"/>\n\t<commandMap public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</commandMap>\n\t<injector public=\"1\">\n\t\t<c path=\"robotlegs.bender.framework.api.IInjector\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</injector>\n\t<configModel public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.imag.api.model.config.IConfigModel\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</configModel>\n\t<initializeAppSignal public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</initializeAppSignal>\n\t<loadConfigSignal public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</loadConfigSignal>\n\t<configure public=\"1\" set=\"method\" line=\"40\"><f a=\"\"><x path=\"Void\"/></f></configure>\n\t<setupSwfCommands set=\"method\" line=\"59\"><f a=\"\"><x path=\"Void\"/></f></setupSwfCommands>\n\t<new public=\"1\" set=\"method\" line=\"35\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand.__meta__ = { fields : { configModel : { inject : null}, appSetupCompleteSignal : { inject : null}}};
robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand.__rtti = "<class path=\"robotlegs.bender.extensions.imag.impl.commands.config.ConfigCommand\" params=\"\">\n\t<extends path=\"robotlegs.bender.bundles.mvcs.Command\"/>\n\t<configModel public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.imag.api.model.config.IConfigModel\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</configModel>\n\t<appSetupCompleteSignal public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</appSetupCompleteSignal>\n\t<xmlLoaderService public=\"1\"><c path=\"robotlegs.bender.extensions.imag.impl.utils.loaders.XMLLoaderService\"/></xmlLoaderService>\n\t<xmlToTypedObject public=\"1\"><c path=\"robotlegs.bender.extensions.imag.impl.utils.parsers.XMLToTypedObject\"/></xmlToTypedObject>\n\t<loadCount line=\"26\"><x path=\"Int\"/></loadCount>\n\t<totalAssets line=\"27\"><x path=\"Int\"/></totalAssets>\n\t<execute public=\"1\" set=\"method\" line=\"35\" override=\"1\"><f a=\"\"><x path=\"Void\"/></f></execute>\n\t<load set=\"method\" line=\"76\"><f a=\"url\">\n\t<c path=\"String\"/>\n\t<x path=\"Void\"/>\n</f></load>\n\t<OnLoadComplete set=\"method\" line=\"82\"><f a=\"data:id\">\n\t<c path=\"Xml\"/>\n\t<c path=\"String\"/>\n\t<x path=\"Void\"/>\n</f></OnLoadComplete>\n\t<AllFilesLoaded set=\"method\" line=\"92\"><f a=\"\"><x path=\"Void\"/></f></AllFilesLoaded>\n\t<new public=\"1\" set=\"method\" line=\"29\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.imag.impl.commands.fullscreen.HTMLFullscreenCommand.__meta__ = { fields : { contextView : { inject : null}}};
robotlegs.bender.extensions.imag.impl.commands.fullscreen.HTMLFullscreenCommand.__rtti = "<class path=\"robotlegs.bender.extensions.imag.impl.commands.fullscreen.HTMLFullscreenCommand\" params=\"\">\n\t<extends path=\"robotlegs.bender.bundles.mvcs.Command\"/>\n\t<contextView public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.contextView.ContextView\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</contextView>\n\t<execute public=\"1\" set=\"method\" line=\"23\" override=\"1\"><f a=\"\"><x path=\"Void\"/></f></execute>\n\t<OnEndTouchFullscreen set=\"method\" line=\"33\"><f a=\"e\">\n\t<c path=\"openfl.events.TouchEvent\"/>\n\t<x path=\"Void\"/>\n</f></OnEndTouchFullscreen>\n\t<OnDoubleClickFullscreen set=\"method\" line=\"39\"><f a=\"e\">\n\t<c path=\"openfl.events.MouseEvent\"/>\n\t<x path=\"Void\"/>\n</f></OnDoubleClickFullscreen>\n\t<GoFullScreen set=\"method\" line=\"51\"><f a=\"\"><x path=\"Void\"/></f></GoFullScreen>\n\t<toggleFullScreen set=\"method\" line=\"74\"><f a=\"\"><x path=\"Void\"/></f></toggleFullScreen>\n\t<new public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta><m n=\":keepSub\"/></meta>\n</class>";
robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand.__meta__ = { fields : { contextView : { inject : null}}};
robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand.__rtti = "<class path=\"robotlegs.bender.extensions.imag.impl.commands.stageSetup.StageSetupCommand\" params=\"\">\n\t<extends path=\"robotlegs.bender.bundles.mvcs.Command\"/>\n\t<contextView public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.contextView.ContextView\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</contextView>\n\t<execute public=\"1\" set=\"method\" line=\"24\" override=\"1\"><f a=\"\"><x path=\"Void\"/></f></execute>\n\t<new public=\"1\" set=\"method\" line=\"19\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand.__meta__ = { fields : { viewport : { inject : null}, contextView : { inject : null}}};
robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand.__rtti = "<class path=\"robotlegs.bender.extensions.imag.impl.commands.viewportResize.FullStageViewportCommand\" params=\"\">\n\t<extends path=\"robotlegs.bender.bundles.mvcs.Command\"/>\n\t<viewport public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.stage3D.base.api.IViewport\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</viewport>\n\t<contextView public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.contextView.ContextView\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</contextView>\n\t<stage><t path=\"flash.display.Stage\"/></stage>\n\t<resizeCount><x path=\"Int\"/></resizeCount>\n\t<canvas><c path=\"js.html.CanvasElement\"/></canvas>\n\t<div><c path=\"js.html.DivElement\"/></div>\n\t<execute public=\"1\" set=\"method\" line=\"39\" override=\"1\"><f a=\"\"><x path=\"Void\"/></f></execute>\n\t<OnStageResize set=\"method\" line=\"50\"><f a=\"e\">\n\t<t path=\"flash.events.Event\"/>\n\t<x path=\"Void\"/>\n</f></OnStageResize>\n\t<OnWindowResize set=\"method\" line=\"56\"><f a=\"event\">\n\t<c path=\"js.html.Event\"/>\n\t<x path=\"Void\"/>\n</f></OnWindowResize>\n\t<JSResizer set=\"method\" line=\"62\"><f a=\"e\">\n\t<t path=\"flash.events.Event\"/>\n\t<x path=\"Void\"/>\n</f></JSResizer>\n\t<UpdateWindowDimensions set=\"method\" line=\"71\"><f a=\"\"><x path=\"Void\"/></f></UpdateWindowDimensions>\n\t<new public=\"1\" set=\"method\" line=\"34\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.imag.impl.model.activity.ActivityModel.__meta__ = { fields : { contextView : { inject : null}}};
robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap.__meta__ = { fields : { contextView : { inject : null}}};
robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap.__rtti = "<class path=\"robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap\" params=\"\">\n\t<extends path=\"openfl.events.EventDispatcher\"/>\n\t<implements path=\"robotlegs.bender.extensions.imag.api.services.keyboard.IKeyboardMap\"/>\n\t<ACTION_DOWN public=\"1\" line=\"27\" static=\"1\"><c path=\"String\"/></ACTION_DOWN>\n\t<ACTION_UP public=\"1\" line=\"28\" static=\"1\"><c path=\"String\"/></ACTION_UP>\n\t<contextView public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.contextView.ContextView\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</contextView>\n\t<initiated line=\"21\"><x path=\"Bool\"/></initiated>\n\t<_keyLookup><x path=\"Map\">\n\t<x path=\"Int\"/>\n\t<c path=\"Array\"><c path=\"robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut\"/></c>\n</x></_keyLookup>\n\t<_charLookup><x path=\"Map\">\n\t<c path=\"String\"/>\n\t<c path=\"Array\"><c path=\"robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut\"/></c>\n</x></_charLookup>\n\t<_shortcuts><c path=\"Array\"><c path=\"robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut\"/></c></_shortcuts>\n\t<_traceKeyIDs line=\"29\"><x path=\"Bool\"/></_traceKeyIDs>\n\t<strBooleanMaps line=\"31\"><x path=\"Map\">\n\t<c path=\"String\"/>\n\t<c path=\"robotlegs.bender.extensions.imag.impl.services.keyboard.BoolMap\"/>\n</x></strBooleanMaps>\n\t<intBooleanMaps line=\"32\"><x path=\"Map\">\n\t<x path=\"Int\"/>\n\t<c path=\"robotlegs.bender.extensions.imag.impl.services.keyboard.BoolMap\"/>\n</x></intBooleanMaps>\n\t<init set=\"method\" line=\"39\"><f a=\"\"><x path=\"Void\"/></f></init>\n\t<OnKeyDown set=\"method\" line=\"52\"><f a=\"e\">\n\t<c path=\"openfl.events.KeyboardEvent\"/>\n\t<x path=\"Void\"/>\n</f></OnKeyDown>\n\t<OnKeyUp set=\"method\" line=\"61\"><f a=\"e\">\n\t<c path=\"openfl.events.KeyboardEvent\"/>\n\t<x path=\"Void\"/>\n</f></OnKeyUp>\n\t<map public=\"1\" set=\"method\" line=\"69\"><f a=\"callback:charOrKeycode:?options\" v=\"::null\">\n\t<d/>\n\t<d/>\n\t<d/>\n\t<x path=\"Void\"/>\n</f></map>\n\t<mapBool public=\"1\" set=\"method\" line=\"84\"><f a=\"object:property:charOrKeycode:?options\" v=\":::null\">\n\t<d/>\n\t<c path=\"String\"/>\n\t<d/>\n\t<d/>\n\t<x path=\"Void\"/>\n</f></mapBool>\n\t<booleanMapStr set=\"method\" line=\"90\"><f a=\"charOrKeycode\">\n\t<c path=\"String\"/>\n\t<c path=\"robotlegs.bender.extensions.imag.impl.services.keyboard.BoolMap\"/>\n</f></booleanMapStr>\n\t<booleanMapInt set=\"method\" line=\"98\"><f a=\"charOrKeycode\">\n\t<x path=\"Int\"/>\n\t<c path=\"robotlegs.bender.extensions.imag.impl.services.keyboard.BoolMap\"/>\n</f></booleanMapInt>\n\t<addCharShortcut set=\"method\" line=\"106\"><f a=\"callback:char:?options\" v=\"::null\">\n\t<d/>\n\t<c path=\"String\"/>\n\t<d/>\n\t<x path=\"Void\"/>\n</f></addCharShortcut>\n\t<addKeyShortcut set=\"method\" line=\"110\"><f a=\"callback:key:?options\" v=\"::null\">\n\t<d/>\n\t<x path=\"Int\"/>\n\t<d/>\n\t<x path=\"Void\"/>\n</f></addKeyShortcut>\n\t<addShortcut set=\"method\" line=\"114\"><f a=\"callback:chars:keys:type:?options\" v=\"::::null\">\n\t<d/>\n\t<c path=\"Array\"><c path=\"String\"/></c>\n\t<c path=\"Array\"><x path=\"Int\"/></c>\n\t<d/>\n\t<d/>\n\t<x path=\"Void\"/>\n</f></addShortcut>\n\t<executeList set=\"method\" line=\"141\"><f a=\"shortcuts:e\">\n\t<c path=\"Array\"><c path=\"robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut\"/></c>\n\t<c path=\"openfl.events.KeyboardEvent\"/>\n\t<x path=\"Void\"/>\n</f></executeList>\n\t<addToList set=\"method\" line=\"153\"><f a=\"lookup:key:shortcut\">\n\t<d/>\n\t<d/>\n\t<c path=\"robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut\"/>\n\t<c path=\"Array\"><c path=\"robotlegs.bender.extensions.imag.impl.services.keyboard.Shortcut\"/></c>\n</f></addToList>\n\t<traceKeyIDs public=\"1\" get=\"accessor\" set=\"accessor\"><x path=\"Bool\"/></traceKeyIDs>\n\t<get_traceKeyIDs public=\"1\" set=\"method\" line=\"176\"><f a=\"\"><x path=\"Bool\"/></f></get_traceKeyIDs>\n\t<set_traceKeyIDs public=\"1\" set=\"method\" line=\"181\"><f a=\"value\">\n\t<x path=\"Bool\"/>\n\t<x path=\"Bool\"/>\n</f></set_traceKeyIDs>\n\t<new public=\"1\" set=\"method\" line=\"34\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap.ACTION_DOWN = "keyDown";
robotlegs.bender.extensions.imag.impl.services.keyboard.KeyboardMap.ACTION_UP = "keyUp";
robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal.__rtti = "<class path=\"robotlegs.bender.extensions.imag.impl.signals.AppSetupCompleteSignal\" params=\"\">\n\t<extends path=\"msignal.Signal0\"/>\n\t<new public=\"1\" set=\"method\" line=\"14\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal.__rtti = "<class path=\"robotlegs.bender.extensions.imag.impl.signals.InitializeAppSignal\" params=\"\">\n\t<extends path=\"msignal.Signal0\"/>\n\t<new public=\"1\" set=\"method\" line=\"14\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal.__rtti = "<class path=\"robotlegs.bender.extensions.imag.impl.signals.LoadConfigSignal\" params=\"\">\n\t<extends path=\"msignal.Signal0\"/>\n\t<new public=\"1\" set=\"method\" line=\"14\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.localEventMap.impl.EventMap.__rtti = "<class path=\"robotlegs.bender.extensions.localEventMap.impl.EventMap\" params=\"\">\n\t<implements path=\"robotlegs.bender.extensions.localEventMap.api.IEventMap\"/>\n\t<_listeners line=\"27\"><c path=\"Array\"><c path=\"robotlegs.bender.extensions.localEventMap.impl.EventMapConfig\"/></c></_listeners>\n\t<_suspendedListeners line=\"29\"><c path=\"Array\"><c path=\"robotlegs.bender.extensions.localEventMap.impl.EventMapConfig\"/></c></_suspendedListeners>\n\t<_suspended line=\"31\"><x path=\"Bool\"/></_suspended>\n\t<mapListener public=\"1\" set=\"method\" line=\"40\"><f a=\"dispatcher:eventString:listener:?eventClass:?useCapture:?priority:?useWeakReference\" v=\":::null:false:0:true\">\n\t<c path=\"openfl.events.IEventDispatcher\"/>\n\t<c path=\"String\"/>\n\t<d/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Bool\"/>\n\t<x path=\"Int\"/>\n\t<x path=\"Bool\"/>\n\t<x path=\"Void\"/>\n</f></mapListener>\n\t<unmapListener public=\"1\" set=\"method\" line=\"89\"><f a=\"dispatcher:eventString:listener:?eventClass:?useCapture\" v=\":::null:false\">\n\t<c path=\"openfl.events.IEventDispatcher\"/>\n\t<c path=\"String\"/>\n\t<d/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Bool\"/>\n\t<x path=\"Void\"/>\n</f></unmapListener>\n\t<unmapListeners public=\"1\" set=\"method\" line=\"120\"><f a=\"\"><x path=\"Void\"/></f></unmapListeners>\n\t<suspend public=\"1\" set=\"method\" line=\"139\"><f a=\"\"><x path=\"Void\"/></f></suspend>\n\t<resume public=\"1\" set=\"method\" line=\"159\"><f a=\"\"><x path=\"Void\"/></f></resume>\n\t<routeEventToListener set=\"method\" line=\"187\"><f a=\"event:listener:originalEventClass\">\n\t<c path=\"openfl.events.Event\"/>\n\t<d/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></routeEventToListener>\n\t<new public=\"1\" set=\"method\" line=\"20\">\n\t\t<f a=\"\"><x path=\"Void\"/></f>\n\t\t<meta><m n=\":compilerGenerated\"/></meta>\n\t</new>\n\t<meta>\n\t\t<m n=\":keepSub\"/>\n\t\t<m n=\":rtti\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.matching.TypeMatcherError.EMPTY_MATCHER = "An empty matcher will create a filter which matches nothing. You should specify at least one condition for the filter.";
robotlegs.bender.extensions.matching.TypeMatcherError.SEALED_MATCHER = "This matcher has been sealed and can no longer be configured.";
robotlegs.bender.extensions.mediatorMap.impl.MediatorManager.flexAvailable = false;
robotlegs.bender.extensions.mediatorMap.impl.MediatorManager.CREATION_COMPLETE = "creationComplete";
robotlegs.bender.extensions.mediatorMap.impl.MediatorMap.__rtti = "<class path=\"robotlegs.bender.extensions.mediatorMap.impl.MediatorMap\" params=\"\">\n\t<implements path=\"robotlegs.bender.extensions.viewManager.api.IViewHandler\"/>\n\t<implements path=\"robotlegs.bender.extensions.mediatorMap.api.IMediatorMap\"/>\n\t<_mappers line=\"34\"><x path=\"Map\">\n\t<c path=\"String\"/>\n\t<d/>\n</x></_mappers>\n\t<_logger><c path=\"robotlegs.bender.framework.api.ILogger\"/></_logger>\n\t<_factory><c path=\"robotlegs.bender.extensions.mediatorMap.impl.MediatorFactory\"/></_factory>\n\t<_viewHandler><c path=\"robotlegs.bender.extensions.mediatorMap.impl.MediatorViewHandler\"/></_viewHandler>\n\t<NULL_UNMAPPER line=\"42\"><c path=\"robotlegs.bender.extensions.mediatorMap.impl.NullMediatorUnmapper\"/></NULL_UNMAPPER>\n\t<mapMatcher public=\"1\" set=\"method\" line=\"65\"><f a=\"matcher\">\n\t<c path=\"robotlegs.bender.extensions.matching.ITypeMatcher\"/>\n\t<c path=\"robotlegs.bender.extensions.mediatorMap.dsl.IMediatorMapper\"/>\n</f></mapMatcher>\n\t<map public=\"1\" set=\"method\" line=\"78\"><f a=\"type\">\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"robotlegs.bender.extensions.mediatorMap.dsl.IMediatorMapper\"/>\n</f></map>\n\t<unmapMatcher public=\"1\" set=\"method\" line=\"86\"><f a=\"matcher\">\n\t<c path=\"robotlegs.bender.extensions.matching.ITypeMatcher\"/>\n\t<c path=\"robotlegs.bender.extensions.mediatorMap.dsl.IMediatorUnmapper\"/>\n</f></unmapMatcher>\n\t<unmap public=\"1\" set=\"method\" line=\"97\"><f a=\"type\">\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"robotlegs.bender.extensions.mediatorMap.dsl.IMediatorUnmapper\"/>\n</f></unmap>\n\t<handleView public=\"1\" set=\"method\" line=\"105\"><f a=\"view:type\">\n\t<c path=\"openfl.display.DisplayObject\"/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></handleView>\n\t<mediate public=\"1\" set=\"method\" line=\"113\"><f a=\"item\">\n\t<d/>\n\t<x path=\"Void\"/>\n</f></mediate>\n\t<unmediate public=\"1\" set=\"method\" line=\"121\"><f a=\"item\">\n\t<d/>\n\t<x path=\"Void\"/>\n</f></unmediate>\n\t<unmediateAll public=\"1\" set=\"method\" line=\"129\"><f a=\"\"><x path=\"Void\"/></f></unmediateAll>\n\t<createMapper set=\"method\" line=\"138\"><f a=\"matcher\">\n\t<c path=\"robotlegs.bender.extensions.matching.ITypeMatcher\"/>\n\t<c path=\"robotlegs.bender.extensions.mediatorMap.dsl.IMediatorMapper\"/>\n</f></createMapper>\n\t<new public=\"1\" set=\"method\" line=\"51\"><f a=\"context\">\n\t<c path=\"robotlegs.bender.framework.api.IContext\"/>\n\t<x path=\"Void\"/>\n</f></new>\n\t<meta>\n\t\t<m n=\":keepSub\"/>\n\t\t<m n=\":rtti\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.modularity.impl.ModularContextEvent.CONTEXT_ADD = "contextAdd";
robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandMap.__rtti = "<class path=\"robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandMap\" params=\"\">\n\t<implements path=\"robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap\"/>\n\t<_mappingProcessors line=\"31\"><c path=\"Array\"><d/></c></_mappingProcessors>\n\t<_injector><c path=\"robotlegs.bender.framework.api.IInjector\"/></_injector>\n\t<_triggerMap><c path=\"robotlegs.bender.extensions.commandCenter.impl.CommandTriggerMap\"/></_triggerMap>\n\t<_logger><c path=\"robotlegs.bender.framework.api.ILogger\"/></_logger>\n\t<map public=\"1\" set=\"method\" line=\"60\"><f a=\"signalClass\">\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"robotlegs.bender.extensions.commandCenter.dsl.ICommandMapper\"/>\n</f></map>\n\t<unmap public=\"1\" set=\"method\" line=\"68\"><f a=\"signalClass\">\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"robotlegs.bender.extensions.commandCenter.dsl.ICommandUnmapper\"/>\n</f></unmap>\n\t<addMappingProcessor public=\"1\" set=\"method\" line=\"73\"><f a=\"handler\">\n\t<d/>\n\t<c path=\"robotlegs.bender.extensions.signalCommandMap.api.ISignalCommandMap\"/>\n</f></addMappingProcessor>\n\t<getTrigger set=\"method\" line=\"84\"><f a=\"signalClass\">\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"robotlegs.bender.extensions.signalCommandMap.impl.SignalCommandTrigger\"/>\n</f></getTrigger>\n\t<getKey set=\"method\" line=\"89\"><f a=\"signalClass\">\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"String\"/>\n</f></getKey>\n\t<createTrigger set=\"method\" line=\"94\"><f a=\"signalClass\">\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"robotlegs.bender.extensions.commandCenter.api.ICommandTrigger\"/>\n</f></createTrigger>\n\t<new public=\"1\" set=\"method\" line=\"46\"><f a=\"context\">\n\t<c path=\"robotlegs.bender.framework.api.IContext\"/>\n\t<x path=\"Void\"/>\n</f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.stage3D.away3d.impl.Away3DInitializerAvailable.__rtti = "<class path=\"robotlegs.bender.extensions.stage3D.away3d.impl.Away3DInitializerAvailable\" params=\"\">\n\t<Away3DInitializerAvailable public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><x path=\"Void\"/></f></Away3DInitializerAvailable>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.stage3D.base.impl.Renderer.__meta__ = { fields : { contextView : { inject : null}, viewport : { inject : null}}};
robotlegs.bender.extensions.stage3D.base.impl.Renderer.__rtti = "<class path=\"robotlegs.bender.extensions.stage3D.base.impl.Renderer\" params=\"\">\n\t<implements path=\"robotlegs.bender.extensions.stage3D.base.api.IRenderer\"/>\n\t<_injector><c path=\"robotlegs.bender.framework.api.IInjector\"/></_injector>\n\t<_logger><c path=\"robotlegs.bender.framework.api.ILogger\"/></_logger>\n\t<_onReady line=\"29\"><c path=\"msignal.Signal0\"/></_onReady>\n\t<contextView public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.contextView.ContextView\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</contextView>\n\t<viewport public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.stage3D.base.api.IViewport\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</viewport>\n\t<layers line=\"34\"><c path=\"Array\"><c path=\"robotlegs.bender.extensions.stage3D.base.api.ILayer\"/></c></layers>\n\t<_profile><d/></_profile>\n\t<freeFreeStage3DIndex line=\"38\"><x path=\"Int\"/></freeFreeStage3DIndex>\n\t<_stage3D><c path=\"openfl.display.Stage3D\"/></_stage3D>\n\t<onReady public=\"1\" get=\"accessor\" set=\"null\"><c path=\"msignal.Signal0\"/></onReady>\n\t<stage3D public=\"1\" get=\"accessor\" set=\"null\"><c path=\"openfl.display.Stage3D\"/></stage3D>\n\t<profile public=\"1\" get=\"accessor\" set=\"null\"><c path=\"String\"/></profile>\n\t<Renderer public=\"1\" set=\"method\" line=\"48\"><f a=\"context\">\n\t<c path=\"robotlegs.bender.framework.api.IContext\"/>\n\t<x path=\"Void\"/>\n</f></Renderer>\n\t<init public=\"1\" set=\"method\" line=\"54\"><f a=\"profile:?antiAlias\" v=\":0\">\n\t<d/>\n\t<x path=\"Int\"/>\n\t<x path=\"Void\"/>\n</f></init>\n\t<contextCreatedHandler set=\"method\" line=\"68\"><f a=\"e\">\n\t<c path=\"openfl.events.Event\"/>\n\t<x path=\"Void\"/>\n</f></contextCreatedHandler>\n\t<OnViewportChange set=\"method\" line=\"79\"><f a=\"\"><x path=\"Void\"/></f></OnViewportChange>\n\t<start public=\"1\" set=\"method\" line=\"94\"><f a=\"\"><x path=\"Void\"/></f></start>\n\t<stop public=\"1\" set=\"method\" line=\"99\"><f a=\"\"><x path=\"Void\"/></f></stop>\n\t<addLayer public=\"1\" set=\"method\" line=\"104\"><f a=\"layer\">\n\t<c path=\"robotlegs.bender.extensions.stage3D.base.api.ILayer\"/>\n\t<x path=\"Void\"/>\n</f></addLayer>\n\t<addLayerAt public=\"1\" set=\"method\" line=\"109\"><f a=\"layer:index\">\n\t<c path=\"robotlegs.bender.extensions.stage3D.base.api.ILayer\"/>\n\t<x path=\"Int\"/>\n\t<x path=\"Void\"/>\n</f></addLayerAt>\n\t<removeLayer public=\"1\" set=\"method\" line=\"131\"><f a=\"layer\">\n\t<c path=\"robotlegs.bender.extensions.stage3D.base.api.ILayer\"/>\n\t<x path=\"Void\"/>\n</f></removeLayer>\n\t<render public=\"1\" set=\"method\" line=\"142\"><f a=\"\"><x path=\"Void\"/></f></render>\n\t<Update set=\"method\" line=\"147\"><f a=\"e\">\n\t<c path=\"openfl.events.Event\"/>\n\t<x path=\"Void\"/>\n</f></Update>\n\t<get_onReady public=\"1\" set=\"method\" line=\"162\"><f a=\"\"><c path=\"msignal.Signal0\"/></f></get_onReady>\n\t<get_stage3D public=\"1\" set=\"method\" line=\"167\"><f a=\"\"><c path=\"openfl.display.Stage3D\"/></f></get_stage3D>\n\t<get_profile public=\"1\" set=\"method\" line=\"173\"><f a=\"\"><c path=\"String\"/></f></get_profile>\n\t<new public=\"1\" set=\"method\" line=\"22\">\n\t\t<f a=\"\"><x path=\"Void\"/></f>\n\t\t<meta><m n=\":compilerGenerated\"/></meta>\n\t</new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.stage3D.base.impl.Stack.__meta__ = { fields : { contextView : { inject : null}, renderer : { inject : null}, away3DInitializerAvailable : { inject : ["optional=true"]}}};
robotlegs.bender.extensions.stage3D.base.impl.Stack.__rtti = "<class path=\"robotlegs.bender.extensions.stage3D.base.impl.Stack\" params=\"\">\n\t<implements path=\"robotlegs.bender.extensions.stage3D.base.api.IStack\"/>\n\t<_injector><c path=\"robotlegs.bender.framework.api.IInjector\"/></_injector>\n\t<_logger><c path=\"robotlegs.bender.framework.api.ILogger\"/></_logger>\n\t<context><c path=\"robotlegs.bender.framework.api.IContext\"/></context>\n\t<_debug line=\"28\"><x path=\"Bool\"/></_debug>\n\t<classIDs><c path=\"Array\"><c path=\"Array\"><c path=\"String\"/></c></c></classIDs>\n\t<initialized line=\"30\"><x path=\"Bool\"/></initialized>\n\t<debug public=\"1\" get=\"accessor\" set=\"accessor\"><x path=\"Bool\"/></debug>\n\t<contextView public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.contextView.ContextView\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</contextView>\n\t<renderer public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.stage3D.base.api.IRenderer\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</renderer>\n\t<away3DInitializerAvailable public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.stage3D.away3d.impl.Away3DInitializerAvailable\"/>\n\t\t<meta><m n=\"inject\"><e>\"optional=true\"</e></m></meta>\n\t</away3DInitializerAvailable>\n\t<alternativa3DInitializer public=\"1\"><c path=\"robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer\"/></alternativa3DInitializer>\n\t<away3DInitializer public=\"1\"><c path=\"robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer\"/></away3DInitializer>\n\t<flare3DInitializer public=\"1\"><c path=\"robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer\"/></flare3DInitializer>\n\t<genomeInitializer public=\"1\"><c path=\"robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer\"/></genomeInitializer>\n\t<starlingInitializer public=\"1\"><c path=\"robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer\"/></starlingInitializer>\n\t<zest3DInitializer public=\"1\"><c path=\"robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer\"/></zest3DInitializer>\n\t<initialize set=\"method\" line=\"69\"><f a=\"\"><x path=\"Void\"/></f></initialize>\n\t<createInitializer set=\"method\" line=\"82\"><f a=\"classAlias\">\n\t<c path=\"String\"/>\n\t<c path=\"robotlegs.bender.extensions.stage3D.base.impl.BaseInitializer\"/>\n</f></createInitializer>\n\t<addLayer public=\"1\" set=\"method\" line=\"105\"><f a=\"LayerClass:?id\" v=\":''\">\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"String\"/>\n\t<x path=\"Void\"/>\n</f></addLayer>\n\t<addLayerAt public=\"1\" set=\"method\" line=\"110\"><f a=\"LayerClass:index:?id\" v=\"::''\">\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Int\"/>\n\t<c path=\"String\"/>\n\t<x path=\"Void\"/>\n</f></addLayerAt>\n\t<addAway3DAt set=\"method\" line=\"146\"><f a=\"AwayClass:index:?id\" v=\"::''\">\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Int\"/>\n\t<c path=\"String\"/>\n\t<x path=\"Void\"/>\n</f></addAway3DAt>\n\t<get_debug public=\"1\" set=\"method\" line=\"193\"><f a=\"\"><x path=\"Bool\"/></f></get_debug>\n\t<set_debug public=\"1\" set=\"method\" line=\"198\"><f a=\"value\">\n\t<x path=\"Bool\"/>\n\t<x path=\"Bool\"/>\n</f></set_debug>\n\t<errorMsg set=\"method\" line=\"207\"><f a=\"index\">\n\t<x path=\"Int\"/>\n\t<c path=\"String\"/>\n</f></errorMsg>\n\t<new public=\"1\" set=\"method\" line=\"54\"><f a=\"context\">\n\t<c path=\"robotlegs.bender.framework.api.IContext\"/>\n\t<x path=\"Void\"/>\n</f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.stage3D.base.impl.Viewport.__meta__ = { fields : { contextView : { inject : null}}};
robotlegs.bender.extensions.stage3D.base.impl.Viewport.__rtti = "<class path=\"robotlegs.bender.extensions.stage3D.base.impl.Viewport\" params=\"\">\n\t<implements path=\"robotlegs.bender.extensions.stage3D.base.api.IViewport\"/>\n\t<_injector><c path=\"robotlegs.bender.framework.api.IInjector\"/></_injector>\n\t<_logger><c path=\"robotlegs.bender.framework.api.ILogger\"/></_logger>\n\t<contextView public=\"1\">\n\t\t<c path=\"robotlegs.bender.extensions.contextView.ContextView\"/>\n\t\t<meta><m n=\"inject\"/></meta>\n\t</contextView>\n\t<_rect line=\"27\"><c path=\"openfl.geom.Rectangle\"/></_rect>\n\t<lastRect line=\"28\"><c path=\"openfl.geom.Rectangle\"/></lastRect>\n\t<_onChange line=\"30\"><c path=\"msignal.Signal0\"/></_onChange>\n\t<rect public=\"1\" get=\"accessor\" set=\"accessor\"><c path=\"openfl.geom.Rectangle\"/></rect>\n\t<onChange public=\"1\" get=\"accessor\" set=\"null\"><c path=\"msignal.Signal0\"/></onChange>\n\t<Viewport public=\"1\" set=\"method\" line=\"38\"><f a=\"context\">\n\t<c path=\"robotlegs.bender.framework.api.IContext\"/>\n\t<x path=\"Void\"/>\n</f></Viewport>\n\t<init public=\"1\" set=\"method\" line=\"45\"><f a=\"\"><x path=\"Void\"/></f></init>\n\t<CheckForChange set=\"method\" line=\"50\"><f a=\"e\">\n\t<c path=\"openfl.events.Event\"/>\n\t<x path=\"Void\"/>\n</f></CheckForChange>\n\t<get_rect public=\"1\" set=\"method\" line=\"59\"><f a=\"\"><c path=\"openfl.geom.Rectangle\"/></f></get_rect>\n\t<set_rect public=\"1\" set=\"method\" line=\"64\"><f a=\"value\">\n\t<c path=\"openfl.geom.Rectangle\"/>\n\t<c path=\"openfl.geom.Rectangle\"/>\n</f></set_rect>\n\t<get_onChange public=\"1\" set=\"method\" line=\"70\"><f a=\"\"><c path=\"msignal.Signal0\"/></f></get_onChange>\n\t<new public=\"1\" set=\"method\" line=\"17\">\n\t\t<f a=\"\"><x path=\"Void\"/></f>\n\t\t<meta><m n=\":compilerGenerated\"/></meta>\n\t</new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.viewManager.impl.ConfigureViewEvent.CONFIGURE_VIEW = "configureView";
robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent.BINDING_EMPTY = "bindingEmpty";
robotlegs.bender.extensions.viewManager.impl.ContainerRegistry.__rtti = "<class path=\"robotlegs.bender.extensions.viewManager.impl.ContainerRegistry\" params=\"\">\n\t<extends path=\"openfl.events.EventDispatcher\"/>\n\t<bindings public=\"1\" get=\"accessor\" set=\"null\" line=\"32\"><c path=\"Array\"><c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBinding\"/></c></bindings>\n\t<get_bindings public=\"1\" set=\"method\" line=\"36\"><f a=\"\"><c path=\"Array\"><c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBinding\"/></c></f></get_bindings>\n\t<rootBindings public=\"1\" get=\"accessor\" set=\"null\" line=\"42\"><c path=\"Array\"><c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBinding\"/></c></rootBindings>\n\t<get_rootBindings public=\"1\" set=\"method\" line=\"47\"><f a=\"\"><c path=\"Array\"><c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBinding\"/></c></f></get_rootBindings>\n\t<_bindingByContainer line=\"56\"><x path=\"Map\">\n\t<c path=\"openfl.display.DisplayObject\"/>\n\t<d/>\n</x></_bindingByContainer>\n\t<addContainer public=\"1\" set=\"method\" line=\"65\"><f a=\"container\">\n\t<c path=\"openfl.display.DisplayObjectContainer\"/>\n\t<c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBinding\"/>\n</f></addContainer>\n\t<removeContainer public=\"1\" set=\"method\" line=\"78\"><f a=\"container\">\n\t<c path=\"openfl.display.DisplayObjectContainer\"/>\n\t<c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBinding\"/>\n</f></removeContainer>\n\t<findParentBinding public=\"1\" set=\"method\" line=\"90\"><f a=\"target\">\n\t<c path=\"openfl.display.DisplayObject\"/>\n\t<c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBinding\"/>\n</f></findParentBinding>\n\t<getBinding public=\"1\" set=\"method\" line=\"108\"><f a=\"container\">\n\t<c path=\"openfl.display.DisplayObjectContainer\"/>\n\t<c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBinding\"/>\n</f></getBinding>\n\t<createBinding set=\"method\" line=\"117\"><f a=\"container\">\n\t<c path=\"openfl.display.DisplayObjectContainer\"/>\n\t<c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBinding\"/>\n</f></createBinding>\n\t<removeBinding set=\"method\" line=\"156\"><f a=\"binding\">\n\t<c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBinding\"/>\n\t<x path=\"Void\"/>\n</f></removeBinding>\n\t<addRootBinding set=\"method\" line=\"191\"><f a=\"binding\">\n\t<c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBinding\"/>\n\t<x path=\"Void\"/>\n</f></addRootBinding>\n\t<removeRootBinding set=\"method\" line=\"197\"><f a=\"binding\">\n\t<c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBinding\"/>\n\t<x path=\"Void\"/>\n</f></removeRootBinding>\n\t<onBindingEmpty set=\"method\" line=\"204\"><f a=\"event\">\n\t<c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerBindingEvent\"/>\n\t<x path=\"Void\"/>\n</f></onBindingEmpty>\n\t<new public=\"1\" set=\"method\" line=\"24\"><f a=\"?target\">\n\t<c path=\"openfl.events.IEventDispatcher\"/>\n\t<x path=\"Void\"/>\n</f></new>\n\t<meta>\n\t\t<m n=\":meta\"><e>'???'</e></m>\n\t\t<m n=\":meta\"><e>'???'</e></m>\n\t\t<m n=\":meta\"><e>'???'</e></m>\n\t\t<m n=\":meta\"><e>'???'</e></m>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.CONTAINER_ADD = "containerAdd";
robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.CONTAINER_REMOVE = "containerRemove";
robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.ROOT_CONTAINER_ADD = "rootContainerAdd";
robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent.ROOT_CONTAINER_REMOVE = "rootContainerRemove";
robotlegs.bender.extensions.viewManager.impl.ViewManager.__rtti = "<class path=\"robotlegs.bender.extensions.viewManager.impl.ViewManager\" params=\"\">\n\t<extends path=\"openfl.events.EventDispatcher\"/>\n\t<implements path=\"robotlegs.bender.extensions.viewManager.api.IViewManager\"/>\n\t<containers public=\"1\" get=\"accessor\" set=\"null\" line=\"33\"><c path=\"Array\"><c path=\"openfl.display.DisplayObjectContainer\"/></c></containers>\n\t<get_containers public=\"1\" set=\"method\" line=\"34\"><f a=\"\"><c path=\"Array\"><c path=\"openfl.display.DisplayObjectContainer\"/></c></f></get_containers>\n\t<_handlers line=\"50\"><c path=\"Array\"><c path=\"robotlegs.bender.extensions.viewManager.api.IViewHandler\"/></c></_handlers>\n\t<_registry><c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerRegistry\"/></_registry>\n\t<addContainer public=\"1\" set=\"method\" line=\"74\"><f a=\"container\">\n\t<c path=\"openfl.display.DisplayObjectContainer\"/>\n\t<x path=\"Void\"/>\n</f></addContainer>\n\t<removeContainer public=\"1\" set=\"method\" line=\"91\"><f a=\"container\">\n\t<c path=\"openfl.display.DisplayObjectContainer\"/>\n\t<x path=\"Void\"/>\n</f></removeContainer>\n\t<addViewHandler public=\"1\" set=\"method\" line=\"110\"><f a=\"handler\">\n\t<c path=\"robotlegs.bender.extensions.viewManager.api.IViewHandler\"/>\n\t<x path=\"Void\"/>\n</f></addViewHandler>\n\t<removeViewHandler public=\"1\" set=\"method\" line=\"127\"><f a=\"handler\">\n\t<c path=\"robotlegs.bender.extensions.viewManager.api.IViewHandler\"/>\n\t<x path=\"Void\"/>\n</f></removeViewHandler>\n\t<removeAllHandlers public=\"1\" set=\"method\" line=\"145\"><f a=\"\"><x path=\"Void\"/></f></removeAllHandlers>\n\t<validContainer set=\"method\" line=\"161\"><f a=\"container\">\n\t<c path=\"openfl.display.DisplayObjectContainer\"/>\n\t<x path=\"Bool\"/>\n</f></validContainer>\n\t<new public=\"1\" set=\"method\" line=\"61\"><f a=\"containerRegistry\">\n\t<c path=\"robotlegs.bender.extensions.viewManager.impl.ContainerRegistry\"/>\n\t<x path=\"Void\"/>\n</f></new>\n\t<meta>\n\t\t<m n=\":meta\"><e>'???'</e></m>\n\t\t<m n=\":meta\"><e>'???'</e></m>\n\t\t<m n=\":meta\"><e>'???'</e></m>\n\t\t<m n=\":meta\"><e>'???'</e></m>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.CONTAINER_ADD = "containerAdd";
robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.CONTAINER_REMOVE = "containerRemove";
robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.HANDLER_ADD = "handlerAdd";
robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent.HANDLER_REMOVE = "handlerRemove";
robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMap.__rtti = "<class path=\"robotlegs.bender.extensions.viewProcessorMap.impl.ViewProcessorMap\" params=\"\">\n\t<implements path=\"robotlegs.bender.extensions.viewManager.api.IViewHandler\"/>\n\t<implements path=\"robotlegs.bender.extensions.viewProcessorMap.api.IViewProcessorMap\"/>\n\t<_mappers line=\"32\"><x path=\"Map\">\n\t<c path=\"String\"/>\n\t<d/>\n</x></_mappers>\n\t<_handler><c path=\"robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorViewHandler\"/></_handler>\n\t<NULL_UNMAPPER line=\"36\"><c path=\"robotlegs.bender.extensions.viewProcessorMap.impl.NullViewProcessorUnmapper\"/></NULL_UNMAPPER>\n\t<mapMatcher public=\"1\" set=\"method\" line=\"58\"><f a=\"matcher\">\n\t<c path=\"robotlegs.bender.extensions.matching.ITypeMatcher\"/>\n\t<c path=\"robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapper\"/>\n</f></mapMatcher>\n\t<map public=\"1\" set=\"method\" line=\"70\"><f a=\"type\">\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapper\"/>\n</f></map>\n\t<unmapMatcher public=\"1\" set=\"method\" line=\"79\"><f a=\"matcher\">\n\t<c path=\"robotlegs.bender.extensions.matching.ITypeMatcher\"/>\n\t<c path=\"robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorUnmapper\"/>\n</f></unmapMatcher>\n\t<unmap public=\"1\" set=\"method\" line=\"89\"><f a=\"type\">\n\t<x path=\"Class\"><d/></x>\n\t<c path=\"robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorUnmapper\"/>\n</f></unmap>\n\t<process public=\"1\" set=\"method\" line=\"98\"><f a=\"item\">\n\t<d/>\n\t<x path=\"Void\"/>\n</f></process>\n\t<unprocess public=\"1\" set=\"method\" line=\"107\"><f a=\"item\">\n\t<d/>\n\t<x path=\"Void\"/>\n</f></unprocess>\n\t<handleView public=\"1\" set=\"method\" line=\"116\"><f a=\"view:type\">\n\t<c path=\"openfl.display.DisplayObject\"/>\n\t<x path=\"Class\"><d/></x>\n\t<x path=\"Void\"/>\n</f></handleView>\n\t<createMapper set=\"method\" line=\"125\"><f a=\"matcher\">\n\t<c path=\"robotlegs.bender.extensions.matching.ITypeMatcher\"/>\n\t<c path=\"robotlegs.bender.extensions.viewProcessorMap.dsl.IViewProcessorMapper\"/>\n</f></createMapper>\n\t<new public=\"1\" set=\"method\" line=\"45\"><f a=\"factory:?handler\" v=\":null\">\n\t<c path=\"robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorFactory\"/>\n\t<c path=\"robotlegs.bender.extensions.viewProcessorMap.impl.IViewProcessorViewHandler\"/>\n\t<x path=\"Void\"/>\n</f></new>\n\t<meta>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":keepSub\"/>\n\t</meta>\n</class>";
robotlegs.bender.extensions.vigilance.MetadataChecker.__meta__ = { fields : { context : { inject : ["optional=true"]}}};
robotlegs.bender.extensions.vigilance.MetadataChecker.__rtti = "<class path=\"robotlegs.bender.extensions.vigilance.MetadataChecker\" params=\"\" module=\"robotlegs.bender.extensions.vigilance.VigilanceExtension\">\n\t<context public=\"1\">\n\t\t<c path=\"robotlegs.bender.framework.api.IContext\"/>\n\t\t<meta><m n=\"inject\"><e>\"optional=true\"</e></m></meta>\n\t</context>\n\t<check public=\"1\" set=\"method\" line=\"79\"><f a=\"\"><x path=\"Void\"/></f></check>\n\t<meta>\n\t\t<m n=\":keepSub\"/>\n\t\t<m n=\":rtti\"/>\n\t</meta>\n</class>";
robotlegs.bender.framework.api.LifecycleError.SYNC_HANDLER_ARG_MISMATCH = "When and After handlers must accept 0 or 1 arguments";
robotlegs.bender.framework.api.LifecycleError.LATE_HANDLER_ERROR_MESSAGE = "Handler added late and will never fire";
robotlegs.bender.framework.api.LifecycleState.UNINITIALIZED = "uninitialized";
robotlegs.bender.framework.api.LifecycleState.INITIALIZING = "initializing";
robotlegs.bender.framework.api.LifecycleState.ACTIVE = "active";
robotlegs.bender.framework.api.LifecycleState.SUSPENDING = "suspending";
robotlegs.bender.framework.api.LifecycleState.SUSPENDED = "suspended";
robotlegs.bender.framework.api.LifecycleState.RESUMING = "resuming";
robotlegs.bender.framework.api.LifecycleState.DESTROYING = "destroying";
robotlegs.bender.framework.api.LifecycleState.DESTROYED = "destroyed";
robotlegs.bender.framework.api.LogLevel.FATAL = 2;
robotlegs.bender.framework.api.LogLevel.ERROR = 4;
robotlegs.bender.framework.api.LogLevel.WARN = 8;
robotlegs.bender.framework.api.LogLevel.INFO = 16;
robotlegs.bender.framework.api.LogLevel.DEBUG = 32;
robotlegs.bender.framework.api.LogLevel.NAME = [0,0,"FATAL",0,"ERROR",0,0,0,"WARN",0,0,0,0,0,0,0,"INFO",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"DEBUG"];
robotlegs.bender.framework.api.PinEvent.DETAIN = "detain";
robotlegs.bender.framework.api.PinEvent.RELEASE = "release";
ApplicationMain.main();
})(typeof window != "undefined" ? window : exports);
