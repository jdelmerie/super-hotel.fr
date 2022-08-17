package fr.fms.superhotelapi.security;

import fr.fms.superhotelapi.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    DataSource dataSource;

    String usersByUsernameQuery = "select email, password, enable from users where email = ?";
    String authoritiesByUsernameQuery = "SELECT u.email, r.name from users AS u \r\n"
            + "INNER JOIN users_roles ur ON u.id = ur.users_id \r\n"
            + "INNER JOIN role r ON ur.roles_id = r.id \r\n"
            + "where email = ?";

    private static final String ROLE_ADMIN = "ROLE_ADMIN";

    private static final String ROLE_HOTELIER = "ROLE_HOTELIER";

    @Autowired
    private UserServiceImpl userService;
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        PasswordEncoder passwordEncoder = passwordEncoder();
        auth.jdbcAuthentication().dataSource(dataSource).usersByUsernameQuery(usersByUsernameQuery)
                .authoritiesByUsernameQuery(authoritiesByUsernameQuery).rolePrefix("ROLE_")
                .passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .antMatchers(HttpMethod.GET, "/hotel/all").permitAll()
                .antMatchers(HttpMethod.GET, "/hotel/get/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/city/all").permitAll()
                .antMatchers(HttpMethod.GET, "/city/get/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/hotel/image/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/hotel/city/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/hotel/city/search/{search}").permitAll()
                .antMatchers(HttpMethod.POST, "/hotel/add").hasAuthority(ROLE_ADMIN)
                .antMatchers(HttpMethod.DELETE, "/hotel/delete/{id}").hasAuthority(ROLE_ADMIN)
                .antMatchers(HttpMethod.PUT, "/hotel/update/{id}").hasAnyAuthority(ROLE_HOTELIER, ROLE_ADMIN)
                .antMatchers(HttpMethod.POST, "/city/add").hasAuthority(ROLE_ADMIN)
                .antMatchers(HttpMethod.DELETE, "/city/delete/{id}").hasAuthority(ROLE_ADMIN)
                .antMatchers(HttpMethod.PUT, "/city/update/{id}").hasAuthority(ROLE_ADMIN)
                .antMatchers(HttpMethod.POST, "/hotelier/add").hasAuthority(ROLE_ADMIN)
                .antMatchers(HttpMethod.DELETE, "/hotelier/delete/{id}").hasAuthority(ROLE_ADMIN)
                .antMatchers(HttpMethod.PUT, "/hotelier/update/{id}").hasAuthority(ROLE_ADMIN)
                .antMatchers(HttpMethod.GET, "/hotelier/all").hasAuthority(ROLE_ADMIN)
                .anyRequest().authenticated();
        http.addFilter(new JwtAuthenticationFilter(authenticationManagerBean(), userService));
        http.addFilterBefore(new JwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"));
        config.setAllowCredentials(true);
        config.setAllowedHeaders(Arrays.asList("Accept-Encoding", "X-Requested-With", "Origin", "Content-Type", "Accept", "Authorization"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
