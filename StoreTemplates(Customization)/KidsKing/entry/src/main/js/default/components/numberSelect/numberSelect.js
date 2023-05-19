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

export default {
  props: {
	min: {
	  default: 1,
	},
	max: {
	  default: 99,
	},
	numbers: {
	  default: 1,
	},
	id: {
	  default: 0
	}
  },
  computed: {
	minusDisabled() {
	  return this.numbers <= this.min
	},
	plusDisabled() {
	  return this.numbers >= this.max
	}
  },
  handleMinus() {
	this.$emit('onMinus');
  },
  handlePlus() {
	this.$emit('onPlus');
  },
}
