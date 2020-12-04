import * as OrbitComponents from "@react-components";
import { Dimmer, Loader } from "semantic-ui-react";
import { isNil } from "lodash";
import { useCallback, useContext, useDebugValue, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useReducer, useRef, useState } from "react";
import { useFormik } from "formik";
import cx from "classnames";

const ReactHooks = {
    useState,
    useEffect,
    useContext,
    useReducer,
    useCallback,
    useMemo,
    useRef,
    useImperativeHandle,
    useLayoutEffect,
    useDebugValue
};

const Semantic = {
    Dimmer,
    Loader
};

const ThirdParties = {
    cx,
    isNil,
    useFormik
};

export const KnownScope = {
    ...OrbitComponents,
    ...ReactHooks,
    ...Semantic,
    ...ThirdParties
};
