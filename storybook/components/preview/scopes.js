import * as OrbitComponents from "@react-components";
import { CheckeredBackground } from "@stories/components";
import { forwardRef, useCallback, useContext, useDebugValue, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useReducer, useRef, useState } from "react";
import { groupBy, isNil } from "lodash";
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

const DocsComponents = {
    CheckeredBackground
};

const ThirdParties = {
    cx,
    isNil,
    groupBy,
    useFormik
};

export const KnownScope = {
    ...OrbitComponents,
    ...React,
    ...DocsComponents,
    ...ThirdParties
};
