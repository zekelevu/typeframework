/* description: TypeScript Grammar */
/* author: Zeke Kievel */

%lex

%%

\/\*[{}()|#@$%^&:=_+\\\-\/\.\[\]\w\s\r\n\*]*\*\/ /* skip comment */
\/\/[^\n]*                              /* skip comment */
\s+                                     /* skip whitespace */
'export'                                return ''
'declare'                               return ''
'var'                                   return ''
'/*'                                    return 'COMMENT_OPEN'
'*/'                                    return 'COMMENT_CLOSE'
';'                                     return 'TERMINATOR'
'[]'                                    return 'ARRAY'
\<([\w\.]+\s*\,?\s*)+\>                 return 'GENERIC'
[0-9]+("."[0-9]+)?\b                    return 'NUMBER'
<<EOF>>                                 return 'EOF'
'module'                                return 'CLASS'
'class'                                 return 'CLASS'
'interface'                             return 'CLASS'
'extends'                               return 'EXTENDS'
'implements'                            return 'IMPLEMENTS'
'static'                                return 'KEYWORD'
'public'                                return 'KEYWORD'
'private'                               return 'KEYWORD'
'...'                                   return 'KEYWORD'
'{}'                                    return 'OBJECT'
[\w$_]+                                 return 'IDENTIFIER'
[\[\]{}(),:?.=>]                        return yytext

/lex


%start expressions

%% /* language grammar */

expressions
    : BlockItems EOF
        {return $1}
    ;
Block
    : '{' BlockItems '}'
       {$$ = $2}
    | '{' Lambda '}'
       {$$ = [$2]}
    | '{' '}'
       {$$ = []}
    | OBJECT
       {$$ = []}
    ;
BlockItems
    : BlockItem
        {$$ = [$1]}
    | BlockItems BlockItem
        {$$ = $1; $$.push($2)}
    ;
BlockItem
    : Class
        {$$ = $1}
    | Line
        {$$ = $1}
    ;
Class
    : CLASS Identifier Block
        {$$ = { type: $1, name: $2, members: $3 }}
    | CLASS Identifier EXTENDS TypeList Block
        {$$ = { type: $1, name: $2, extends: $4, members: $5 }}
    | CLASS Identifier IMPLEMENTS TypeList Block
        {$$ = { type: $1, name: $2, implements: $4, members: $5 }}
    | CLASS Identifier EXTENDS TypeList IMPLEMENTS TypeList Block
        {$$ = { type: $1, name: $2, extends: $4, implements: $5, members: $6 }}
    ;
Line
    : Variable
        {$$ = $1}
    | '[' Variable ']' ':' Type
        {$$ = []}
    | Line TERMINATOR
        {$$ = $1}
    ;
Lambda
    : ParameterBlock ':' Type
        {$$ = { type: "lambda", parameters: $1, return: $3 }}
    | Lambda TERMINATOR
        {$$ = $1}
    ;
Variable
    : Identifier
        {$$ = { type: 'variable', name: $1 }}
    | KEYWORD Identifier
        {$$ = { type: 'variable', name: $2, keywords: [$1] }}
    | KEYWORD KEYWORD Identifier
        {$$ = { type: 'variable', name: $3, keywords: [$1, $2] }}
    | Variable '?'
        {$$ = $1; $$.optional = true }
    | Variable ParameterBlock
        {$$ = $1; $$.type = 'function', $$.parameters = $2}
    | Variable ':' '{' BlockItems '}'
        {$$ = $1; $$.return = $3 }
    | Variable ':' Type
        {$$ = $1; $$.return = $3 }
    ;
ParameterBlock
    : '(' Parameters ')'
        {$$ = $2}
    | '(' ')'
        {$$ = []}
    ;
Parameters
    : Variable
        {$$ = [$1]}
    | Parameters ',' Variable
        {$$ = $1; $$.push($3)}
    ;
TypeList
    : Type
        {$$ = [$1]}
    | TypeList ',' Type
        {$$ = $1; $$.push($3)}
    ;
FunctionType
    : ParameterBlock '=' '>' Identifier
        {$$ = { type: 'function', parameters: $1, return: $4 }}
    ;
Type
    : OBJECT
        {$$ = $1}
    | Identifier
        {$$ = $1}
    | FunctionType
        {$$ = $1}
    | Type '.' Identifier
        {$$ = $1; typeof $$ == 'object' ? ($$.return += $2 + $3) : ($$ += $2 + $3)}
    | Type ARRAY
        {$$ = $1 + '[]'}
    ;
Identifier
    : IDENTIFIER
        {$$ = $1}
    | IDENTIFIER GENERIC
        {$$ = $1}
    ;