/*
 * Copyright 2023. Huawei Technologies Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class EventEmitter {
  constructor(maxListeners) {
	this.events = {};
	this.maxListeners = maxListeners || 10;
  }

  // 监听事件
  on(eventName, callback) {
	if (!this.events[eventName]) {
	  this.events[eventName] = [];
	}

	if (this.events[eventName].length >= this.maxListeners) {
	  console.warn(
		`Possible EventEmitter memory leak detected. ${this.events[eventName].length} ${eventName} listeners added. Use emitter.setMaxListeners() to increase limit`,
	  );
	}

	this.events[eventName].push(callback);

	return this; // 支持链式调用
  }

  // 触发事件
  emit(eventName, ...args) {
	if (this.events[eventName]) {
	  this.events[eventName].forEach((callback) => {
		callback.apply(this, args);
	  });

	  return this; // 支持链式调用
	}
  }

  // 取消订阅
  off(eventName, callback) {
	if (!callback) {
	  this.events[eventName] = [];
	}
	if (this.events[eventName]) {
	  this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
	}

	return this; // 支持链式调用
  }

  // 只执行一次
  once(eventName, callback) {
	const onceCallback = (...args) => {
	  this.off(eventName, onceCallback);
	  callback.apply(this, args);
	};
	this.on(eventName, onceCallback);

	return this; // 支持链式调用
  }
}