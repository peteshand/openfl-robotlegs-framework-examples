// =================================================================================================
//
//	Starling Framework
//	Copyright 2011 Gamua OG. All Rights Reserved.
//
//	This program is free software. You can redistribute and/or modify it
//	in accordance with the terms of the accompanying license agreement.
//
// =================================================================================================

package com.imag.core.behaviors.touch
{
	import away3d.entities.Entity;
	import flash.events.EventDispatcher;
    import flash.geom.Matrix;
    import flash.geom.Point;
    
    /** A Touch object contains information about the presence or movement of a finger 
     *  or the mouse on the screen.
     * 
     *  @see TouchEvent
     *  @see TouchPhase
     */  
    public class Touch
    {
        private var mID:int;
        private var mGlobalX:Number;
        private var mGlobalY:Number;
        private var mPreviousGlobalX:Number;
        private var mPreviousGlobalY:Number;
        private var mTapCount:int;
        private var mPhase:String;
        private var mTarget:Entity;
        private var mTimestamp:Number;
        private var mPressure:Number;
        private var mWidth:Number;
        private var mHeight:Number;
        private var mBubbleChain:Vector.<EventDispatcher>;
        
        /** Helper object. */
        private static var sHelperMatrix:Matrix = new Matrix();
        
        /** Creates a new Touch object. */
        public function Touch(id:int, globalX:Number, globalY:Number, phase:String, target:Entity)
        {
            mID = id;
            mGlobalX = mPreviousGlobalX = globalX;
            mGlobalY = mPreviousGlobalY = globalY;
            mTapCount = 0;
            mPhase = phase;
            mTarget = target;
            mPressure = mWidth = mHeight = 1.0;
            mBubbleChain = new <EventDispatcher>[];
            //updateBubbleChain();
        }
        
        /** Converts the current location of a touch to the local coordinate system of a display 
         *  object. If you pass a 'resultPoint', the result will be stored in this point instead 
         *  of creating a new object.*/
        /*public function getLocation(space:Entity, resultPoint:Point=null):Point
        {
            if (resultPoint == null) resultPoint = new Point();
            space.base.getTransformationMatrix(space, sHelperMatrix);
            return MatrixUtil.transformCoords(sHelperMatrix, mGlobalX, mGlobalY, resultPoint); 
        }
        
        /** Converts the previous location of a touch to the local coordinate system of a display 
         *  object. If you pass a 'resultPoint', the result will be stored in this point instead 
         *  of creating a new object.*/
        /*public function getPreviousLocation(space:Entity, resultPoint:Point=null):Point
        {
            if (resultPoint == null) resultPoint = new Point();
            space.base.getTransformationMatrix(space, sHelperMatrix);
            return MatrixUtil.transformCoords(sHelperMatrix, mPreviousGlobalX, mPreviousGlobalY, resultPoint);
        }
        
        /** Returns the movement of the touch between the current and previous location. 
         *  If you pass a 'resultPoint', the result will be stored in this point instead 
         *  of creating a new object. */ 
        /*public function getMovement(space:Entity, resultPoint:Point=null):Point
        {
            if (resultPoint == null) resultPoint = new Point();
            getLocation(space, resultPoint);
            var x:Number = resultPoint.x;
            var y:Number = resultPoint.y;
            getPreviousLocation(space, resultPoint);
            resultPoint.setTo(x - resultPoint.x, y - resultPoint.y);
            return resultPoint;
        }
        
        /** Indicates if the target or one of its children is touched. */ 
        /*public function isTouching(target:Entity):Boolean
        {
            return mBubbleChain.indexOf(target) != -1;
        }
        
        /** Returns a description of the object. */
        /*public function toString():String
        {
            return formatString("Touch {0}: globalX={1}, globalY={2}, phase={3}",
                                mID, mGlobalX, mGlobalY, mPhase);
        }
        
        /** Creates a clone of the Touch object. */
        public function clone():Touch
        {
            var clone:Touch = new Touch(mID, mGlobalX, mGlobalY, mPhase, mTarget);
            clone.mPreviousGlobalX = mPreviousGlobalX;
            clone.mPreviousGlobalY = mPreviousGlobalY;
            clone.mTapCount = mTapCount;
            clone.mTimestamp = mTimestamp;
            clone.mPressure = mPressure;
            clone.mWidth = mWidth;
            clone.mHeight = mHeight;
            return clone;
        }
        
        // helper methods
        
        /*private function updateBubbleChain():void
        {
            if (mTarget)
            {
                var length:int = 1;
                var element:Entity = mTarget;
                
                mBubbleChain.length = 1;
                mBubbleChain[0] = element;
                
                while ((element = element.parent) != null)
                    mBubbleChain[int(length++)] = element;
            }
            else
            {
                mBubbleChain.length = 0;
            }
        }
        
        // properties
        
        /** The identifier of a touch. '0' for mouse events, an increasing number for touches. */
        public function get id():int { return mID; }
        
        /** The x-position of the touch in stage coordinates. */
        public function get globalX():Number { return mGlobalX; }

        /** The y-position of the touch in stage coordinates. */
        public function get globalY():Number { return mGlobalY; }
		
		/** The x-position of the touch in stage coordinates. */
        public function set globalX(value:Number):void { mGlobalX = value; }

        /** The y-position of the touch in stage coordinates. */
        public function set globalY(value:Number):void { mGlobalY = value; }
        
        /** The previous x-position of the touch in stage coordinates. */
        public function get previousGlobalX():Number { return mPreviousGlobalX; }
        
        /** The previous y-position of the touch in stage coordinates. */
        public function get previousGlobalY():Number { return mPreviousGlobalY; }
        
        /** The number of taps the finger made in a short amount of time. Use this to detect 
         *  double-taps / double-clicks, etc. */ 
        public function get tapCount():int { return mTapCount; }
        
        /** The current phase the touch is in. @see TouchPhase */
        public function get phase():String { return mPhase; }
        
        /** The display object at which the touch occurred. */
        public function get target():Entity { return mTarget; }
        
        /** The moment the touch occurred (in seconds since application start). */
        public function get timestamp():Number { return mTimestamp; }
        
        /** A value between 0.0 and 1.0 indicating force of the contact with the device. 
         *  If the device does not support detecting the pressure, the value is 1.0. */ 
        public function get pressure():Number { return mPressure; }
        
        /** Width of the contact area. 
         *  If the device does not support detecting the pressure, the value is 1.0. */
        public function get width():Number { return mWidth; }
        
        /** Height of the contact area. 
         *  If the device does not support detecting the pressure, the value is 1.0. */
        public function get height():Number { return mHeight; }
        
        // internal methods
        
        /** @private 
         *  Dispatches a touch event along the current bubble chain (which is updated each time
         *  a target is set). */
        /*
		private function dispatchEvent(event:TouchEvent):void
        {
            if (mTarget) event.dispatch(mBubbleChain);
        }
        
        /** @private */
        /*private function get bubbleChain():Vector.<EventDispatcher>
        {
            return mBubbleChain.concat();
        }
        
        /** @private */
        /*private function setTarget(value:Entity):void 
        { 
            mTarget = value;
            updateBubbleChain();
        }
        
        /** @private */
        /*private function setPosition(globalX:Number, globalY:Number):void
        {
            mPreviousGlobalX = mGlobalX;
            mPreviousGlobalY = mGlobalY;
            mGlobalX = globalX;
            mGlobalY = globalY;
        }
        
        /** @private */
        /*private function setSize(width:Number, height:Number):void 
        { 
            mWidth = width;
            mHeight = height;
        }
        
        /** @private */
        //private function setPhase(value:String):void { mPhase = value; }
        
        /** @private */
       // private function setTapCount(value:int):void { mTapCount = value; }
        
        /** @private */
        //private function setTimestamp(value:Number):void { mTimestamp = value; }
        
        /** @private */
        //private function setPressure(value:Number):void { mPressure = value; }
    }
}