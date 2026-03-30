package com.chan.ec2test.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chan.ec2test.dto.MultiplicationRequestDto;
import com.chan.ec2test.dto.MultiplicationResponseDto;

@RestController
public class HealthController {

	@Operation(summary = "곱셈 API", description = "숫자 두 개를 입력받아 곱한 결과 반환")
	@PostMapping("/multiplication")
	public MultiplicationResponseDto multiplication(
	        @RequestBody MultiplicationRequestDto request
	) {
		String message = "입력받은 숫자는 " + request.a() + ", " + request.b() +
	            "이며, 두 숫자를 곱한 값은 " + (request.a() * request.b()) + "입니다";
	    return new MultiplicationResponseDto(message);
	}
    
    @Operation(summary = "곱셈 API", description = "숫자 두 개를 입력받아 곱한 결과 반환")
    @GetMapping("/multiplication")
    public int multiplication(
            @Parameter(description = "첫번째 숫자", example = "3")
            @RequestParam int num1,

            @Parameter(description = "두번째 숫자", example = "4")
            @RequestParam int num2
    ) {
        return num1 * num2;
    }
    
    
}