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
'function'                              return ''
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
    : '{' '}'
       {$$ = []}
    | '{' Index '}'
       {$$ = $2}
    | '{' BlockItems '}'
       {$$ = $2}
    ;
BlockItems
    : BlockItem
        {$$ = [$1]}
    | BlockItems BlockItem
        {$$ = $1; $$.push($2)}
    ;
BlockItem
    : Class Block
        {$$ = $1, $$.members = $2}
    | Line TERMINATOR
        {$$ = $1}
    ;
Class
    : CLASS Identifier
        {$$ = {type: $1, name: $2}}
    | CLASS Identifier EXTENDS TypeList
        {$$ = {type: $1, name: $2, extends: $4}}
    | CLASS Identifier IMPLEMENTS TypeList
        {$$ = {type: $1, name: $2, implements: $4}}
    | CLASS Identifier EXTENDS TypeList IMPLEMENTS TypeList
        {$$ = {type: $1, name: $2, extends: $4, implements: $5}}
    ;
Line
    : Index
        {$$ = $1}
    | Variable
        {$$ = $1}
    | Function
        {$$ = $1}
    ;
Index
    : '[' Identifier ':' Type ']' ':' Type
        {$$ = {type: 'index', name: ''}}
    ;
Variable
    : Identifier
        {$$ = {type: 'variable', name: $1}}
    | KeywordList Identifier
        {$$ = {type: 'variable', name: $2, keywords: $1}}
    | Variable '?'
        {$$ = $1; $$.optional = true}
    | Variable ParameterBlock
        {$$ = $1; $$.type = 'function', $$.parameters = $2}
    | Variable ':' Type
        {$$ = $1; $$.return = $3}
    ;
Function
    : ParameterBlock
        {$$ = {type: 'function', name: '', parameters: $1}}
    | Function ':' Type
        {$$ = $1; $$.return = $3}}
    ;
KeywordList
    : KEYWORD
        {$$ = [$1]}
    | KeywordList KEYWORD
        {$$ = $1; $$.push($2)}
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
        {$$ = {type: 'function', parameters: $1, return: $4}}
    ;
Type
    : Block
        {$$ = '{}'}
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