/**
 * 保留插入顺序的HashMap
 */
var LinkedHashMap = function() {
	this.array = [];
	this.map = {};
}
LinkedHashMap.prototype = {
	/**
	 * 判断是否存在
	 */
	hs : function(key, value) {
		var key = key || null, value = value || null, me = this;
		if(key == null) {
			if(value != null) {
				for(var p in me.map) {
					if(me.map[p] == value) {
						return true;
					}
				}
			}
		} else {
			if( key in me.map) {
				return true;
			}
		}
		return false;
	},
	/**
	 * 添加
	 */
	ad : function(key, value) {
		var value = value || null;
		var key = key || null;
		var me = this;
		if(key == null) {
			return;
		}
		if( key in me.map) {
			me.map[key] = value;
		} else {
			me.array.push(key);
			me.map[key] = value;
		}
	},
	/**
	 * 删除
	 */
	rm : function(key) {
		var key = key || null;
		var me = this;
		if( key in me.map) {
			delete me.map[key];
			for(var i = 0; i < me.array.length; i++) {
				if(me.array[i] == key) {
					me.array.splice(i, 1);
					break;
				}
			}
		}
	},
	/**
	 * 从第一个删到找到的key
	 */
	rmTill : function(key) {
		var me = this, delIndex = -1;
		for(var i = 0; i < me.array.length; i++) {
			if(me.array[i] == key) {
				delIndex = i;
				break;
			}
		}
		if(delIndex > -1) {
			for(var i = 0; i <= delIndex; i++) {
				delete me.map[me.array[i]];
			}
			me.array.splice(0, delIndex + 1);
		}
	},
	/**
	 * 从找到的key开始，删除到结尾
	 */
	rmFrom : function(key) {
		var me = this;
		for(var i = 0; i < me.array.length; i++) {
			if(me.array[i] == key) {
				delIndex = i;
				break;
			}
		}
		if(delIndex > -1) {
			for(var i = delIndex; i < me.array.length; i++) {
				delete me.map[me.array[i]];
			}
			me.array.splice(delIndex, me.array.length - delIndex);
		}
	},
	/**
	 * 长度
	 */
	size : function() {
		return this.array.length;
	},
	/**
	 * 遍历
	 */
	each : function(fn, scope) {
		var me = this;
		var scope = scope || window;
		var fn = fn || null;
		if(fn == null || typeof (fn) != "function") {
			return;
		}
		for(var i = 0; i < me.array.length; i++) {
			var key = me.array[i];
			var value = me.map[key];
			var re = fn.call(scope, key, value, i, me.array, me.map);
			if(re == false) {
				break;
			}
		}
	},
	/**
	 * get
	 */
	get : function(key) {
		return this.map[key];
	},
	/**
	 * 排序
	 */
	sort : function(compare) {
		var me = this;
		me.array.sort(compare);
	}
};
$kit.SortMap = $kit.LinkedHashMap = LinkedHashMap;
