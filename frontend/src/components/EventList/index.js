import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchGroups } from "../../store/group";
import "../MainPageNav/mainpage.css";


