package com.homework.expensetracker.shared.api;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiErrorController implements ErrorController {

    @RequestMapping("/error")
    public ResponseEntity<Map<String, Object>> handleError(HttpServletRequest request) {
        Object rawStatus = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        HttpStatus status = HttpStatus.resolve(rawStatus instanceof Integer ? (Integer) rawStatus : 500);

        Object attribute = request.getAttribute(RequestDispatcher.ERROR_MESSAGE);
        String errorMessage = attribute instanceof String && !((String) attribute).isBlank()
                ? (String) attribute
                : "Unexpected server error";

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("status", status != null ? status.value() : HttpStatus.INTERNAL_SERVER_ERROR.value());
        payload.put("error",
                status != null ? status.getReasonPhrase() : HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase());
        payload.put("message", errorMessage);
        payload.put("path", request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI));

        return ResponseEntity.status(status != null ? status : HttpStatus.INTERNAL_SERVER_ERROR).body(payload);
    }

}