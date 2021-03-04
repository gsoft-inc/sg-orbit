import * as OrbitComponents from "@react-components";
import { CheckeredBackground } from "@stories/components";
import { Dimmer, Loader } from "semantic-ui-react";
import { forwardRef, useCallback, useContext, useDebugValue, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useReducer, useRef, useState } from "react";
import { isNil } from "lodash";
import { useFormik } from "formik";
import cx from "classnames";

const React = {
    useState,
    useEffect,
    useContext,
    useReducer,
    useCallback,
    useMemo,
    useRef,
    useImperativeHandle,
    useLayoutEffect,
    useDebugValue,
    forwardRef
};

const Semantic = {
    Dimmer,
    Loader
};

const DocsComponents = {
    CheckeredBackground
};

const ThirdParties = {
    cx,
    isNil,
    useFormik
};

export const KnownScope = {
    ...OrbitComponents,
    ...React,
    ...Semantic,
    ...DocsComponents,
    ...ThirdParties
};
