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

package com.huawei.scenicarea.util;

import java.security.AccessController;
import java.security.PrivilegedAction;
import java.util.Collection;
import java.util.Map;
import java.util.Set;

public final class JSONEncodeUtil {

    public static String toJson(final Object obj) throws Exception {
        if (obj == null) {
            return "null";
        }
        if (obj instanceof String) { // String
            return string2Json((String) obj);
        }
        if (obj instanceof Boolean) { // Boolean
            return boolean2Json((Boolean) obj);
        }
        if (obj instanceof Number) { // Number
            return number2Json((Number) obj);
        }
        if (obj instanceof Map) { // Map
            return map2Json((Map<String, Object>) obj);
        }
        if (obj instanceof Collection) { // List  Set
            return collection2Json((Collection) obj);
        }
        if (obj instanceof Object[]) { // 对象数组
            return array2Json((Object[]) obj);
        }

        String value = baseTypeArray2Json(obj);
        if (value != null) {
            return value;
        }
        return obj2Json(obj);
    }

    private static String baseTypeArray2Json(Object obj) {
        if (obj instanceof int[]) { // 基本类型数组
            return intArray2Json((int[]) obj);
        }
        if (obj instanceof boolean[]) { // 基本类型数组
            return booleanArray2Json((boolean[]) obj);
        }
        if (obj instanceof long[]) { // 基本类型数组
            return longArray2Json((long[]) obj);
        }
        if (obj instanceof float[]) { // 基本类型数组
            return floatArray2Json((float[]) obj);
        }
        if (obj instanceof double[]) { // 基本类型数组
            return doubleArray2Json((double[]) obj);
        }
        if (obj instanceof short[]) { // 基本类型数组
            return shortArray2Json((short[]) obj);
        }
        if (obj instanceof byte[]) { // 基本类型数组
            return byteArray2Json((byte[]) obj);
        }
        return null;
    }

    /**
     * 将 String 对象编码为 JSON格式，只需处理好特殊字符
     *
     * @param s String 对象
     * @return JSON格式
     */
    private static String string2Json(final String s) {
        final StringBuilder sb = new StringBuilder(s.length() + 20);
        sb.append('\"');
        for (int i = 0; i < s.length(); i++) {
            final char charValue = s.charAt(i);
            switch (charValue) {
                case '\"':
                    sb.append("\\\"");
                    break;
                case '\\':
                    sb.append("\\\\");
                    break;
                case '/':
                    sb.append("\\/");
                    break;
                case '\b':
                    sb.append("\\b");
                    break;
                case '\f':
                    sb.append("\\f");
                    break;
                case '\n':
                    sb.append("\\n");
                    break;
                case '\r':
                    sb.append("\\r");
                    break;
                case '\t':
                    sb.append("\\t");
                    break;
                default:
                    sb.append(charValue);
            }
        }
        sb.append('\"');
        return sb.toString();
    }

    /**
     * 将 Number 表示为 JSON格式
     *
     * @param number Number
     * @return JSON格式
     */
    private static String number2Json(final Number number) {
        return number.toString();
    }

    /**
     * 将 Boolean 表示为 JSON格式
     *
     * @param bool Boolean
     * @return JSON格式
     */
    private static String boolean2Json(final Boolean bool) {
        return bool.toString();
    }

    private static String collection2Json(final Collection<Object> c) throws Exception {
        final Object[] arrObj = c.toArray();
        return toJson(arrObj);
    }

    private static String map2Json(final Map<String, Object> map) throws Exception {
        if (map.isEmpty()) {
            return "{}";
        }
        final StringBuilder sb = new StringBuilder(map.size() << 4); // 4次方
        sb.append('{');
        final Set<Map.Entry<String, Object>> entrySet = map.entrySet();
        for (final Map.Entry entry : entrySet) {
            final Object value = entry.getValue();
            sb.append('\"');
            sb.append(entry.getKey()); // 不能包含特殊字符
            sb.append('\"');
            sb.append(':');
            sb.append(toJson(value)); // 循环引用的对象会引发无限递归
            sb.append(',');
        }
        // 将最后的 ',' 变为 '}':
        sb.setCharAt(sb.length() - 1, '}');
        return sb.toString();
    }

    /**
     * 将数组编码为 JSON 格式
     *
     * @param array 数组
     * @return JSON 格式
     * @throws Exception JSON解析异常时抛此异常
     */
    private static String array2Json(Object[] array) throws Exception {
        StringBuilder sb = new StringBuilder(array.length << 4); // 4次方
        sb.append('[');
        for (Object o : array) {
            sb.append(toJson(o));
            sb.append(',');
        }
        return addJsonArrayEnding(sb);
    }

    private static String addJsonArrayEnding(StringBuilder sb) {
        if (sb.length() == 1) {
            sb.append(']');
        } else {
            sb.setCharAt(sb.length() - 1, ']');
        }
        return sb.toString();
    }

    private static String intArray2Json(final int[] array) {
        StringBuilder sb = new StringBuilder(array.length << 4);
        sb.append('[');
        for (int o : array) {
            sb.append(o);
            sb.append(',');
        }
        return addJsonArrayEnding(sb);
    }

    private static String longArray2Json(long[] array) {
        StringBuilder sb = new StringBuilder(array.length << 4);
        sb.append('[');
        for (long o : array) {
            sb.append(o);
            sb.append(',');
        }
        return addJsonArrayEnding(sb);
    }

    private static String booleanArray2Json(boolean[] array) {
        StringBuilder sb = new StringBuilder(array.length << 4);
        sb.append('[');
        for (boolean o : array) {
            sb.append(o);
            sb.append(',');
        }
        return addJsonArrayEnding(sb);
    }

    private static String floatArray2Json(final float[] array) {
        StringBuilder sb = new StringBuilder(array.length << 4);
        sb.append('[');
        for (float o : array) {
            sb.append(o);
            sb.append(',');
        }
        return addJsonArrayEnding(sb);
    }

    private static String doubleArray2Json(final double[] array) {
        StringBuilder sb = new StringBuilder(array.length << 4);
        sb.append('[');
        for (double o : array) {
            sb.append(o);
            sb.append(',');
        }
        return addJsonArrayEnding(sb);
    }

    private static String shortArray2Json(short[] array) {
        StringBuilder sb = new StringBuilder(array.length << 4);
        sb.append('[');
        for (short o : array) {
            sb.append(o);
            sb.append(',');
        }
        return addJsonArrayEnding(sb);
    }

    private static String byteArray2Json(byte[] array) {
        StringBuilder sb = new StringBuilder(array.length << 4);
        sb.append('[');
        for (byte o : array) {
            sb.append(Byte.toString(o));
            sb.append(',');
        }
        return addJsonArrayEnding(sb);
    }

    private static String getKey(final java.lang.reflect.Field field) {
        if (!field.isSynthetic()) {
            return field.getName();
        } else {
            return "";
        }
    }

    private static String obj2Json(final Object bean) throws Exception {
        if (bean == null) {
            return "{}";
        }
        java.lang.reflect.Field[] fields = bean.getClass().getDeclaredFields();
        final StringBuilder sb = new StringBuilder(fields.length << 4);
        sb.append('{');
        for (final java.lang.reflect.Field field : fields) {
            if (field.getType() == bean.getClass()) {
                // 避免循环引用，无限递归，但防不住List<>
                continue;
            }
            String key = getKey(field);
            if (key == null || "".equals(key)) {
                continue;
            }
            if (!field.isAccessible()) {
                AccessController.doPrivileged(new PrivilegedAction() {
                    @Override
                    public Object run() {
                        field.setAccessible(true);
                        return null;
                    }
                });
            }
            sb.append(toJson(key));
            sb.append(':');
            try {
                sb.append(toJson(field.get(bean))); // 循环引用的对象会引发无限递归
            } catch (IllegalAccessException e) {
                sb.append("null");
            }
            sb.append(',');
        }
        if (sb.length() == 1) {
            return bean.toString();
        } else {
            sb.setCharAt(sb.length() - 1, '}');
            return sb.toString();
        }
    }
}
